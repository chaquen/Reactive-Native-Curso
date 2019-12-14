import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  Loading  from './Loading.js';
import  ComponenteDos  from './ComponenteDos.js';

export default function App() {
  const strTexto="Soy";
  const strOtroTexto="Edgar desarrollando en React-Native";
  return (
    <View style={styles.container}>
      <Text>Hola Mundo usando mi primer componente!</Text>
      <Loading />     
      <ComponenteDos texto={strTexto} otroTexto={strOtroTexto}/>      
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
