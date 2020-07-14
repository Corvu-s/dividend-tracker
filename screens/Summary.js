import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import NavBar from "../components/NavBar";
import { FAB, List, Button, IconButton, Caption } from "react-native-paper";
import Head from "../components/Head";
import { Context } from "../navigation/Store";
import { VictoryPie } from "victory-native";
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
                  onPress={
                    () =>
                      navigation.navigate("portfolioSummary", {
                        data: item.portfolioID,
                      }) //pass selected port to the
                  }
                />
              </List.Section>
            )}
            keyExtractor={(key) => key.portfolioID.toString()}
          ></FlatList>
        ) : (
          <>
            <Text style={styles.text}>
              You Have no Portfolios! Go back and add some!
            </Text>
            <Button
              style={styles.back}
              mode="contained"
              icon="arrow-up-bold"
              onPress={() => navigation.goBack()}
            >
              Go Back
            </Button>
          </>
        )}
      </View>
      <NavBar nav={navigation} />
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
    justifyContent: "center",
    top: 300,
    height: 300,
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 50,
  },
  listPos: {
    position: "absolute",
    bottom: 100,
  },
  back: {
    position: "absolute",
    right: 125,
    top: 360,
  },
});

export default Summary;
