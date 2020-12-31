import {firebase} from '../database/config'

//  function getID(){
//   const ReducerUserID=firebase.auth().onAuthStateChanged(async function(user) {
//     if (user) {
//       // User is signed in.
//       console.log(user.uid)
//       return await user.uid

//     } else {
//       // No user is signed in.
//     }
//   });
//   return ReducerUserID 
// }

const Reducer = (state, action) => {

  switch (action.type) { 
    ///////////////////login and register
    case "SET_USER_ID":
      return{
        ...state,
        userID:action.data
      }
    case "SET_LOGGED_IN":
      return{
        ...state,
        isLoggedIn:true
      } 
      case "SET_SIGNED_OUT":
        return{
          ...state,
          isLoggedIn:false
        }
    case "LOGIN"://use this to update the state once logged in. Update the nessesary fields in internal state with the data from the cloud
     return{
       ...state,
      email:action.data.email,
      fullName:action.data.fullName,
      userID:action.data.userID,
      portColour:action.data.portColour,
      portfolios:action.data.portfolios
     }
    case "REGISTER":
      return{

      }
    /////////////////////
    case "SET_ACTIVE_PORT":
      return {
        ...state,
        activePort: action.index,
      };
    case "SET_ACTIVE_SUMMARY":
      return {
        ...state,
        activeSummary: action.data,
      };
    case "ADD_PORT": //add an post to the main array
    //add code to update the cloud here
   
      return {
        ...state,
        portfolios: state.portfolios.concat(action.payload),
      };
    case "REMOVE_PORT":
      return {
        ...state,
        portfolios: state.portfolios.filter(
          (item) => item.portfolioID !== action.index
        ),
      };
    case "UPDATE_PORT":
      return {
        ...state,
      };
    case "ADD_STOCK": //add a entry to an array inside an array
      state.portfolios[action.number - 1].stocks = state.portfolios[
        action.number - 1
      ].stocks //get the post you want to edit
        .concat(action.payload); //edit the field in the post with the desired info
      state.latestStock = action.tick;
      return {
        ...state, //dont return anything else cuz its not changing much
      };
    case "PORT_COLOUR": //set the colour of the stock
      state.portfolios[state.activePort - 1].portColour = action.data; //colour is in the form of a object
      return {
        ...state,
      };
    case "GLOBAL_COLOUR": //set the colour of the stock
      state.portColour = action.data;
      return {
        ...state,
      };
    ///////////////////////////////////////
    case "ADD_PRICE":
      state.portfolios[state.activePort - 1].stocks[action.i].price =
        action.data;
      return {
        ...state,
      };
    case "ADD_LOGO":
      state.portfolios[state.activePort - 1].stocks[action.i].logo =
        action.data;
      return {
        ...state,
      };

    case "ADD_DIV_AMOUNT":
      state.portfolios[state.activePort - 1].stocks[action.i].divAmount =
        action.data;
      return {
        ...state,
      };
    case "ADD_DIV_FREQ":
      state.portfolios[state.activePort - 1].stocks[action.i].divFrequency =
        action.data;
      return {
        ...state,
      };
    case "ADD_DIV_DATE":
      state.portfolios[state.activePort - 1].stocks[action.i].paymentDate =
        action.data;
      return {
        ...state,
      };
    case "ADD_DIV_HIST":
      state.portfolios[state.activePort - 1].stocks[action.i].yearToDateDivs =
        action.data;
      return {
        ...state,
      };
    case "ADD_SHARE":
      state.portfolios[state.activePort - 1].stocks[action.i].shares++;
      state.portfolios[state.activePort - 1].stocks[action.i].cost = (
        state.portfolios[state.activePort - 1].stocks[action.i].shares *
        state.portfolios[state.activePort - 1].stocks[action.i].price
      ).toFixed(2);
      state.portfolios[state.activePort - 1].portValue =
        state.portfolios[state.activePort - 1].portValue + action.val;
      return {
        ...state,
      };
    case "REMOVE_SHARE": //can be made shorter but is the correct path
      state.portfolios[state.activePort - 1].stocks[action.i].shares--;
      state.portfolios[state.activePort - 1].stocks[action.i].cost = (
        state.portfolios[state.activePort - 1].stocks[action.i].shares *
        state.portfolios[state.activePort - 1].stocks[action.i].price
      ).toFixed(2);
      state.portfolios[state.activePort - 1].portValue =
        state.portfolios[state.activePort - 1].portValue - action.val;
      return {
        ...state,
      };
    case "REMOVE_STOCK":
      state.portfolios[state.activePort - 1].portValue = //updates the cost of the portfolio bc a stock was removed
        state.portfolios[state.activePort - 1].portValue -
        state.portfolios[state.activePort - 1].stocks[action.i].cost;
      //filters out the stock selected
      state.portfolios[state.activePort - 1].stocks = state.portfolios[
        state.activePort - 1
      ].stocks.filter((item) => item.stockID - 1 !== action.i);

      return {
        ...state,
      };

    case "UPDATE_SHARES": //remove the total shares frpm port value then update
      const old =
        state.portfolios[state.activePort - 1].stocks[action.i].shares;
      if (old == 0) {
        //no initial shares so just do the regular addition to shares and port value
        state.portfolios[state.activePort - 1].stocks[action.i].shares =
          action.data;
        state.portfolios[state.activePort - 1].stocks[action.i].cost = (
          state.portfolios[state.activePort - 1].stocks[action.i].shares *
          state.portfolios[state.activePort - 1].stocks[action.i].price
        ).toFixed(2);

        ///update the port value
        state.portfolios[state.activePort - 1].portValue =
          state.portfolios[state.activePort - 1].portValue +
          state.portfolios[state.activePort - 1].stocks[action.i].shares *
            state.portfolios[state.activePort - 1].stocks[action.i].price;
      } else {
        //if more than 0 shares then we need to deduct
        const oldNum =
          state.portfolios[state.activePort - 1].stocks[action.i].shares *
          state.portfolios[state.activePort - 1].stocks[action.i].price;
        state.portfolios[state.activePort - 1].portValue =
          state.portfolios[state.activePort - 1].portValue - oldNum; //remove the old value of shares from the total

        //update shares with new number
        state.portfolios[state.activePort - 1].stocks[action.i].shares =
          action.data;
        state.portfolios[state.activePort - 1].stocks[action.i].cost = (
          state.portfolios[state.activePort - 1].stocks[action.i].shares *
          state.portfolios[state.activePort - 1].stocks[action.i].price
        ).toFixed(2);
        //update the port value with the correct value of shares
        state.portfolios[state.activePort - 1].portValue =
          state.portfolios[state.activePort - 1].portValue +
          state.portfolios[state.activePort - 1].stocks[action.i].shares *
            state.portfolios[state.activePort - 1].stocks[action.i].price;
      }

      return {
        ...state,
      };
    ////////////////////////////////////
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Reducer;
