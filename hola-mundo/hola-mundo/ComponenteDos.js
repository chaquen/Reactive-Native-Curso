import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function ComponenteDos(props) {
	const { texto, otroTexto} = props;
	console.log(props);
  return (
     <View>
     	<Text> {texto} {otroTexto}</Text>
     </View>         
  );
}