import React from 'react';
import { StyleSheet, View, Text} from 'react-native'; 
import { Avatar } from 'react-native-elements';
import * as firebase from "firebase";
import * as Permisssions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default function InfoUser(props){
    const {
        userInfo, 
        userInfo: { uid,  displayName, email, photoURL }    
    } = props;
    const alterPhoto = "https://api.adorable.io/avatars/266/abott@adorable.png"
    const changeAvatar = async () => {
        
        const replyPermission = await Permisssions.askAsync(Permisssions.CAMERA_ROLL);
        const permissionCamera = replyPermission.permissions.cameraRoll.status;        
        if(permissionCamera === "denied"){
            console.log("Debes acceptar permisos, para acceder a la galería");            
        }else{
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing : true,
                aspect: [4,3]
            });

            if(!result.cancelled){
                uploadImage(result.uri,uid);
            }else{
                console.log("Cerrando galeria de imagenes");
            }
        }
    };
    const uploadImage  = (uri, nameImage) => {
        console.log("Uri: "+uri,"nameImage: "+nameImage);
        
    }
    return (
        <View style={styles.viewUserInfo}>
            <Avatar 
                rounded
                size="large"
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                source={
                    {
                        uri:photoURL ? photoURL : alterPhoto
                    }}
            />    
            <View>
                <Text
                    style={styles.displayName}
                >
                    {displayName ? displayName : "Anónimo"}
                </Text>
                <Text>
                    {email ? email : ''}
                </Text>
            </View>        
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar:{
        marginRight: 20,
    },
    displayName:{
        fontWeight:"bold"
    }
});