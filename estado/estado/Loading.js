import React, {useState} from "react";
import { StyleSheet,View, Text } from 'react-native';


export default function Loading() {
  return (
     <View style={styles.containerText}>
     	<Text>Hola Bronca estoy cargando ...</Text>
     </View>         
  );
}

const styles = StyleSheet.create({
  containerText: {
   
    backgroundColor: '#FA8072',
    
  },
});