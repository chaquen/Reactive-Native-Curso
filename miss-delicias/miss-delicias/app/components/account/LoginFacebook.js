import React from "react";
import { SocialIcon } from "react-native-elements";

export default function LoginFacebook(){
    const login =() => {
        console.log("Inicio de sesión con facebook");
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