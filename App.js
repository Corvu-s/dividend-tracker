import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./navigation";
import Store from "./navigation/Store";

export default function App() {
  return (
    <Store>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </Store>
  );
}
