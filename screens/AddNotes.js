import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text, IconButton, TextInput, FAB } from "react-native-paper";
import Head from "../components/Head";
import NavBar from "../components/NavBar";
import { Context } from "../navigation/Store";

import styles from "../Styling/styles";

function AddNotes({ navigation }) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [noteOrder, setNoteOrder] = useState("");
  const [state, dispatch] = useContext(Context); //important for global state
  function onSaveNote() {
    //use similar style in ViewNotes to pass the notes object array to the portfolio screen
    navigation.state.params.addNote({ noteTitle, noteValue, noteOrder });
    navigation.goBack();
  }

  return (
    <>
      <Head titleText={"Add a new note"} />
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
          label="Add Title Here"
          value={noteTitle}
          mode="outlined"
          onChangeText={setNoteTitle}
          style={styles.title}
        />

        <TextInput
          label="Add Note Here"
          value={noteValue}
          onChangeText={setNoteValue}
          mode="flat"
          multiline={true}
          style={styles.text}
          scrollEnabled={true}
          returnKeyType="done"
          blurOnSubmit={true}
        />
        <TextInput
          label="Set Note Prioriety"
          value={noteOrder}
          mode="outlined"
          keyboardType="default"
          onChangeText={(e) => setNoteOrder(e)}
          style={styles.title}
        />

        <FAB
          style={styles.fab}
          small
          icon="check"
          disabled={noteTitle == "" ? true : false}
          onPress={() => onSaveNote()}
        />
      </View>
      <NavBar />
    </>
  );
}

export default AddNotes;
