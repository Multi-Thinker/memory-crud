/* eslint-disable import/order */
"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Provider } from "react-redux";
import { updateUser } from "../../redux/actions/actions";
import "react-toastify/dist/ReactToastify.css";
import style from "../page.module.css";
import { useTableRecords } from "../../hooks/use-table-record";
import type User from "../types/user-type";
import { createStore } from "redux";
import rootReducer from "../../redux/reducers/reducer";

const store = createStore(rootReducer);

function EditRecord({
  id,
  userData,
}: {
  id: string;
  userData: User;
}): JSX.Element {
  const { updateRecord }: any = useTableRecords();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [username, setUsername] = useState(userData?.username);
  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  const [error, setError] = useState<string[]>([]);
  const [validated, setValidated] = useState(false);

  const validateForm = () => {
    const errors: string[] = [];

    if (username.length < 4 || username.length > 50) {
      errors.push("username is less than 4 or more than 50 in length");
    }

    if (firstName.length < 4 || firstName.length > 50) {
      errors.push("firstName is less than 4 or more than 50 in length");
    }

    if (lastName.length < 4 || lastName.length > 55) {
      errors.push("lastName is less than 4 or more than 55 in length");
    }

    setError(errors);
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, firstName, lastName]);

  useEffect(() => {
    if (error.length === 0) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [error]);

  useEffect(() => {
    if (error.length === 0) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [error]);

  const saveRecord = (): void => {
    updateRecord({
      id,
      firstName,
      lastName,
    })
      .then(({ status }) => {
        if (status === 200) {
          updateUser({
            id,
            firstName,
            lastName,
          });
          location.replace("/");
        } else {
          toast.error("something went wrong");
        }
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };

  if (Array.isArray(userData) || typeof userData !== "object")
    return <h1>Nothing found</h1>;
  return (
    <Provider store={store}>
      <ToastContainer />
      <table className={style["rwd-table"]}>
        <tbody>
          <tr>
            <td>username: </td>
            <td>
              <input
                aria-label="username"
                disabled
                name="username"
                readOnly
                type="text"
                value={username}
              />
            </td>
          </tr>
          <tr>
            <td>first name: </td>
            <td>
              <input
                aria-label="firstname"
                name="firstname"
                onChange={({ target: { value } }) => {
                  setFirstName(value);
                }}
                type="text"
                value={firstName}
              />
            </td>
          </tr>
          <tr>
            <td>last name: </td>
            <td>
              <input
                aria-label="lastName"
                name="lastName"
                onChange={({ target: { value } }) => {
                  setLastName(value);
                }}
                type="text"
                value={lastName}
              />
            </td>
          </tr>
          {error
            ? error.map((err, k) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={`${k}errors`}>
                  <td colSpan={2} style={{ color: "Red" }}>
                    <p>{err}</p>
                  </td>
                </tr>
              ))
            : null}
          <tr>
            <td colSpan={2} style={{ width: "100%" }}>
              <input
                disabled={!validated}
                onClick={saveRecord}
                style={{
                  cursor: "pointer",
                  margin: "0px auto",
                  display: "block",
                  background: "skyblue",
                  border: "1px solid white",
                  padding: "20px",
                  width: "150px",
                  textAlign: "center",
                }}
                type="button"
                value="UPDATE"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Provider>
  );
}

export default EditRecord;
