/* eslint-disable @typescript-eslint/default-param-last */

import type User from "../../app/types/user-type";

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user: User) => user.id !== action.payload),
      };
    case "UPDATE_USER":
      // Implement update logic here
      return state;
    default:
      return state;
  }
};

export default userReducer;
