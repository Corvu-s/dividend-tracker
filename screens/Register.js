import React,{useContext,useState} from 'react'
import { Text, View, StyleSheet, FlatList } from "react-native";
import styles from "../Styling/styles";
import {Button,TextInput} from 'react-native-paper'

import { Context } from "../navigation/Store";
import {firebase} from '../database/config'
import { sub } from 'react-native-reanimated';
//https://www.freecodecamp.org/news/react-native-firebase-tutorial/

function Register({navigation}){
const [state, dispatch] = useContext(Context); //important for global state

const [fullName,setFullName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [confirm,setConfirm]=useState("")

const submit=()=>{
if(password !== confirm){
    alert("passwords dont match")
    return
}
firebase.auth().createUserWithEmailAndPassword(email,password).then((res)=>{
    const uid=res.user.uid
    // const data={
    //     id:uid,
    //     email,
    //     fullName
    // }
    const initialState = {//this is the same data structure as the origional app
        isLoggedIn:false,
        userID:uid,
        email:email,
        fullName:fullName,
        portColour: {},
        portfolios: [],
        error: null,
        activePort: 0,
        activeSummary: 0,
        latestStock: "",
        currentPrice: 0,
        num: 0,
      };
    const usersRef = firebase.firestore().collection('users')
    usersRef.doc(uid).set(initialState).then(()=>{//need to create a fresh instance of the app data structure in store.js for the database to have
 
    dispatch({type:"SET_LOGGED_IN"})
    navigation.navigate("ViewPortfolio")
    }).catch((err)=>{
        alert(err)
    })
}).catch((err=>{
    alert(err)
}))
}

return(
    <View style={styles.container}>
        <Text>Register</Text>
        <TextInput label="Full Name" value={fullName} onChangeText={text=>setFullName(text)}/>
        <TextInput label="email" value={email} onChangeText={text=>setEmail(text)}/>
        <TextInput label="password" value={password} onChangeText={text=>setPassword(text)}/>
        <TextInput label="Confirm Password" value={confirm} onChangeText={text=>setConfirm(text)}/>

        <Button onPress={()=>submit()}>Submit</Button>
        <Button onPress={()=>{navigation.goBack()}}>Go Back</Button>
    </View>
)
}


export default Register