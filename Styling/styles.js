import React from "react";
import { StyleSheet } from "react-native";
//start the process of moving all the styling into here
//also transition everything to the % width and height thing for multiple phones
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
  },
  fab: {
    position: "absolute",
    margin: 10,
    right: 0,
    bottom: 60,
  },
  fabStock: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 70,
  },
  iconButton: {
    backgroundColor: "rgba(46, 113, 102, 0.8)",
    position: "absolute",
    right: 0,
    top: 40,
    margin: 10,
  },
  listTitle: {
    fontSize: 20,
  },
  delete: {
    position: "absolute",
    margin: 15,
    right: 0,
    bottom: 0,
  },
  add: {
    position: "absolute",
    margin: 15,
    right: 105,
    bottom: 0,
  },
  sub: {
    position: "absolute",
    margin: 15,
    right: 185,
    bottom: 0,
  },
  editButton: {
    backgroundColor: "rgba(46, 113, 102, 0.8)",
    position: "absolute",
    right: 5,
    top: 40,
    margin: 10,
  },
  info: {
    position: "absolute",
    margin: 20,
    right: -20,
    bottom: 0,
  },
  surface: {
    margin: 3,
    padding: 8,
    height: 80,
    width: 350,

    elevation: 5,
  },
  editEnabled: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  value: {
    position: "absolute",
    right: 50,
    top: 30,
  },
  /////////////////////add portfolio
  add_portfolio_title: {
    fontSize: 20,
    marginBottom: 20,
  },

  add_portfolio_text: {
    height: 100,
    fontSize: 16,
  },
  add_portfolio_save: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 50,
  },
  ////////////////////////view stocks
  fabStock: {
    position: "absolute",
    margin: 10,
    right: 0,
    bottom: 120,
  },
  view_stock_edit: {
    backgroundColor: "rgba(46, 113, 102, 0.8)",
    position: "absolute",
    right: 45,
    top: 40,
    margin: 10,
  },

  view_stocks_listTitle: {
    fontSize: 20,
    left: 50,
  },
  view_stocks_descriptionStyle: {
    left: 50,
  },

  view_stocks_add: {
    position: "absolute",
    margin: 15,
    right: 45,
    bottom: 0,
  },
  view_stocks_sub: {
    position: "absolute",
    margin: 15,
    right: 90,
    bottom: 0,
  },
  info: {
    position: "absolute",
    margin: 20,
    right: -20,
    top: 0,
  },
  view_stocks_editEnabled: {
    position: "absolute",
    margin: 16,
    left: 50,
    right: 0,
    top: 55,
  },
  view_stocks_listSize: {
    height: 90,
  },
  ////////////////////Portfolio Summary
  view_portfolio_reload: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 50,
  },
  ///////////////////Summary Screen
  summary_text: {
    justifyContent: "center",
    top: 300,
    height: 300,
    fontSize: 16,
  },

  summary_go_back: {
    position: "absolute",
    right: 125,
    top: 360,
  },
  //////////////Edit Stocks Screen
  edit_titleContainer: {
    fontSize: 20,
    justifyContent: "center",
  },
  edit_title: {
    fontSize: 20,
    marginBottom: 20,
  },

  edit_update_fab: {
    position: "absolute",
    margin: 20,
    top: 570,
    right: 0,
  },
  /////////////////TestAPI
  api_listTitle: {
    fontSize: 20,
  },
});

export default styles;
