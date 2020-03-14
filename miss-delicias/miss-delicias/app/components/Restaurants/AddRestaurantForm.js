import React,{useEffect,useState} from 'react';
import {StyleSheet,View,ScrollView,Alert,Dimensions} from 'react-native';
import { Icon,Avatar, Image,Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker'; 

export default function AddRestaurantForm(props){
    const {navigation,toastRef,setIsLoading} = props;
    const [imagesSelected,setImagesSelected] = useState([]);

    return(
        <ScrollView>
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
        toastRef.current.show("¡Debes aceptar permisos para poder agregar imagenes!");
    }else{
        
        let galery = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,3]
        });
        
        if(!galery.cancelled){
            //...[...imagesSelected,galery.uri] => para agregar nuevos elementos sin sobreescribir
            setImagesSelected([...imagesSelected, galery.uri]);
        }
       
        
    }
};
 
const removeImage = image => {
    /* Para evitar que se llame esta función al crear el componente Avatar cada vez que se renderiza,
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
        
    }
});