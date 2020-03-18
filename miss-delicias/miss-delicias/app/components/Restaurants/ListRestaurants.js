import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text,FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import * as firebase from 'firebase';
import Restaurants from '../../screens/Restaurants/Restaurants';

export default function ListRestaurants(props){
    const { restaurants, isLoading } = props;   
    return (
        <View>
            {restaurants ? (
                <FlatList
                    data={restaurants}
                    renderItem={ restaurant => <Restaurant restaurant={ restaurant } /> }
                    keyExtractor={(item, index) => index.toString()}
                    //onEndReached={}
                    onEndReachedThreshold={0}
                    //ListEmptyComponent={}
                >

                </FlatList>) : (
                    <View style={styles.loadingRestaurant}>
                        <ActivityIndicator size="large"/>
                        <Text> Cargando restaurantes </Text>
                    </View>
                )}
        </View>
    );
}

function Restaurant(props){
    const { restaurant } = props;
    const {name, address, description, images} = restaurant.item.restaurant;
    const [imageRestaurant, setImageRestaurant] = useState(null);
    
    useEffect(() =>{
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
            onPress={()=> console.log("Ir al restaurante")}
        >
            <View style={styles.viewRestaurant}>
                <View style={styles.viewRestaurantImage}>
                    <Image
                        resizeMode="cover"
                        source={{ uri: imageRestaurant}}
                        style={styles.imageRestaurant}
                        PlaceholderContent={<ActivityIndicator color="fff" />}
                    />
                </View>
                <View>
                    <Text style={styles.restaurantName}>{name}</Text>
                    <Text style={styles.restaurantAddres}>{address}</Text>
                    <Text styles={styles.restaurantDescription}> 
                        {description.substr(0,60)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    loadingRestaurant:{
        marginTop:20,
        alignItems:"center"
    },
    viewRestaurant:{
        flexDirection:"row",
        margin:10
    },
    viewRestaurantImage:{
        marginRight:15
    },
    imageRestaurant:{
        width:80,
        height:80
    },
    restaurantName:{
        fontWeight:"bold"
    },
    restaurantAddres:{
        paddingTop:2,
        color:"grey"
    },
    restaurantDescription:{
        paddingTop:2,
        color:"grey",
        width:300
    }
});