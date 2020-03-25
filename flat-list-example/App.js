import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import FlatListExample from './FlatListExample';

export default function App() {
  
  const [data, setData]=useState([]);
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const [seed,setSeed]=useState(1);
  const [page,setPage]=useState(1);
  const limit=10;

  useEffect(()=>{
      makeRemoteRequest();
  },[page]);


  makeRemoteRequest = () => {
    console.log("Consultando");
    console.log(page);
    
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=${limit}`;
    setLoading(true);

    fetch(url)
      .then(res => res.json())
      .then(res => {        
          setData(page === 1 ? res.results : [...data, ...res.results]);
          setError(res.error || null); 
          setLoading(false);
                  
      })
      .catch(error => {
          setError(error || null); 
          setLoading(false);
      });
  };


  return (
    <View style={styles.container}>
      <Text>User list</Text>
      <FlatListExample data={data} makeRemoteRequest={makeRemoteRequest} setPage={setPage} page={page}/>
      { loading ? <ActivityIndicator size="large" color="#00ff00"/> : <Text>{error}</Text>}
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
