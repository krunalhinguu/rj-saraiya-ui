import { combineReducers } from "redux";

import UserSlice from "./actions/UserSlice";
import NavigationSlice from "./actions/NavigationSlice";

const rootReducer = combineReducers({
  user: UserSlice,
  navigation: NavigationSlice,
});

export default rootReducer;
