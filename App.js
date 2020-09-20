import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import StackNav from "./navigation/StackNav";
import Store from "./navigation/Store";
import { NavigationContainer } from "@react-navigation/native";
//testing new stack nav at the latest release of react navigation
export default function App() {
  return (
    <Store>
      <PaperProvider>
        <NavigationContainer>
          <StackNav />
        </NavigationContainer>
      </PaperProvider>
    </Store>
  );
}
