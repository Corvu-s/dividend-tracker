import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

function NavBar(props) {
  return (
    <View>
      <Appbar style={styles.bottom}>
        <Appbar.Action
          color="white"
          icon="archive"
          onPress={() => props.nav.navigate("ViewPortfolio")}
        />

        <Appbar.Action
          color="white"
          icon="bank"
          onPress={() =>
            props.nav.navigate("Summary", { summaryData: props.data })
          }
        />
        <Appbar.Action
          color="white"
          icon="calendar"
          onPress={() => props.nav.navigate("DivCalendar")}
        />
      </Appbar>
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "grey",
  },
});
export default NavBar;
