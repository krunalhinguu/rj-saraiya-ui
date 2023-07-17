import { combineReducers } from "redux";

import UserSlice from "./actions/UserSlice";
import NavigationSlice from "./actions/NavigationSlice";
import CommonSlice from "./actions/CommonSlice";

const rootReducer = combineReducers({
  user: UserSlice,
  navigation: NavigationSlice,
  common: CommonSlice,
});

export default rootReducer;
