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
  const [Monthlydiv,setMonthlyDiv]=useState();
  const [monthlyDivTotal,setMTotal]=useState(0);
  const [quarterDivTotal,setQTotal]=useState(0);
  const [QuarterDiv,setQuarterDiv]=useState();
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
  

 
  //plan for this screen
  //have a horizontal section with scroling graphs
  //graphs: pie graphs, line graphs
  //pie graphs: stock breakdown,
  //line graphs: dividend projection
 

  

  useEffect(() => {
    //runs every time

    const direct = state.portfolios[state.activeSummary];
    if (direct.stocks.length > 0) {
      var data = [];
      var monthlydata=[];
      var quarterdata=[];
      
      var quarterlyTotal=0;
      var monthlyTotal=0;
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
          item.yearToDateDivs.map((mappedDivData)=>{//only works for div dates that are unique. If two stocks have the same div dat then its not counted. Redo the algorithm so multiple stocks are supported
            if(mappedDivData.frequency =="Monthly"){
                setMTotal((monthlyDivTotal+(mappedDivData.amount * item.shares)));
                monthlydata.push({ticker:mappedDivData.ticker,value:mappedDivData.amount, date:mappedDivData.paymentDate})
            }else if(mappedDivData.frequency== "quarterly"){
              setQTotal((quarterDivTotal+(mappedDivData.amount * item.shares)));
             quarterdata.push({ticker:mappedDivData.ticker,value:mappedDivData.amount, date:mappedDivData.paymentDate})
            }
          })
        }
      });
      setQuarterDiv(quarterdata)
      setMonthlyDiv(monthlydata)
      setPieData(data); //just set it to a object, thats what the pie wants
      console.log(quarterDivTotal);
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
        <Text>Go add some stocks!</Text>
      ) : (
        <>
        <Text>Holding breakdown</Text>
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
        <Text>Dividend Breakdown</Text>
      <Text>Quarterely Dividends:{quarterDivTotal}</Text>
      <Text>Monthly Dividends:{ monthlyDivTotal}</Text>
     
        </>
      )}

          
        </ScrollView>

        
     
        </>
      </View>
    </>
  );
}

export default portfolioSummary;
