import React, { useState, useEffect} from 'react';
import {View,Text} from 'react-native';
import * as firebase from 'firebase';
import Loading from '../../components/Loading';

export default function MyAccount(){
	const [login,setLogin] = useState(null);

	useEffect(()=>{
		firebase.auth().onAuthStateChanged(user => {
			!user ? setLogin(false) : setLogin(true); 
			console.log(user);
		});

	},[]);
	
	if(login === null){
		return <Loading isVisible={true} text="Cargando andoo ..."/>;
		
	}
	if(login){
	  return 	<Loading  isVisible={true} text="Bienvenido! "/>;
		
	}

	return  <Loading  isVisible={true} text="¡Debes loguearte!"/>;
	

}