import React,{useEffect,useState} from 'react';
import {StyleSheet,View,ScrollView,Alert,Dimensions} from 'react-native';
import { Icon,Avatar, Image,Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker'; 

//Para obtener el tamaño de la pantalla del dispositivo
const widthScreen = Dimensions.get("screen").width;

export default function AddRestaurantForm(props){
    const {navigation,toastRef,setIsLoading} = props;
    const [imagesSelected,setImagesSelected] = useState([]);

    return(
        <ScrollView>
            <ImageCoverRestaurant imageRestaurant={imagesSelected[0]}/>
            <UploadImage 
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
        </ScrollView>
    );
}

function UploadImage(props){
 const { imagesSelected,setImagesSelected} = props;
 const selectImage = async () => {
    
    let responsePermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let statusPermissionCamera = responsePermission.permissions.cameraRoll.status;
    
    if(statusPermissionCamera === "denied"){
        toastRef.current.show("¡Debes aceptar permisos para poder agregar imagenes!",5000);
    }else{
        
        let galery = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,3]
        });
        
        if(!galery.cancelled){
            //...[...imagesSelected,galery.uri] => para agregar nuevos elementos sin sobreescribir
            setImagesSelected([...imagesSelected, galery.uri]);
        }else{
            toastRef.current.show("¡Para subir imagenes debes aceptar los permisos! \n si deseas cambiar por favor accede a la configuración de tu dispositivo y cambia los permisos de la aplicación",7000);
        }
       
        
    }
};
 
const removeImage = image => {
    /* Para evitar que se llame esta función al crear el componente Avatar, cada vez que se renderiza,
     se debe invocar como funcion de flecha*/
    let arrayImages = imagesSelected;
    Alert.alert(
        "Eliminar imagen",
        "¿Estas seguro de eliminar esta imagen?",
        [
            {
                text:"Cancelar",
                style:"cancel"
            },
            {
                text:"Eliminar",
                onPress: () => setImagesSelected(arrayImages.filter(imageUrl => imageUrl !== image))             
            }
        ],
        {cancelable:false}
    );
};
 
 return (
    <View style={styles.viewImages}>
        {imagesSelected.length <= 4 && (
            <Icon 
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={selectImage}
                
            />
        )}
        {imagesSelected.map((imageRestaurant,index) => (
            <Avatar 
                key={index}
                onPress={() => removeImage(imageRestaurant)}
                style={styles.miniatureStyle}
                source ={{ uri: imageRestaurant}}
                showEditButton                
            />
        ))}        
    </View>
 );
}
function ImageCoverRestaurant(props){
    const  {imageRestaurant} = props;

    return (
        <View style={styles.viewPhoto}>
            { imageRestaurant ? (
                <Image
                   source = {{uri:imageRestaurant}}
                   style = {{width: widthScreen, height:200}} 
                />
            ) : (
                <Image 
                    source = { require("../../../assets/img/no-image-restaurant.png") }
                    style = {{width: widthScreen, height:200}} 
                />
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    viewImages:{
        flexDirection:"row",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 40,
    },
    containerIcon:{
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        height:70,
        width:70,
        backgroundColor:"#e3e3e3"
    },
    miniatureStyle:{
        width:70,
        height:70,
        marginRight:10,
        
    },
    viewPhoto:{
        alignItems:"center",
        height: 200,
        marginBottom:20
    }
});