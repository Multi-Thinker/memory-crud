// src/redux/actions/userActions.js

export const addUser = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};

export const deleteUser = (userId) => {
  return {
    type: "DELETE_USER",
    payload: userId,
  };
};

export const updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    payload: user,
  };
};
