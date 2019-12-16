import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import  Loading  from './Loading.js';

export default function App() {
  const [estaCargando,setEstaCargando] = useState(false);
  useEffect( ()=> {
    console.log("Ejecutandose useEffect");
    console.log("estaCargando tiene el valor: ",estaCargando);
  },[estaCargando]);

  return (
    <View style={styles.container}>
      <Text>Ejemplo usando Hook useEffect</Text>
      <Text>Preciona el botón </Text>
      <Text>descubre la magia del hook useEffect</Text>
      <Text>ve a la consola para ver que sucede</Text>
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
