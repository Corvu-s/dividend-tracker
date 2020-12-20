import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Title } from "react-native-paper";
import { Header } from "react-native/Libraries/NewAppScreen";
import {Button} from 'react-native-paper'
import {firebase} from '../database/config'
function Head({ titleText,nav}) {
  function logOut(){
    firebase.auth().signOut().then(()=>{
    alert("logged out")
    nav.navigate("Login")
    }).catch((err)=>{
      alert(err)
    })
    }


  return (
    <Appbar.Header style={styles.headerContainer}>
      <View style={styles.container}>
        <Button onPress={()=>{logOut()}}>Sign Out</Button>
        <Title style={styles.title}>{titleText}</Title>
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#60DBC5",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#2E7166",
  },
});
export default Head;
