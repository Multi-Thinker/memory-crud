"use client"
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AddRecord from "../components/AddRecord";
import rootReducer from "../../redux/reducers/reducer";

const store = createStore(rootReducer);

function Page() {
  return (
    <Provider store={store}>
      <AddRecord />
    </Provider>
  );
}

export default Page;
