import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, Linking } from 'react-native';
import { Rating, Icon, ListItem } from 'react-native-elements';
import CarouselImage from '../../components/CarouselImages';
import Map from '../../components/Map';
import ListReview from '../../components/Restaurants/ListReview';
import Toast from 'react-native-easy-toast';

import {firebaseApp} from '../../utils/FireBase';
import firebase from 'firebase/app';
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
const screenWidth= Dimensions.get("window").width;

export default function InfoRestaurant(props){
    const { navigation } = props;
    const { restaurant }  = navigation.state.params.restaurant.item;
    const [ imagesRestaurants, setImagesRestaurants ] = useState([]);
    const [ rating, setRating] = useState(restaurant.rating);
    const [isFavorite, setIsFavorite]=useState(false);
    const toastRef= useRef();
    
    useEffect(()=> {
        const arrayUrlImages=[];
        (async ()=> {
            await Promise.all(
                restaurant.images.map(async idImage => {
                 await firebase
                        .storage()
                        .ref(`restaurants-images/${idImage}`)   
                        .getDownloadURL()
                        .then(imageUrl => {
                            arrayUrlImages.push(imageUrl);
                        });
                })
            );
            setImagesRestaurants(arrayUrlImages);
        })();
    },[]);
    useEffect(()=>{
        console.log(restaurant.id);
        console.log(firebase.auth().currentUser.uid);
        
        db.collection("favorites")
        .where("idRestaurant","==",restaurant.id)
        .where("idUser","==",firebase.auth().currentUser.uid)
        .get()
        .then(response => {            
            response.docs.length === 1 ? setIsFavorite(true): null;
        });

    },[]);
    const addFavorite = async () => {
        const payLoad ={
            idUser:firebase.auth().currentUser.uid,
            idRestaurant:restaurant.id
        };
        await db.collection("favorites").add(payLoad).then(()=>{
            setIsFavorite(true);
            toastRef.current.show("Restaurante, "+restaurant.name+" \n añadido a la lista de favoritos");
        }).catch(()=>{
            toastRef.current.show("Error al agregar el restaurante a favoritos, intentelo más tarde");
        });
        
    };
    const removeFavorite =  () => {
        db.collection("favorites")
        .where("idRestaurant","==",restaurant.id)
        .where("idUser","==",firebase.auth().currentUser.uid)
        .get()
        .then(response => {
            response.forEach(doc => {
                const idFavorite = doc.id;
                db.collection("favorites")
                .doc(idFavorite).delete()
                .then(()=>{
                       setIsFavorite(false); 
                       toastRef.current.show("Restaurante, "+restaurant.name+" \n eliminado de la lista de favoritos");
                })
                .catch(()=>{
                    toastRef.current.show("NO se ha podido eliminar el restaurante de la lista de favoritos, intentelo más tarde");
                });
            });
        });
    };

    return (
        <ScrollView style={styles.viewBody}>
            <View style={styles.viewFavorites}>
                <Icon 
                    type="material-community"
                    name={ isFavorite ? "heart" : "heart-outline"}
                    onPress={ isFavorite ?  removeFavorite : addFavorite}
                    color={ isFavorite ? "#00a680" : "#000"}
                    size={35}
                    underlayColor="transparent"
                />
            </View>
            <CarouselImage 
                arrayImages={imagesRestaurants}
                height={200}
                width={screenWidth}
            />
            <TitleRestaurant 
                name={restaurant.name} 
                description={restaurant.description} 
                rating={rating} 
                
            />
            <RestaurantInformation 
                location={restaurant.location} 
                name={restaurant.name} 
                address={restaurant.address}
                phone={restaurant.phone}
                web={restaurant.web}
                /> 
                <ListReview 
                    navigation={navigation}
                    idRestaurant={restaurant.id}
                    setRating={setRating}
                />
                <Toast ref={toastRef} position="center" opacity={0.5}/>
        </ScrollView>
    );
}


function TitleRestaurant(props){
    const {name,description,rating}=props;
    
    return (
        <View style={styles.viewRestaurantTitle}>
            <View style={{ flexDirection:"row"}}>
                <Text style={styles.nameRestaurant}> {name} </Text>
                <Rating 
                    style={styles.rating} 
                    imageSize={20} 
                    readonly 
                    startingValue={parseFloat(rating)}/>
            </View>
            <Text style={styles.descriptionRestaurant}>
                {description.trim()}
            </Text>
        </View>
    );
}
function RestaurantInformation(props){
    
    const { location,name, address, phone, web } = props;
    const openURL = (e,url) => {
        console.log("abrir navegador: "+ url);
        //const supportUrl = await Linking.canOpenURL();
    };
    const openPhone = (e,phoneNumber) => {
        console.log("abrir teléfono: "+ phoneNumber);
    };
    const listInfo = [
        {
            text:address,
            iconName:"map-marker",
            iconType:"material-community",
            action:null
        },
        {
            text:phone,
            iconName:"phone",
            iconType:"material-community",
            action:openPhone
        },
        {
            text:web,
            iconName:"web",
            iconType:"material-community",
            action:openURL
        }
    ];
    
    return (
        <View style={styles.viewRestaurantInformation}>
            <Text style={styles.restaurantInformationTitle}>
                Información sobre el restaurante
            </Text>
            <Map location={location} name={name} height={100}/>
            {listInfo.map((item,index) => (
                item.text  && <ListItem 
                    key={index}
                    title={item.text }
                    leftIcon={{
                        name:item.iconName,
                        type:item.iconType,
                        color:"#00a680"
                    }}
                    containerStyle={styles.containerListItem}
                    onPress = { 
                        
                        (!web && !phone ? null :  item.iconName == 'web' ? (e) => item.action(e,web) : item.iconName == 'phone' ?  (e) => item.action(e,phone) :  null) 
                    
                    
                    }
                    
                />
            ))}
            
        </View>
    );
}
const styles = StyleSheet.create({
    viewBody:{
        flex:1
    },
    viewFavorites:{
        position:"absolute",
        top:0,
        right:0,
        zIndex:2,
        backgroundColor:"#fff",
        borderBottomLeftRadius:30,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:15,
        paddingRight:5
    },
    viewRestaurantTitle:{
        margin:15
    },
    nameRestaurant:{
        marginTop:25,
        fontSize:20,
        fontWeight:'bold'
    },
    rating:{
        position:"absolute",
        right:0,
        width:"100%"
    },
    descriptionRestaurant:{
        marginTop:5,
        color:"grey"
    },
    viewRestaurantInformation:{
      margin:15,
      marginTop:25  
    },restaurantInformationTitle:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:10
    },
    containerListItem:{
        borderBottomColor:"#d8d8d8",
        borderBottomWidth:1
    }
});