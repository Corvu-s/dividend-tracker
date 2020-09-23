import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text, IconButton, TextInput, FAB } from "react-native-paper";
import Head from "../components/Head";
import NavBar from "../components/NavBar";
import { Context } from "../navigation/Store";

function EditNotes({ navigation }) {
  const [state, dispatch] = useContext(Context); //important for global state

  const index = navigation.state.params.i;
  const initialShares =
    state.portfolios[state.activePort - 1].stocks[index].shares; //initial shares
  const [shares, setShares] = useState(0);

  function updateNote() {
    dispatch({ type: "UPDATE_SHARES", i: index, data: shares });
    console.log(state);
    navigation.goBack();
  }
  return (
    <>
      <Head
        titleText={
          "Edit " + state.portfolios[state.activePort - 1].stocks[index].name
        }
      />
      <IconButton
        icon="close"
        size={25}
        color="white"
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />

      <View style={styles.container}>
        <Text style={styles.edit_titleContainer}>
          Shares Owned:{" "}
          {state.portfolios[state.activePort - 1].stocks[index].shares}
        </Text>

        <TextInput
          label="Change Number of Shares"
          value={shares}
          mode="outlined"
          keyboardType="default"
          onChangeText={(e) => setShares(parseInt(e))}
          style={styles.edit_title}
        />
        <FAB
          style={styles.edit_update_fab}
          small
          icon="check"
          onPress={() => updateNote()}
        />
      </View>
      <NavBar />
    </>
  );
}

const styles = StyleSheet.create({
  edit_titleContainer: {
    fontSize: 20,
    justifyContent: "center",
  },
  edit_title: {
    fontSize: 20,
    marginBottom: 20,
  },

  edit_update_fab: {
    position: "absolute",
    margin: 20,
    top: 570,
    right: 0,
  },
});
export default EditNotes;
