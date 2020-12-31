import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { useState, useEffect, useContext } from "react";
import { FAB, List, Button, IconButton, Surface } from "react-native-paper";
import Head from "../components/Head";
import NavBar from "../components/NavBar";
import { Context } from "../navigation/Store";
import styles from "../Styling/styles";
//setup references for dependancy installation for npm and expo!! important for future projects
//https://heartbeat.fritz.ai/getting-started-with-react-native-and-expo-using-hooks-in-2020-fb466c25b04c

 function ViewPortfolio({ navigation }) {
  const [state, dispatch] = useContext(Context); //important for global state
  const [toggleEdit, setEdit] = useState(false);
  //const [portfolioLen,setPortLen]=useState(0)
  ////////////////////////////////////////////////

  useEffect(() => {
    //log state to console for testing
    console.log("View Port");
    console.log(state); //test
    
  }, [state.portfolios]);

  ///////////////////////////////Delete Portfolio from list
  const handleDelete = (thing) => {
    dispatch({ type: "REMOVE_PORT", index: thing });
  };
  ///////////////////////////////logout
 
  return (
    <>
      <Head titleText={"Portfiolio List"} nav={navigation}/>
      <IconButton
        icon="pencil"
        size={25}
        color="white"
        onPress={() => {
          setEdit(!toggleEdit);
        }}
        style={styles.editButton}
      />

      <View style={styles.container}>
        { state.portfolios.length == 1 ? (
          <Text>Click the Portfolio to edit or add stocks!</Text>
        ) : (
          <Text>Click the Portfolios to edit or add stocks!</Text>
        )}

        {state.portfolios.length == 0 ? (
          <Text>No Active Portfiolios</Text>
        ) : (
          <FlatList
            data={state.portfolios} //from global state
            renderItem={(
              { item, index } //need the brackets around item for some reason idk
            ) => (
              <Surface style={styles.surface}>
                <>
                  <List.Item
                    title={item.portfolioName}
                    description={item.portfolioDescription}
                    descriptionNumberOfLines={2}
                    titleStyle={styles.listTitle}
                    onPress={() => {
                      dispatch({
                        type: "SET_ACTIVE_PORT",
                        index: item.portfolioID,
                      }); //make the active portfolioID global
                      navigation.navigate("ViewNotes");
                    }}
                  />
                  {toggleEdit ? (
                    <Button
                      compact="true"
                      icon="delete"
                      mode="contained"
                      onPress={() => handleDelete(item.portfolioID)}
                      style={styles.delete}
                    >
                      Delete{" "}
                    </Button>
                  ) : (
                    <>
                      <Text
                        style={{
                          position: "absolute",
                          right: 20,
                          top: 30,

                          backgroundColor: `rgba(${state.portfolios[index].portColour.red}, ${state.portfolios[index].portColour.green}, ${state.portfolios[index].portColour.blue}, 1)`,
                          height: 20,
                          width: 20,
                        }}
                      ></Text>
                      <Text style={styles.value}>
                        ${state.portfolios[index].portValue}
                      </Text>
                    </>
                  )}
                </>
              </Surface>
            )}
            keyExtractor={(item) => item.portfolioID.toString()}
          />
        )}
        <FAB
          style={styles.fab}
          small
          icon="plus"
          label="Add new portfolio"
          onPress={() => navigation.navigate("AddPortfolio")}
        ></FAB>
      </View>
    </>
  );
}

export default ViewPortfolio;
