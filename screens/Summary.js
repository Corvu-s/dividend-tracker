import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList } from "react-native";
import NavBar from "../components/NavBar";
import { FAB, List, Button, IconButton, Caption } from "react-native-paper";
import Head from "../components/Head";
import { Context } from "../navigation/Store";
import styles from "../Styling/styles";
function Summary({ navigation }) {
  const [state, dispatch] = useContext(Context); //important for global state

  return (
    <>
      <Head titleText={"Summary"} />

      <View style={styles.container}>
        {state.portfolios.length == 1 ? (
          <Text>Click the Portfolio to see a detailed summary!</Text>
        ) : (
          <Text>Click the Portfolios to see a detailed summary!</Text>
        )}
        {state.portfolios.length != 0 ? (
          <FlatList
            data={state.portfolios}
            renderItem={({ item, index }) => (
              <List.Section>
                <List.Item
                  title={item.portfolioName}
                  description={item.portfolioDescription}
                  onPress={() => {
                    dispatch({
                      type: "SET_ACTIVE_SUMMARY",
                      data: item.portfolioID - 1,
                    });
                    navigation.navigate("portfolioSummary");
                    console.log("DATA" + state.activeSummary);
                  }}
                />
              </List.Section>
            )}
            keyExtractor={(key) => key.portfolioID.toString()}
          ></FlatList>
        ) : (
          <>
            <Text style={styles.summary_text}>
              You Have no Portfolios! Go back and add some!
            </Text>
            <Button
              style={styles.summary_go_back}
              mode="contained"
              icon="arrow-up-bold"
              onPress={() => navigation.goBack()}
            >
              Go Back
            </Button>
          </>
        )}
      </View>
    </>
  );
}

export default Summary;
