import React,{useContext,useState,useEffect} from 'react'
import { Text, View, StyleSheet, FlatList } from "react-native";
import {Button,TextInput} from 'react-native-paper'
import styles from "../Styling/styles";
import {firebase} from '../database/config'
import { Context } from "../navigation/Store";
//this is the default login screen, if 


function Login({navigation}){
const [state, dispatch] = useContext(Context); //important for global state

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")


useEffect(()=>{//this handles the login persistance, so we dont have to login each time we open the app
    //still need to update the local state 
    console.log("start")
const userRef=firebase.firestore().collection('users')
firebase.auth().onAuthStateChanged(user=>{
    if(user){
        userRef.doc(user.uid).get().then((document)=>{
            const userData= document.data()
            console.log("user logged in")
            dispatch({type:"LOGIN", data:userData})//sets the data of the app once logged in
            dispatch({type:"SET_LOGGED_IN"})
            navigation.navigate("ViewPortfolio")
        }).catch(err=>{
            alert(err)
        })
    }
})
},[])

function Login(){
firebase.auth().signInWithEmailAndPassword(email,password).then((res)=>{
    const uid=res.user.uid;//gets the actual user id from the authentication response
    const usersRef=firebase.firestore().collection('users')

    usersRef.doc(uid).get().then(document=>{//then based on the sign in response, we query the database and get user data

        if(!document.exists){
            alert("this file does not exist!")
            return
        }
        const user=document.data()
        dispatch({type:"LOGIN", data:user})//sets the data of the app once logged in
        dispatch({type:"SET_LOGGED_IN"})
        navigation.navigate("ViewPortfolio")

    }).catch((err)=>{
        alert(err)
    })
}).catch((err)=>{
    alert(err)
})
}
return(
    <View style={styles.container}>
        <Text>Login</Text>
        <TextInput label="Email" value={email} onChangeText={(text)=>{setEmail(text)}}/>
        <TextInput label="Password" value={password} onChangeText={(text)=>{setPassword(text)}}/>
        <Button onPress={()=>{navigation.navigate("Register")}}>Register</Button>
        <Button onPress={()=>{Login()}}>Login</Button>

    </View>
)
}


export default Login