import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, unstable_enableLogBox } from "react-native";

import { Slider } from "react-native-elements";
import { Context } from "../navigation/Store";

function Picker() {
  const [state, dispatch] = useContext(Context); //important for global state

  const [red, setRed] = useState(0); //colour picker test
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  //to pass colour data to the add port screen, save it to the store as a temp value then when the check is clicked, the colour is applied
  //TO DO
  //add a reducer for setting the temp colour values (Picker.js)
  // add a reducer to save the selected colour(AddPortfolio.js)
  useEffect(() => {
    dispatch({
      type: "GLOBAL_COLOUR",
      data: { red: red, green: green, blue: blue },
    });
  }, [red, green, blue]);
  return (
    <>
      <Text>Select portfolio color</Text>

      <Slider
        style={styles.slider_style}
        value={red}
        minimumValue={0}
        maximumValue={255}
        value={125}
        step={1}
        onValueChange={(value) => setRed(value)}
      />
      <Slider
        value={green}
        value={125}
        minimumValue={0}
        maximumValue={255}
        step={1}
        onValueChange={(value) => setGreen(value)}
      />
      <Slider
        value={blue}
        value={125}
        minimumValue={0}
        maximumValue={255}
        step={1}
        onValueChange={(value) => setBlue(value)}
      />
      <Text>
        Red:{red} Green:{green} Blue:{blue}
      </Text>

      <Text
        style={{
          backgroundColor: `rgba(${red}, ${green}, ${blue}, 1)`,
          height: 30,
        }}
      ></Text>
    </>
  );
}

export default Picker;
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
  indicator: {
    width: 100,
    height: 100,
    color: (100, 200, 300),
  },
  slider_style: {
    alignContent: "center",
  },
});
