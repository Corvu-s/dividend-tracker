import React from "react";
import AddNotes from "../screens/AddNotes";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNav from "../navigation/StackNav";
const Drawer = createDrawerNavigator();

function DrawerControl() {
  return (
    <Drawer.Navigator initialRouteName="AddNotes">
      <Drawer.Screen name="AddNotes" component={StackNav} />
    </Drawer.Navigator>
  );
}
export default DrawerControl;
