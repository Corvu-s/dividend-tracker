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
import { LineChart, ProgressChart, PieChart } from "react-native-chart-kit";
function portfolioSummary({ navigation }) {
  //chart link
  //https://www.npmjs.com/package/react-native-chart-kit
  // module or hook idea, make a function that returns a specified number of rgb colours that are close to eachother, i
  //kinda like make me a colour swatch with n shades that are similar
  const [state, dispatch] = useContext(Context); //important for global state
  const [reload, setReload] = useState(false);
  const [pieData, setPieData] = useState();

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
      var data = [];

      //to make this better, have the multiplier for the rgb be a function of the number of stocks so the colours dont get too fucked up after too many stocks
      direct.stocks.map((item, index) => {
        data.push({
          name: item.ticker,
          shares: item.shares,
          color: `rgba(${(1 + index) * 30},${(1 + index) * 40},${
            (1 + index) * 50
          })`,
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        });
      });
      setPieData(data); //just set it to a object, thats what the pie wants
      console.log(data);
    }
  }, [reload]);
  return (
    <>
      <Head
        titleText={
          "Summary of " + state.portfolios[state.activeSummary].portfolioName
        }
      />
      {pieData == undefined ? (
        <Text>Nothing to show</Text>
      ) : (
        <PieChart
          data={pieData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="shares"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
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
