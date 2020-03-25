import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import { Rating, Icon, ListItem } from 'react-native-elements';
import CarouselImage from '../../components/CarouselImages';
import Map from '../../components/Map';
import *  as firebase from 'firebase';

const screenWidth= Dimensions.get("window").width;
export default function InfoRestaurant(props){
    const { navigation } = props;
    const { restaurant }  = navigation.state.params.restaurant.item;
    const [ imagesRestaurants, setImagesRestaurants ] = useState([]);

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
    return (
        <ScrollView style={styles.viewBody}>
            <CarouselImage 
                arrayImages={imagesRestaurants}
                height={200}
                width={screenWidth}
            />
            <TitleRestaurant 
                name={restaurant.name} 
                description={restaurant.description} 
                rating={restaurant.rating} 
            />
            <RestaurantInformation 
                location={restaurant.location} 
                name={restaurant.name} 
                address={restaurant.address}/> 
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
                {description}
            </Text>
        </View>
    );
}
function RestaurantInformation(props){
    
    const { location,name, address } = props;

    const listInfo = [
        {
            text:address,
            iconName:"map-marker",
            iconType:"material-community",
            action:null
        }
    ];
    return (
        <View style={styles.viewRestaurantInformation}>
            <Text style={styles.restaurantInformationTitle}>
                Información sobre el restaurante
            </Text>
            <Map location={location} name={name} height={100}/>
            {listInfo.map((item,index)=> (
                <ListItem 
                    key={index}
                    title={item.text}
                    leftIcon={{
                        name:item.iconName,
                        type:item.iconType,
                        color:"#00a680"
                    }}
                    containerStyle={styles.containerListItem}
                />
            ))}
            
        </View>
    );
}
const styles = StyleSheet.create({
    viewBody:{
        flex:1
    },
    viewRestaurantTitle:{
        margin:15
    },
    nameRestaurant:{
        fontSize:20,
        fontWeight:'bold'
    },
    rating:{
        position:"absolute",
        right:0
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