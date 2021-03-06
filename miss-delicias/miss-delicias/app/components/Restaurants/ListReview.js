import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Button,Avatar,Rating } from 'react-native-elements';
import { firebaseApp} from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);

export default function ListReview(props){
    const {navigation,idRestaurant,setRating}= props;
    const [reviews,setReviews]=useState([]);
    const [reviewReload,setReviewReload] = useState(false);
    const [userLogged,setUserLogged]= useState(false);
    
    firebase.auth().onAuthStateChanged(user =>{
        user ? setUserLogged(true) : setUserLogged(false);
    });
    
    useEffect(()=>{
        (async ()=> {
            const resultReviews=[];
            const arrayRating=[];
            db.collection('reviews')
                .where('idRestaurant','==',idRestaurant)
                .get()
                .then(response => {
                    response.forEach(doc => {                        
                        resultReviews.push(doc.data());
                        arrayRating.push(doc.data().rating)
                    });
                    let numSum=0;
                    arrayRating.map(value => {
                        numSum += value
                    });
                    const resultRating = numSum / arrayRating.length;
                    const resultRatingFinish = resultRating ? resultRating : 0;
                    setReviews(resultReviews);
                    setRating(resultRatingFinish);
                    
                })

            setReviewReload(false);
            
        })()
        
    },[reviewReload]);

    return (
        <View>
            {userLogged ?  (<Button 
                title="Escribe una opinión"
                buttonStyle={styles.btnAddReview}
                titleStyle={styles.btnTitleAddReview}
                icon={{
                    type:"material-community",
                    name:"square-edit-outline",
                    color:"#00a680"
                }}
                onPress={()=> navigation.navigate("AddReviewRestaurant",{idRestaurant:idRestaurant,setReviewReload})}
            />)  : (<View style={{flex:1}}>
                <Text style={{textAlign:"center",color:"#00a680",padding:20}} 
                      onPress={()=>{navigation.navigate("Login")}}>
                    Para escribir un comentario es necesario estar logueado{" "}
                    <Text style={{fontWeight:"bold"}}>
                        Pulsa AQUÍ para iniciar sesión
                    </Text>
                </Text>
            </View>)}
            <FlatList 
                data={reviews}
                renderItem={review => <Review review={review}/>}
                keyExtractor={(item,index)=> index.toString()}

            />
        </View>
    );
}

function Review(props){
    const {title, review, rating, createAt, avatarUser} = props.review.item;
    const createReview = new Date(createAt.seconds * 1000)
    
    return (
        <View style={styles.viewReview}>
            <View style={styles.viewImageAvatarUser}>
                <Avatar 
                    rounded
                    size="large"
                    containerStyle={styles.imageAvatarUser}
                    source={{ uri: avatarUser ? avatarUser : "https://api.adorable.io/avatars/266/abott@adorable.png"}}
                />                
            </View>
            <View style={styles.viewInfo}>
                <Text style={styles.reviewTitle}>{title}</Text>
                <Text style={styles.reviewText}>{review}</Text>
                <Rating 
                    imageSize={15}
                    startingValue={rating}
                    readonly
                />
                <Text style={styles.reviewDate}>
                        {createReview.getDate()}/
                        {createReview.getMonth()}/
                        {createReview.getFullYear()}-
                        {createReview.getHours() }:
                        {createReview.getMinutes()}
                        </Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    btnAddReview:{
        backgroundColor:"transparent"
    },
    btnTitleAddReview:{
        color:"#00a680"
    },
    viewReview:{
       flexDirection:'row',
       margin:10,
       paddingBottom:20,
       borderBottomColor:"#e3e3e3",
       borderBottomWidth:1

    },
    viewImageAvatarUser:{
        marginRight:15
    },
    imageAvatarUser:{
        width:50,
        height:50
    },
    viewInfo:{
        flex:1,
        alignItems:"flex-start"
    },
    reviewTitle:{
        fontWeight:"bold"
    },
    reviewText:{
      paddingTop:2,
      color:"grey",
      marginBottom:5  
    },
    reviewDate:{
      marginTop:5,
      color:"grey",
      fontSize:12,
      position:"absolute",
      right:0,
      bottom:0, 
      
    
    }
});