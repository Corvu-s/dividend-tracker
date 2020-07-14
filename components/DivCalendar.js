import React, { useContext, useState, useEffect } from "react";
import { Context } from "../navigation/Store";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";

function DivCalendar() {
  const [state, dispatch] = useContext(Context);
  const data = [];
  //we need to do something to pile all the data into one array for the calendar to look at nicley
  //we can do this ina useEffect maybe so its always up to date
  return (
    <View style={styles.container}>
      <Calendar
        // Initially visible month. Default = Date()
        current={"2020-07-06"}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined

        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy MM"}
      />
    </View>
  );
}

export default DivCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
