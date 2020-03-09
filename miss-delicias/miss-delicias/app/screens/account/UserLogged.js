import React,{useState, useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import { Button} from 'react-native-elements';
import  * as firebase  from 'firebase';
import InfoUser from '../../components/account/InfoUser';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';

export default function UserLogged(){
	const [userInfo, setUserInfo]=useState({}); 
	const [reloadDataUser,setReloadDataUser]=useState(false); 
	const [isVisibleLoading,setIsVisibleLoading]=useState(false);
	const [textLoading,setTextLoading]=useState("");
	const toastRef=useRef();
	useEffect(()=>{
		(async () => {
			const user = await firebase.auth().currentUser;
			setUserInfo(user.providerData[0]);
		})();
		setReloadDataUser(false)
	},[reloadDataUser]);

	return (
		<View>
			<InfoUser userInfo={userInfo}
					  setReloadDataUser ={setReloadDataUser} 
					  toastRef={toastRef}
					  setIsVisibleLoading={setIsVisibleLoading}
					  setTextLoading={setTextLoading}
			/>
			<Button 
				title = "Cerrar Sesión"
				onPress = { () => firebase.auth().signOut()}
			/>
			<Toast ref={toastRef} position="center" opacity={0.5} adeOutDuration={6000}/>
			<Loading isVisible={isVisibleLoading} text={textLoading}/>
		</View>
	);

} 