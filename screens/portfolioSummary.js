import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import NavBar from "../components/NavBar";
import { FAB, List, Button, IconButton, Caption } from "react-native-paper";
import Head from "../components/Head";
import { Context } from "../navigation/Store";
import DivCalendar from "../components/DivCalendar";
import { VictoryPie } from "victory-native";

function portfolioSummary({ navigation }) {
  const [state, dispatch] = useContext(Context); //important for global state
  const [pie1, setPie1] = useState([]);

  const data = navigation.state.params.data; //id for the passed portfolio

  const [reload, setReload] = useState(false);
  function handleCall() {
    console.log("DO SOMETHING HERE");
  }

  useEffect(() => {
    console.log("STRA");

    state.portfolios[data - 1].stocks.map((item, index) => {
      setPie1((prevState) => [...prevState, { x: item.ticker, y: item.cost }]); //useful bc it updates itself by adding the prev state along with a new element
    });
    console.log("RES");
    console.log(pie1);
  });
  //plan for this screen
  //have a horizontal section with scroling graphs
  //graphs: pie graphs, line graphs
  //pie graphs: stock breakdown,
  //line graphs: dividend projection

  return (
    <>
      <Head
        titleText={"Summary of " + state.portfolios[data - 1].portfolioName}
      />
      <VictoryPie
        data={pie1}
        labels={({ datum }) => `${datum.x}: ${datum.y}`}
        width={300}
      />

      <View style={styles.container}>
        <FAB
          style={styles.fab}
          large
          icon="refresh"
          onPress={() => setReload(!reload)}
        ></FAB>
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
    top: 100,
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
});

export default portfolioSummary;
