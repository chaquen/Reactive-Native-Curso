import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import  Loading  from './Loading.js';

export default function App() {
  const [estaCargando,setEstaCargando] = useState(false);
  if(estaCargando == true){
    console.log("Cargando: TRUE");
  }else{
    console.log("Cargando: FALSE");
  }
  return (
    <View style={styles.container}>
      <Text>Ejemplo usando Hook useState</Text>
      <Text>Preciona el botón </Text>
      <Text> descubre la magia de los estados</Text>
      <Text>y las funciones de flecha</Text>
      {estaCargando === true && <Loading/>}
      <Button title="Actualizar estado" onPress = { () => estaCargando === true ? setEstaCargando(false) : setEstaCargando(true)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
