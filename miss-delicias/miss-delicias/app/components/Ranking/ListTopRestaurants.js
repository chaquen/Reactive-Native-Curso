import React, { useState, useEffect } from 'react';
import { StyleSheet,View, Text, FlatList, TouchableOpacity } from "react-native";
import {  Card, Image, Icon, Rating } from "react-native-elements";
import * as firebase from "firebase";

const colors = ["#efb819","#8a9597","#763c28","#000","#000"];

export default function ListTopRestaurants(props){
    const {restaurants, navigation } = props;
    
    return (
        <View>
            <FlatList 
                data={restaurants}
                renderItem={restaurant => <Restaurant restaurant={restaurant} navigation={navigation}/>}
                keyExtractor={(item,index) => index.toString()}
            />
        </View>
    );
}
function Restaurant(props){
    const { restaurant, navigation } = props;
    const { name, description, images, rating } = restaurant.item;
    const  [imageRestaurant, setImageRestaurant] = useState(null);
    const [iconColor,setIconColor] =  useState("#000");
    console.log("============");
    
    console.log(restaurant.item);
    
    console.log("============");
    
    useEffect(() => {
        setIconColor(colors[restaurant.index]);    
    },[]);
    
    useEffect( () =>{
        const image = images[0];
        firebase
            .storage()
            .ref(`restaurants-images/${image}`)
            .getDownloadURL()
            .then(result => {
                setImageRestaurant(result);
            });
    },[]);

	return (
		<TouchableOpacity
            onPress={ () => { navigation.navigate("InfoRestaurant",{restaurant:restaurant.item})} }
        >
            
            <Card containerStyle={styles.containerCard} >
                <Icon 
                    type="material-community"
                    name="chess-queen"
                    color={iconColor}
                    size={40}
                    containerStyle={styles.containerIcon}

                />
                <Image 
                    style={styles.restaurantImage}
                    resizeMode="cover"
                    source={{uri: imageRestaurant}}
                />
                <View style={styles.titleRanking}>
                    <Text style={styles.title}>{name}</Text>
                    <Rating 
                        imageSize={20}
                        startingValue={rating}
                        readonly
                        style={styles.rating}
                    />
                </View>
                <Text style={styles.description}>{description}</Text>
            </Card>
        </TouchableOpacity>
	);
}


const styles = StyleSheet.create({
    containerCard:{
        marginBottom:30,
        borderWidth:0
    },
    containerIcon:{
        position:"absolute",
        top:-30,
        left:-30,
        zIndex:1
    },
    restaurantImage:{
        width: "100%",
        height:200
    },
    titleRanking:{
        flexDirection:"row",
        marginTop:10
    },
    title:{
        fontSize:20,
        fontWeight:"bold"
    },
    rating:{
        position:"absolute",
        right:0
    },
    description:{
        color:"grey",
        marginTop:0,
        
    }
});
