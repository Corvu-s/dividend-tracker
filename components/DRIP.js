

import React,{useState,useContext,useEffect} from 'react'
import Head from "../components/Head";
import { Context } from "../navigation/Store";
import {View} from 'react-native'
import { Text, IconButton, TextInput, FAB,RadioButton ,ToggleButton,Switch} from "react-native-paper";
import styles from '../Styling/styles'

function DRIP({navigation}){
    
    const [state, dispatch] = useContext(Context); //important for global state

    const [price,setPrice]=useState(0)
    const [div,setDiv]=useState(0.0)
    const [dripAmount,setDrip]=useState(0)
    const [quarter,setQuarter]=useState(true)
    const [month,setMonth]=useState(false)
    const [submit,setSubmit]=useState(false)
    function calculateDrip(){

    }
    const handleSubmit=()=>{
      //calculate monthly cost then choose
      var num=(price/div)
      console.log(price+" "+div)
      setDrip(num)
    }
    const handleQuarter= ()=>{
     setQuarter(!quarter)
     if(month){
       setMonth(false)
     }
    }
    const handleMonth =()=>{
    
      setMonth(!month)
      if(quarter){
        setQuarter(false)
      }
    
    }

    //price input
    //choose between quarter or monthly
    //submit button
    //display it

    return(
        <>
      <Head
        titleText={
          "DRIP Calculator"
        }
        
      />
      <View style={styles.container}>
        <TextInput label="Share Price"  value={price} onChangeText={e=>{setPrice(parseInt(e))}}/>
        <TextInput label="DiV Amount"  value={div} onChangeText={e=>{setDiv(parseFloat(e))}}/>

     
        <View>
        <Text>Quarterly Calculation</Text>
        <Switch value={quarter} onValueChange={handleQuarter}/>
        <Text>Monthly Calculation</Text>
        <Switch value={month} onValueChange={handleMonth}/>
        </View>

        <FAB value={submit}  icon="plus-minus"  small onPress={handleSubmit}/>

      <Text>You need to buy {dripAmount} shares to earn 1 new share each {quarter ? "quarter": "month"}</Text>
      <Text>Thats ${dripAmount *price } !</Text>
    </View>
        </>
    )
}


export default DRIP