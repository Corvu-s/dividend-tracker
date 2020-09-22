import React from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import {
  Text,
  FAB,
  List,
  Button,
  IconButton,
  Caption,
} from "react-native-paper";
import Head from "../components/Head";
import { useState, useEffect, useContext } from "react";
import NavBar from "../components/NavBar";
import { Context } from "../navigation/Store";
import styles from "../Styling/styles";
//////////////////////////////////////////////////
function ViewNotes({ navigation }) {
  const [state, dispatch] = useContext(Context); //important for global state

  const [notes, setNotes] = useState();
  const [edit, setEdit] = useState(false);
  const [reload, setReload] = useState(false);
  ///////////////////////////////Go back to portfolio page
  function saveSet() {
    navigation.goBack();
  }

  useEffect(() => {
    //use this to get data, uses the latestStock field to detect a stock addition,(or a reload is initiated) then calls tha api here
    if (state.portfolios[state.activePort - 1].stocks.length == 0) {
      console.log("nothing");
    } else {
      console.log("map");
      state.portfolios[state.activePort - 1].stocks.map((item, index) => {
        //////////////////////Price
        fetch(
          `https://cloud.iexapis.com/stable/stock/${item.ticker}/book?token=pk_00f6356660934dc88615f044bc3ad47f`
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((responseJson) => {
            console.log(responseJson);
            dispatch({
              type: "ADD_PRICE",
              i: index,
              data: responseJson.quote.iexRealtimePrice,
            });
            console.log(state);
          })
          .catch((error) => {
            console.log(error);
          });
        ///////////////////Logo
        fetch(
          `https://cloud.iexapis.com/stable/stock/${item.ticker}/logo?token=pk_00f6356660934dc88615f044bc3ad47f`
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((responseJson) => {
            dispatch({
              type: "ADD_LOGO",
              i: index,
              data: responseJson.url,
            });
            console.log(state);
          })
          .catch((error) => {
            console.log(error);
          });
        //////////////////////////Dividends
        fetch(
          `https://cloud.iexapis.com/stable/stock/${item.ticker}/dividends/ytd?token=pk_00f6356660934dc88615f044bc3ad47f`
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((responseJson) => {
            const len = responseJson.length;
            const thing = responseJson[len - 1]; //latest payment date, can update to display

            dispatch({
              type: "ADD_DIV_AMOUNT",
              i: index,
              data: parseFloat(thing.amount),
            });
            dispatch({
              type: "ADD_DIV_FREQ",
              i: index,
              data: thing.frequency,
            });
            dispatch({
              type: "ADD_DIV_DATE",
              i: index,
              data: thing.paymentDate,
            });
            dispatch({
              type: "ADD_DIV_HIST",
              i: index,
              data: responseJson,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, [state.latestStock, reload]);

  ///////////////////////////////
  //link https://expo.io/@corvus_/cool-thing

  // const updateNote = (note) => {
  //   note.Origional.name = note.name;
  //   note.Origional.shares = note.shares;
  //   note.Origional.cost = note.Origional.shares * note.Origional.price; //upodates the cost of a stock based on share input
  //   setNotes([...notes]);
  //   setEdit(false);
  // };

  function handleDelete(index) {
    dispatch({ type: "REMOVE_STOCK", i: index });
  }

  function handleIncrease(index, p) {
    console.log("PRICE WHEN INCREASED " + p);
    dispatch({ type: "ADD_SHARE", i: index, val: p });
    console.log(state);
  }

  function handleDecrease(index) {
    if (state.portfolios[state.activePort - 1].stocks[index].shares > 0) {
      dispatch({ type: "REMOVE_SHARE", i: index });
    }
  }

  function handleRefresh() {
    setReload(!reload);
  }

  return (
    <>
      <Head
        titleText={
          state.portfolios[state.activePort - 1].portfolioName + ":Stock List"
        }
      />
      <IconButton
        icon="pencil"
        size={25}
        color="white"
        onPress={() => {
          setEdit(!edit);
        }}
        style={styles.view_stock_edit}
      />
      <IconButton
        icon="check"
        size={25}
        color="white"
        onPress={() => {
          saveSet();
        }}
        style={styles.iconButton}
      />
      <View style={styles.container}>
        {state.portfolios[state.activePort - 1].stocks.length == 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Press + to add a stock!</Text>
          </View>
        ) : (
          <>
            <Text>
              Total Value{" "}
              {state.portfolios[state.activePort - 1].portValue.toFixed(2)}
            </Text>
            <FlatList
              data={state.portfolios[state.activePort - 1].stocks}
              extraData={reload}
              renderItem={({ item, index }) => (
                <>
                  <List.Section style={styles.view_stocks_listSize}>
                    <List.Item
                      title={item.name}
                      description={
                        "Shares: " +
                        state.portfolios[state.activePort - 1].stocks[index]
                          .shares +
                        " " +
                        item.ticker
                      }
                      descriptionNumberOfLines={1}
                      titleNumberOfLines={1}
                      titleStyle={styles.view_stocks_listTitle}
                      descriptionStyle={styles.view_stocks_descriptionStyle}
                      onPress={() =>
                        navigation.navigate("EditNotes", {
                          i: index, //index for the specific stock in the stack
                        })
                      }
                    />
                    {edit ? (
                      <>
                        <Caption style={styles.view_stocks_editEnabled}>
                          Book:$
                          {
                            state.portfolios[state.activePort - 1].stocks[index]
                              .price
                          }
                          {"\n"}Owned:$
                          {
                            state.portfolios[state.activePort - 1].stocks[index]
                              .cost
                          }
                          {""}
                        </Caption>
                      </>
                    ) : (
                      <></>
                    )}
                  </List.Section>

                  {edit ? (
                    <>
                      <Button
                        compact="true"
                        icon="plus"
                        mode="contained"
                        onPress={() =>
                          handleIncrease(
                            index,
                            state.portfolios[state.activePort - 1].stocks[index]
                              .price
                          )
                        }
                        style={styles.view_stocks_add}
                      ></Button>
                      <Button
                        compact="true"
                        icon="minus"
                        mode="contained"
                        onPress={() => handleDecrease(index)}
                        style={styles.view_stocks_sub}
                      ></Button>
                      <Button
                        compact="true"
                        icon="delete"
                        mode="contained"
                        onPress={() => handleDelete(index)}
                        style={styles.delete}
                      ></Button>
                    </>
                  ) : (
                    <>
                      <Text style={styles.info}>
                        Book:${item.price}
                        {"\n"}Owned:${item.cost}
                      </Text>
                    </>
                  )}

                  <Image
                    source={{ uri: item.logo }}
                    style={{
                      width: 40,
                      height: 50,
                      position: "absolute",
                      top: 15,
                      right: 310,
                    }}
                    resizeMode="contain"
                  />
                </>
              )}
              keyExtractor={(item) => item.ticker.toString()}
            />
          </>
        )}

        <FAB
          style={styles.fab}
          large
          icon="refresh"
          onPress={() => handleRefresh()}
        ></FAB>

        <FAB
          style={styles.fabStock}
          large
          icon="plus"
          onPress={() => navigation.navigate("TestAPI")}
        />
      </View>
    </>
  );
}

export default ViewNotes;
