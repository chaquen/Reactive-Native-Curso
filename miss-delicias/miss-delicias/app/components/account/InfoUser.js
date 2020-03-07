import React from 'react';
import { StyleSheet, View, Text} from 'react-native'; 
import { Avatar } from 'react-native-elements';

export default function InfoUser(props){
    const {
        userInfo, 
        userInfo: { uid,  displayName, email, photoURL }    
    } = props;
    const alterPhoto = "https://api.adorable.io/avatars/266/abott@adorable.png"
    const changeAvatar = () => {
        console.log("Cmbiando el avatar");
        
    };
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