import React, { useState, useContext, useEffect } from "react";
import { View, Dimensions,ScrollView } from "react-native";
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
import { LineChart, ProgressChart, PieChart,ContributionGraph } from "react-native-chart-kit";
function portfolioSummary({ navigation }) {
  //chart link
  //https://www.npmjs.com/package/react-native-chart-kit
  // module or hook idea, make a function that returns a specified number of rgb colours that are close to eachother, i
  //kinda like make me a colour swatch with n shades that are similar
  const [state, dispatch] = useContext(Context); //important for global state
  const [reload, setReload] = useState(false);
  const [pieData, setPieData] = useState();
  const [div,setDiv]=useState();

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
 

  const commitsData = [
    { date: "2017-01-02", count: 1 },
    { date: "2017-01-03", count: 2 },
    { date: "2017-01-04", count: 3 },
    { date: "2017-01-05", count: 4 },
    { date: "2017-01-06", count: 5 },
    { date: "2017-01-30", count: 2 },
    { date: "2017-01-31", count: 3 },
    { date: "2017-03-01", count: 2 },
    { date: "2017-04-02", count: 4 },
    { date: "2017-03-05", count: 2 },
    { date: "2017-02-30", count: 4 }
  ];

  useEffect(() => {
    //runs every time

    const direct = state.portfolios[state.activeSummary];
    if (direct.stocks.length > 0) {
      var data = [];
      var divData=[];

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
        if(item.yearToDateDivs.length!=0){
          item.yearToDateDivs.map((mappedDivData)=>{
            divData.push({date:mappedDivData.date, count:10})
          })
        }
      });
      setDiv(divData);
      setPieData(data); //just set it to a object, thats what the pie wants
      console.log(div);
    }
  }, [reload]);
  return (
    <>
      <Head
        titleText={
          "Summary of " + state.portfolios[state.activeSummary].portfolioName
        }
      />
      
      <View style={styles.container}>
        <>
        <ScrollView>
        {pieData == undefined ? (
        <Text>Nothing to show</Text>
      ) : (
        <>
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

        <ContributionGraph
        //year-month-day
  values={commitsData}
  endDate={new Date("2017-04-01")}
  numDays={105}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
/>

        </>

      )}

          
        </ScrollView>



        <FAB
          style={styles.view_portfolio_reload}
          large
          icon="refresh"
          onPress={() => setReload(!reload)}
        ></FAB>
        </>
      </View>
    </>
  );
}

export default portfolioSummary;
