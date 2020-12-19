import React,{useContext,useState} from 'react'
import { Text, View, StyleSheet, FlatList } from "react-native";
import {Button} from 'react-native-paper'
import styles from "../Styling/styles";

import { Context } from "../navigation/Store";



function Login({navigation}){
const [state, dispatch] = useContext(Context); //important for global state

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")


function register(){
    navigation.navigate("Register")
}
return(
    <View style={styles.container}>
        <Text>Hi</Text>
        <Button
                      compact="true"
                      mode="contained"
                      onPress={() => register()}
                      style={styles.delete}
                    >
                      Register{" "}
        </Button>
    </View>
)
}


export default Login