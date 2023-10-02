/* eslint-disable no-undef */
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { expect } from "@jest/globals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../redux/reducers/reducer";
import ViewRecord from "../components/ViewRecord";

const store = createStore(rootReducer);
// Mock your hook's implementation
jest.mock("../../hooks/use-table-record", () => ({
  useTableRecords: jest.fn(() => ({
    loading: false,
    status: 201,
    data: [
      {
        id: "1",
        username: "testuser",
        firstName: "John",
        lastName: "Doe",
      },
    ],
    deleteRecord: jest.fn(() => Promise.resolve({ status: 200 })),
  })),
}));

test("renders ViewRecord component", async () => {
  const { getByText } = render(
    <Provider store={store}>
      <ViewRecord />
    </Provider>
  );

  await waitFor(() => {
    expect(getByText(/Nothing Found/)).toBeTruthy();
  });
});
