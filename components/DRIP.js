

import React,{useState,useContext,useEffect} from 'react'
import Head from "../components/Head";
import { Context } from "../navigation/Store";
import {View,Alert} from 'react-native'
import { Text, IconButton, TextInput, FAB,RadioButton ,ToggleButton,Switch,Menu,Button,Divider} from "react-native-paper";
import styles from '../Styling/styles'

function DRIP({navigation}){
    
    const [state, dispatch] = useContext(Context); //important for global state

    const [price,setPrice]=useState("0")
    const [div,setDiv]=useState("0")
    const [dripAmount,setDrip]=useState(0)
    const [submit,setSubmit]=useState(false)
    const [menu,setMenu]=useState(false)
    const [alert,setAlert]=useState("")
    const direct = state.portfolios[state.activeSummary];

    const invalidAlert=(name)=>{
      Alert.alert(
        "Oh snap!",//alert title
        `Looks like ${name} doesn't have a dividend!`,//alert message
        [
         
          { text: "OK", onPress: () => console.log("exit alert") }
        ],
        { cancelable: false }
      );
    }


    const openMenu=()=>{
      setMenu(true)
    }
    const closeMenu=()=>{
      setMenu(false)
    }
const handleDropdown=(p,d,s)=>{
  if(d=="unspecified"){
    invalidAlert(s)
    setDiv("0")
  }else{
    setPrice(p+"")
    setDiv(d+"")
  }
  console.log("price"+p+" " + d)
  closeMenu()

}
    const handleSubmit=()=>{
      //calculate monthly cost then choose
      console.log(price+" "+div)
      if(price!="0" && div!= "0"){
        var num=(parseInt(price)/parseFloat(div)).toFixed(2)
        console.log(num)

        setDrip(num)
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
        <TextInput label="Share Price"  value={price} onChangeText={e=>{setPrice(e)}}/>
        <TextInput label="DiV Amount"  value={div} onChangeText={e=>{setDiv(e)}}/>


        <Menu
          visible={menu}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Your Stocks</Button>}>
            {direct.stocks.map((item)=>(
              <Menu.Item onPress={()=>{handleDropdown(item.price,item.divFrequency,item.ticker)}} title={item.ticker} key={item.stockID} />       
            ))}  
        </Menu>
     
 
    
    
        <FAB value={submit}  icon="plus-minus"  small onPress={handleSubmit}/>

        {price!=0 && div != 0 ? <Text>You need to buy {dripAmount} shares to earn 1 new share each dividend payment</Text>:<Text>Enter some data</Text> }


    </View>
        </>
    )
}


export default DRIP