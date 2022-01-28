import { configureStore } from "@reduxjs/toolkit";

import recruitsReducer from "./features/recruits";

export default configureStore({
  reducer: {
    recruits: recruitsReducer,
  },
});
