import React, { useState, useContext, useEffect } from "react";
import { View, Dimensions } from "react-native";
import {
  FAB,
  Text,
  List,
  Button,
  IconButton,
  Caption,
} from "react-native-paper";
import Head from "../components/Head";
import { Context } from "../navigation/Store";
import DivCalendar from "../components/DivCalendar";
import styles from "../Styling/styles";
import { LineChart, ProgressChart } from "react-native-chart-kit";
function portfolioSummary({ navigation }) {
  //chart link
  //https://www.npmjs.com/package/react-native-chart-kit
  const [state, dispatch] = useContext(Context); //important for global state
  const [reload, setReload] = useState(false);
  const [testSet, setTestSet] = useState();
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: () => `rgba(1,1,1,0.5)`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const tempPie = {
    labels: ["first", "second", "third"],
    data: [0.75, 0.1, 0.15],
  };
  //plan for this screen
  //have a horizontal section with scroling graphs
  //graphs: pie graphs, line graphs
  //pie graphs: stock breakdown,
  //line graphs: dividend projection
  const HoldingData = {
    labels: [],
    data: [],
  };

  useEffect(() => {
    //runs every time

    const direct = state.portfolios[state.activeSummary];
    if (direct.stocks.length > 0) {
      var totalShares = 0;
      const dat = {
        lables: [],
        data: [],
      };
      //these calculations can be done in the reducer but why not here eh?
      direct.stocks.map((item) => {
        //get total shares in the portfolio
        totalShares = totalShares + item.shares;
      });
      direct.stocks.map((item) => {
        //lables
        dat.lables.push(item.ticker);
      });
      direct.stocks.map((item) => {
        dat.data.push((item.shares / totalShares).toFixed(2));
      });

      setTestSet(dat); //just set it to a object, thats what the pie wants
      console.log(dat);
    }
  }, [reload]);
  return (
    <>
      <Head
        titleText={
          "Summary of " + state.portfolios[state.activeSummary].portfolioName
        }
      />
      {testSet == undefined ? (
        <Text>Nothing to show</Text>
      ) : (
        <ProgressChart
          data={testSet}
          width={screenWidth}
          height={300}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      )}
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
