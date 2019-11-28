import { combineReducers } from "redux";
import templatePropData from "./templatePropData";
import componentPropData from "./componentPropData";
import activePropTab from "./activePropTab";

const rootReducer = combineReducers({
  templatePropData,
  componentPropData,
  activePropTab
});

export default rootReducer;
