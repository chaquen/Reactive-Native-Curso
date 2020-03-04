import React from "react";
import { SocialIcon } from "react-native-elements";
import * as firebase from "firebase";
import * as Facebook from 'expo-facebook';
import { FacebookApi } from "../../utils/Social";
import Loading from "../Loading";


export default function LoginFacebook(){
    const login = async () => {
        await Facebook.initializeAsync(FacebookApi.application_id);
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
                                            FacebookApi.application_id,
                                            { permissions: FacebookApi.permissions } 
                                      );
        
                                      if(type === "success"){
                                        const credentials = firebase.auth.FacebookAuthProvider.credential(token);  
                                        await firebase
                                              .auth()
                                              .signInWithCredential(credentials)
                                              .then(()=>{
                                                console.log("Bienvenidos desde facebook");    
                                              })
                                              .catch(() => {
                                                console.log("Error accediendo a facebook");    
                                              });  
                                        
                                      }else if(type === "cancel"){
                                        console.log("Inicio de sesión cancelado");    
                                      }else{
                                        console.log("Error desconocido, por favor intenete mas tarde");    
                                      }
    }

    return (
        <SocialIcon 
            title="Ingresa con Facebook"
            button
            type="facebook"
            onPress={login}
        />
    );
}