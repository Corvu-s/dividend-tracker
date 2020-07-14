import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text, IconButton, TextInput, FAB } from "react-native-paper";
import Head from "../components/Head";
import NavBar from "../components/NavBar";
import { Context } from "../navigation/Store";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  iconButton: {
    backgroundColor: "rgba(46, 113, 102, 0.8)",
    position: "absolute",
    right: 0,
    top: 40,
    margin: 10,
  },
  text: {
    height: 300,
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 50,
  },
});

export default AddNotes;
