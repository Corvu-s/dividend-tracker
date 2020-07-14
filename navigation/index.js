import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ViewNotes from "../screens/ViewNotes";
import AddNotes from "../screens/AddNotes";
import EditNotes from "../screens/EditNotes";
import TestAPI from "../screens/TestAPI";
import ViewPortfolio from "../screens/ViewPortfolio";
import AddPortfolio from "../screens/AddPortfolio";
import Summary from "../screens/Summary";
import portfolioSummary from "../screens/portfolioSummary";
import DivCalendar from "../components/DivCalendar";
const StackNavigator = createStackNavigator(
  {
    ViewNotes: {
      screen: ViewNotes,
    },
    AddNotes: {
      screen: AddNotes,
    },
    EditNotes: {
      screen: EditNotes,
    },
    TestAPI: {
      screen: TestAPI,
    },
    ViewPortfolio: {
      screen: ViewPortfolio,
    },
    AddPortfolio: {
      screen: AddPortfolio,
    },
    Summary: {
      screen: Summary,
    },
    portfolioSummary: {
      screen: portfolioSummary,
    },
    DivCalendar: {
      screen: DivCalendar,
    },
  },
  {
    initialRouteName: "ViewPortfolio",
    headerMode: "none",
    mode: "modal",
  }
);
export default createAppContainer(StackNavigator);
