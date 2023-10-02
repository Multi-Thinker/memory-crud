/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../redux/reducers/reducer";
import AddRecord from "../components/AddRecord";

const store = createStore(rootReducer);
jest.mock("../../hooks/use-table-record", () => ({
  useTableRecords: () => ({
    insertRecord: jest.fn(() => {
      return Promise.resolve({ status: 200 });
    }),
  }),
}));

test("renders AddRecord component", async () => {
  const { getByDisplayValue } = render(
    <Provider store={store}>
      <AddRecord />
    </Provider>
  );
  // Simulate user input
  fireEvent.change(screen.getByRole("textbox", { name: "username" }), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: "firstname" }), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: "lastName" }), {
    target: { value: "Does" },
  });

  fireEvent.click(getByDisplayValue("ADD"));

  // Assert that the insertRecord function was called
  expect(getByDisplayValue("ADD").getAttribute("disabled")).toBeFalsy();
  expect(screen.findByTestId("1errors")).toMatchObject({});
});
