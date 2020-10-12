import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ViewNotes from "../screens/ViewNotes";
import AddNotes from "../screens/AddNotes";
import EditNotes from "../screens/EditNotes";
import TestAPI from "../screens/TestAPI";
import ViewPortfolio from "../screens/ViewPortfolio";
import AddPortfolio from "../screens/AddPortfolio";
import Summary from "../screens/Summary";
import portfolioSummary from "../screens/portfolioSummary";
import DivCalendar from "../components/DivCalendar";
import DRIP from "../components/DRIP"
import { createDrawerNavigator } from "@react-navigation/drawer";

//import DrawerControl from "../navigation/DrawerControl";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerControl() {
  return (
    <Drawer.Navigator initialRouteName="ViewPortfolio">
      <Drawer.Screen name="ViewPortfolio" component={ViewPortfolio} />
      <Drawer.Screen name="Summary" component={Summary} />
      <Drawer.Screen name="DivCalendar" component={DivCalendar} />
      <Stack.Screen name="DRIP" component={DRIP} />

    </Drawer.Navigator>
  );
}

function StackNav() {
  return (
    <>
      <Stack.Navigator initialRouteName="ViewPortfolio" headerMode="none">
        <Stack.Screen name="ViewNotes" component={ViewNotes} />
        <Stack.Screen name="AddNotes" component={AddNotes} />
        <Stack.Screen name="EditNotes" component={EditNotes} />
        <Stack.Screen name="TestAPI" component={TestAPI} />
        <Stack.Screen name="ViewPortfolio" component={DrawerControl} />
        <Stack.Screen name="AddPortfolio" component={AddPortfolio} />
        <Stack.Screen name="Summary" component={Summary} />
        <Stack.Screen name="portfolioSummary" component={portfolioSummary} />
        <Stack.Screen name="DivCalendar" component={DivCalendar} />
        <Stack.Screen name="DRIP" component={DRIP} />

      </Stack.Navigator>
    </>
  );
}

export default StackNav;
