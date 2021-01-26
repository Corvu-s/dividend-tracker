import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text, IconButton, TextInput, FAB } from "react-native-paper";
import Head from "../components/Head";
import NavBar from "../components/NavBar";
import { Context } from "../navigation/Store";
import Picker from "../components/Picker";
import styles from "../Styling/styles";
import {firebase} from '../database/config'

function AddPortfolio({ navigation }) {
  const [state, dispatch] = useContext(Context); //important for global state

  const [portfolioName, setName] = useState("");
  const [portfolioDescription, setDescription] = useState("");
  const [red, setRed] = useState(0); //colour picker test
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const stocks = [];
  const portColour = { red: 0, green: 0, blue: 0 };
  const portfolioID = state.portfolios.length + 1;
  const portValue = 0;
  function onSavePortfolio() {
    // navigation.state.params.addPortfolio({
    //   portfolioName,
    //   portfolioDescription,
    //   stocks,
    // });


///////////////////testing the firestore connections,works!
     const db=firebase.firestore();
    const ref=db.collection('users').doc(state.userID)
    //sconsole.log("ref",ref)
    ref.update({
      portfolios: firebase.firestore.FieldValue.arrayUnion({
        portfolioName,
        portfolioDescription,
        stocks,
        portfolioID,
        portValue,
        portColour: state.portColour,
      })
    });
    ////////////////////
    dispatch({
      type: "ADD_PORT",
      payload: {
        portfolioName,
        portfolioDescription,
        stocks,
        portfolioID,
        portValue,
        portColour: state.portColour,
      },
    });
    console.log("CHANGED COLOUR");
    console.log(state);
    navigation.goBack();
  }

  return (
    <>
      <Head titleText={"Add a new portfolio"} />
      <IconButton
        icon="close"
        size={25}
        color="white"
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />

      <View style={styles.container}>
        <TextInput
          autoCapitalize="characters"
          label="Add Portfolio Name Here"
          value={portfolioName}
          mode="outlined"
          onChangeText={setName}
          style={styles.add_portfolio_title}
        />

        <TextInput
          label="Add Portfolio Description Here"
          value={portfolioDescription}
          onChangeText={setDescription}
          mode="flat"
          multiline={true}
          style={styles.add_portfolio_text}
          scrollEnabled={true}
          returnKeyType="done"
          blurOnSubmit={true}
        />

        <FAB
          style={styles.add_portfolio_save}
          small
          icon="check"
          disabled={portfolioName == "" ? true : false}
          onPress={() => onSavePortfolio()}
        />
        <Picker />
      </View>
    </>
  );
}

export default AddPortfolio;
