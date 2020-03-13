import React, {useState} from 'react';
import {StyleSheet, View, Text}  from 'react-native';
import { ListItem }  from 'react-native-elements';
import ModalInfoUser from './ModalInfoUser';
import ChangeNameForm from "./ChangeNameForm";
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

export default function AccountOptions(props){
    
    const {userInfo,setReloadDataUser,toastRef}=props;
    console.log(userInfo);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [renderComponenet, setRenderComponent] = useState(null);
    const menuOptions = [
        {
            title: "Cambiar Nombre y Apellidos",
            iconType:"material-comunity",
            iconNameLeft:"account-circle",
            iconColorLeft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress: () =>  selectedComponent("name")   
        },
        {
            title: "Cambiar Correo electrónico",
            iconType:"material-comunity",
            iconNameLeft:"mail",
            iconColorLeft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress: () => selectedComponent("email")     
        },
        {
            title: "Cambiar Contraseña",
            iconType:"material-comunity",
            iconNameLeft:"lock",
            iconColorLeft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress: () => selectedComponent("password")   
        },
    ];
    const selectedComponent = key => {
        switch (key) {
            case "name":
                setRenderComponent(
                    <ChangeNameForm 
                        name={userInfo.displayName}
                        setIsModalVisible={setIsModalVisible}
                        setReloadDataUser={setReloadDataUser}
                        toastRef={toastRef}
                    />
                );
                setIsModalVisible(true);  
                break;
            case "email":
                setRenderComponent(
                    <ChangeEmailForm 
                        email={userInfo.email}
                        setIsModalVisible={setIsModalVisible}
                        setReloadDataUser={setReloadDataUser}
                        toastRef={toastRef}
                    />
                );
                setIsModalVisible(true);  
                break;
            case "password":
                setRenderComponent(
                    <ChangePasswordForm 
                         setIsModalVisible={setIsModalVisible}
                         toastRef={toastRef}
                    />);
                setIsModalVisible(true);  
                break;
            default:
                setRenderComponent(null);
                setIsModalVisible(false);      
                break;
        }
        

    }
    return (
        <View>
            {menuOptions.map((menu,index) => (
                <ListItem 
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight   
                    }}
                    onPress={menu.onPress}
                    containerStyle={styles.menuItem}
                />
            ))}
           
           {renderComponenet  && (
            <ModalInfoUser isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}>
                    {renderComponenet}
            </ModalInfoUser>
           )}            
        </View>
    );
}


const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3"
        
    }
});