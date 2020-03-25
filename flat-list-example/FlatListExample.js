import React from 'react';
import {StyleSheet,FlatList,View,Text,TouchableOpacity} from 'react-native';

export default function FlatListExample(props){
    const {data,makeRemoteRequest,setPage,page}=props;
  
    return (
        <View style={styles.viewFlat}>
            <FlatList
                data={data}
                renderItem={
                    d => <User data={d} />
                }
                keyExtractor={(item,index) => index.toString()}
                //onEndReached={()=> makeRemoteRequest}
                onEndReached={()=>setPage(page+1)}
                onEndReachedThreshold={0.2}  
                initialNumToRender={10}  
            >
            </FlatList>
            
        </View>
    );
}   


function User(props){
    const {data}=props;
    const {id, email,gender,name } = data.item;
    return (
        <TouchableOpacity
            onPress={()=>{ /*setPage(page+1)*/ }}
        >
            <View style={styles.item}>
                <Text>{name.first}</Text>
            </View>

        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    viewFlat:{
        width:"100%",
        height: 500        
        
    },
    item:{
        paddingTop:10,
        alignItems:"center"
    }
});
