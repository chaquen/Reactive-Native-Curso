import React , { useState, useEffect, useRef  }from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList, 
    ActivityIndicator,
    Alert, 
    TouchableOpacity } from 'react-native';
import { Image,Icon,Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import Loading from '../components/Loading';
import { NavigationEvents } from 'react-navigation'; //Para agregar un evento que se requiere al ingresar a la pestaña
import { firebaseApp  } from '../utils/FireBase';
import firebase from "firebase/app";
import "firebase/firestore";
const db =  firebase.firestore(firebaseApp);


export default function Favorites(props){
    const { navigation } = props;
    const [restaurants,setRestaurants]=useState([]);
    const [reloadRestaurant,setReloadRestaurant]=useState(false);
    const [userLogged, setUserLogged] = useState(false);
    const [loading, setLoading]=useState(false);    
    const toastRef = useRef();
    
    firebase.auth().onAuthStateChanged(user => {
        user ? setUserLogged(true) : setUserLogged(false);
    });
    useEffect(()=>{
        if(userLogged){
            const idUser = firebase.auth().currentUser.uid;
            db.collection("favorites")
            .where("idUser","==",idUser)
            .get()
            .then(response => {
                const idRestaurantsArray=[];
                response.forEach(doc => {                
                    idRestaurantsArray.push(doc.data().idRestaurant)
                });
                getDataRestaurants(idRestaurantsArray).then(response =>{
                    const resturants = [];
                        response.forEach(item => {
                            
                            const resturant = item.data();
                            resturant.id = item.id;//asigno el id del elemento de la coleccción
                            resturants.push(resturant);
                        });
                        setRestaurants(resturants); 

                });
                
            })
            
        }
        setReloadRestaurant(false);
    },[reloadRestaurant]);
       
    const getDataRestaurants = idRestaurantArray => {
        const arrayRestaurants = [];
        idRestaurantArray.forEach(restaurant => {
            
            let infoResturant = db.collection("restaurants")
                                    .doc(restaurant)
                                    .get();
            arrayRestaurants.push(infoResturant);
        });
        
        return Promise.all(arrayRestaurants);
    };    
    console.log(userLogged);
    
    if(!userLogged){
        return <UserNotLogged setReloadRestaurant={setReloadRestaurant}  navigation={navigation}/>
    } 
    if(restaurants.length === 0){ 
        return <NotFoundRestaurant setReloadRestaurant={setReloadRestaurant} />;
    }
    return (
        <View style={styles.viewBody}>
        <NavigationEvents  onWillFocus = { () => setReloadRestaurant(true)} />
            {restaurants ? 
            (
            <FlatList
                data={ restaurants }
                renderItem = { restaurant => (
                                <Restaurant 
                                    restaurant={restaurant} 
                                    navigation={navigation} 
                                    toastRef={toastRef}
                                    setLoading={setLoading}
                                    setReloadRestaurant={setReloadRestaurant} />
                             )}
                keyExtractor={(item,index)=> index.toString()}

            />)
            :(<View style={styles.loaderRestaurant}>
                <ActivityIndicator size="large"/>
                <Text>Cargando restaurantes</Text>
            </View> )}
        <Toast ref={toastRef} position="center" opacity={1} />
        <Loading isVisible={loading} text="Eliminando restaurantes" />
        </View>
        
    );
}

function Restaurant(props){

    const { restaurant,navigation,toastRef, setLoading, setReloadRestaurant }=props;
    const {id,name,images} = restaurant.item;
    const [imageRestaurant,setImageRestaurant]=useState(null);

    
    useEffect(()=>{
        const image = images[0];
        firebase.storage()
        .ref(`restaurants-images/${image}`)
        .getDownloadURL()
        .then(response => {
            setImageRestaurant(response);            
        });
    },[]);

    const confirmRemoveFavoritesRestaurant = () => {
       Alert.alert("Eliminar restaurante,  de favoritos","¿Estas seguro de eliminar el restaurante de tu lista de favoritos?",
       [
        {
            text:"Cancelar",
            style:"Cancel"
        },
        {
            text:"Eliminar",
            onPress: removeFavorite
            
        },
        {cancelable: false}
       ]);
       
    }; 
    const removeFavorite = () => {
        setLoading(true);
        db.collection('favorites')
        .where("idRestaurant","==",id)
        .where("idUser","==",firebase.auth().currentUser.uid)
        .get()
        .then(response => {
            response.forEach( doc =>{
                const idFavorite = doc.id
                db.collection("favorites")
                .doc(idFavorite).delete()
                .then(()=>{
                    setLoading(false);
                    setReloadRestaurant(true);
                    toastRef.current.show("Restaurante, "+ name +" eliminado de favoritos.");
                })
                .catch(()=>{
                    toastRef.current.show("Error al eliminar el restaurante de favoritos.");
                });
            });
        });
    };
    return (
        <View style={styles.viewRestaurant}>
            <TouchableOpacity onPress={()=> 
                navigation.navigate("InfoRestaurant",{restaurant:restaurant.item})
            } >   
                <Image 
                    resizeMode="cover"
                    source={{uri:imageRestaurant}}
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator color="#fff"/>}
                />
            </TouchableOpacity>
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Icon
                    type="material-community"
                    name="heart"
                    color="#00a680"
                    containerStyle={styles.favorite}
                    onPress={confirmRemoveFavoritesRestaurant}
                    size={40}
                    underlayColor="transparent"
                />
            </View>
        </View>
    ); 
}
function NotFoundRestaurant(props){
    const { setReloadRestaurant } = props;
    return (
        <View style = {{
           flex : 1, alignItems: "center", justifyContent :"center"  
        }}>
            <NavigationEvents onWillFocus={ () =>  setReloadRestaurant(true)} />
            <Icon type="material-community" name="alert-outline" size={50} />
            <Text style={{ fontSize : 20, fontWeight: "bold"}}> No tienes restaurante en tu lista </Text>
        </View>
    );
}
function UserNotLogged(props){
    const { setReloadRestaurant,navigation } = props;
    return (
        <View style = {{
           flex : 1, alignItems: "center", justifyContent :"center"  
        }}>
            <NavigationEvents onWillFocus={ () =>  setReloadRestaurant(true)} />
            <Icon type="material-community" name="alert-outline" size={50} />
            <Text style={{ fontSize : 20, fontWeight: "bold", textAlign:"center"}}> 
            Debes estar logueado para ver tus restaurantes favoritos!
            </Text>
            <Button 
                title="Ir a login"
                onPress={() => navigation.navigate("Login")}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    loaderRestaurant:{
        marginTop:10,
        marginBottom:10
    },
    viewBody:{
        flex:1,
        backgroundColor:"#f2f2f2"
    },
    viewRestaurant:{
        margin:10
    },
    image:{
        width:"100%",
        height:180
    },
    info:{
        flex:1,
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row",
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        marginTop:-30,
        backgroundColor:"#fff"

    },
    name:{
        fontWeight:"bold",
        fontSize:13
    },
    favorite:{
     marginTop:-40,
     backgroundColor:"#fff",
     padding:2,
     borderRadius:15,
     zIndex:2
     
    },
    btnContainer:{
        width: "80%",
        marginTop:20
    },
    btn:{
        backgroundColor:"#00a680"
    }
});