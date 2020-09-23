import React from "react";
import { useState, useEffect, useContext } from "react";
import { View, FlatList } from "react-native";
import { Text, IconButton, TextInput, List } from "react-native-paper";
import Head from "../components/Head";
import { divide } from "react-native-reanimated";
import { Context } from "../navigation/Store";
import styles from "../Styling/styles";
function TestAPI({ navigation }) {
  const [state, dispatch] = useContext(Context); //important for global state
  const key = "X3NP9R0INXUALP1Z";
  const volumeKey = "pk_00f6356660934dc88615f044bc3ad47f";
  ////
  const [list, setList] = useState([]);
  ///data
  const [tick, setTicker] = useState("");
  const [click, setClick] = useState(false);

  ///define variables for data fields in each stock information
  const [price, setPrice] = useState(0);
  const stockID = 0;
  const divAmount = 0;
  const paymentDate = "";
  const divFrequency = "";
  const logo = "";
  const shares = 0;
  const cost = 0;
  const yearToDateDivs = [];
  //const [selected, setSelected] = useState({ symbol: " ", index: " " });
  //IEX token pk_00f6356660934dc88615f044bc3ad47f
  //This Works,use for general data !! https://cloud.iexapis.com/stable/stock/aapl/book?token=pk_00f6356660934dc88615f044bc3ad47f
  // USE FOR SEARCH THING https://cloud.iexapis.com/stable/stock/market/batch?symbols=aapl,fb&types=quote,news,chart&range=1m&last=5&token=pk_00f6356660934dc88615f044bc3ad47f

  //for later use https://cloud.iexapis.com/stable/stock/market/batch?symbols=${temp}&types=quote,news,chart&range=1m&last=5&token=pk_00f6356660934dc88615f044bc3ad47f

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${tick}&apikey=${key}&datatype=json`
    )
      .then((response) => response.json())
      .then((json) => {
        setList(json.bestMatches);
      });
  }, [tick]);

  function saveChoice(ticker, name) {
    if (ticker == undefined) {
      console.log("balls");
    } else {
      dispatch({
        type: "ADD_STOCK",
        number: state.activePort,
        payload: {
          ticker,
          name,
          shares,
          price,
          cost,
          divFrequency,
          divAmount,
          paymentDate,
          yearToDateDivs,
          logo,
          stockID: state.portfolios[state.activePort - 1].stocks.length + 1,
        },
        tick: ticker,
        number: state.activePort,
      });

      navigation.goBack();
    }
  }

  return (
    <>
      <Head titleText={"Stock Picker"} />
      <IconButton
        icon="close"
        size={25}
        color="white"
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />
      <View style={styles.container}>
        <TextInput
          label="search"
          value={tick}
          onChangeText={setTicker}
          mode="outlined"
        />
        {list == undefined ? (
          <Text> Nothing selected</Text>
        ) : (
          <FlatList
            data={list}
            renderItem={({ item, index }) => (
              <>
                <List.Item
                  title={list[index]["1. symbol"]}
                  key={index}
                  description={list[index]["2. name"]}
                  descriptionNumberOfLines={2}
                  titleStyle={styles.api_listTitle}
                  onPress={() => {
                    //maybe add the api calls here
                    setClick(!click);
                    saveChoice(
                      list[index]["1. symbol"],
                      list[index]["2. name"]
                    );
                  }}
                />
              </>
            )}
            keyExtractor={(item) => item["1.symbol"]}
          />
        )}
      </View>
    </>
  );
}

export default TestAPI;
