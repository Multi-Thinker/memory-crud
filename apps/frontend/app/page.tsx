"use client";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../redux/reducers/reducer";
import ViewRecord from "./components/ViewRecord";

const store = createStore(rootReducer);

export default function Page(): JSX.Element {
  return (
    <Provider store={store}>
      <ViewRecord />
    </Provider>
  );
}
