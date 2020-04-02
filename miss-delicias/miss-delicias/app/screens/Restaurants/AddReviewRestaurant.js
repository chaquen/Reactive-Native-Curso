import React, {useState,useRef} from 'react';
import { StyleSheet,View } from 'react-native';
import { AirbnbRating, Button, Input } from 'react-native-elements';
import Loading from '../../components/Loading';
import Toast from 'react-native-easy-toast';
import { firebaseApp} from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);

export default function AddReviewRestaurant(props){
    const {navigation} = props;
    const {idRestaurant,setReviewReload} = navigation.state.params;
    const [rating,setRating]=useState(null);
    const [title,setTitle]=useState("");
    const [review, setReview]=useState("");
    const [isLoading,setIsLoading]=useState(false)
    const toastRef= useRef();
    const addReview = () => {
        if(rating===null){
            toastRef.current.show("No has dado ninguna puntuación");
        }else if(!title){
            toastRef.current.show("Título es obligatorio");
        }else if(!review){
            toastRef.current.show("El comentario es obligatorio");
        }else{
            setIsLoading(true);
            const user = firebase.auth().currentUser;
            
            const payLoad= {
                idUser:user.uid,
                avatarUser:user.providerData[0].photoURL,
                idRestaurant:idRestaurant,
                title:title,
                rating:rating,
                review:review,
                createAt:new Date()
            };

            db.collection("reviews").add(payLoad).then(()=>{
                updateRankingRestaurant();
            }).catch(()=>{
                setIsLoading(false);
                toastRef.current.show("Error al registrar el comentario, intentalo más tarde");
            });

        } 
        
    };

    const updateRankingRestaurant  = () => {
        toastRef.current.show("Comentario guardado");
        const restaurantRef = db.collection('restaurants').doc(idRestaurant);
        restaurantRef.get().then( response => {
            const restaurantData = response.data();
            const ratingTotal = restaurantData.ratingTotal + rating; 
            const quantityVoting=restaurantData.quantityVoting + 1;
            const ratingResult = ratingTotal / quantityVoting; 
            // Actualizamos los valores en la base de datos
            restaurantRef.update({rating:ratingResult, ratingTotal,quantityVoting})
            .then(()=>{
                setIsLoading(false); 
                setReviewReload(true);   
                navigation.goBack();//ir a la página anterior
            });
        });
    };
    return (
        <View style={styles.viewBody}>
            <View style={styles.viewRating}>
                <AirbnbRating 
                    count={5}
                    reviews={["Pésimo","Deficiente","Normal","Muy bueno","Excelente"]}
                    defaultRating={0}
                    size={35}
                    onFinishRating={value => setRating(value) }
                />
            </View>
            <View style={styles.viewFormReview}>
            <Input 
                placeholder="Título"
                containerStyle={styles.input}
                onChange={e => setTitle(e.nativeEvent.text)}
            />
            <Input 
                placeholder="Comentario"
                multiline
                inputContainerStyle={styles.textArea}
                onChange={e => setReview(e.nativeEvent.text)}
            />
            <Button 
                title="Enviar comentario"
                onPress={addReview}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
            />
            </View>
            <Toast 
                ref={toastRef}
                position="center"
                opacity={0.5}
                duration={5000}

            />
            <Loading isVisible={isLoading} text="Enviando comentario"/>
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1
    },
    viewRating:{
        height:110,
        backgroundColor:"#f2f2f2"
    },
    viewFormReview:{
        margin:10,
        marginTop:40,
        flex:1,
        alignItems:"center"
    },
    input:{
        marginBottom:10
    },
    textArea:{
        height:150,
        width:"100%",
        padding:0,
        margin:0
    },
    btnContainer:{
        flex:1,
        justifyContent:"flex-end",
        marginTop:20,
        marginBottom:10,
        width:"95%"
    },
    btn:{
        backgroundColor:"#00a680"
    }
});