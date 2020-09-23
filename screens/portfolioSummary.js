import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import NavBar from "../components/NavBar";
import { FAB, List, Button, IconButton, Caption } from "react-native-paper";
import Head from "../components/Head";
import { Context } from "../navigation/Store";
import DivCalendar from "../components/DivCalendar";
import { VictoryPie } from "victory-native";
import styles from "../Styling/styles";
function portfolioSummary({ navigation }) {
  const [state, dispatch] = useContext(Context); //important for global state
  const [pie1, setPie1] = useState([]);

  const [reload, setReload] = useState(false);
  function handleCall() {
    console.log("DO SOMETHING HERE");
  }

  useEffect(() => {
    console.log("STRA");

    state.portfolios[state.activeSummary].stocks.map((item, index) => {
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
        titleText={
          "Summary of " + state.portfolios[state.activeSummary].portfolioName
        }
      />
      <VictoryPie
        data={pie1}
        labels={({ datum }) => `${datum.x}: ${datum.y}`}
        width={300}
      />

      <View style={styles.container}>
        <FAB
          style={styles.view_portfolio_reload}
          large
          icon="refresh"
          onPress={() => setReload(!reload)}
        ></FAB>
      </View>
    </>
  );
}

export default portfolioSummary;
