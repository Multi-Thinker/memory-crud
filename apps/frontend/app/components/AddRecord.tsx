"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import { addUser } from "../../redux/actions/actions";
import "react-toastify/dist/ReactToastify.css";
import style from "../page.module.css";
import { useTableRecords } from "../../hooks/use-table-record";

function AddRecord(): JSX.Element {
  const { insertRecord }: any = useTableRecords();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

  const saveRecord = (): void => {
    insertRecord({
      username,
      firstName,
      lastName,
    })
      .then(({ status }) => {
        if (status === 200 || status === 201) {
          addUser({
            username,
            firstName,
            lastName,
          });
          location.replace("/");
        }
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };

  return (
    <>
      <ToastContainer />
      <table className={style["rwd-table"]}>
        <tbody>
          <tr>
            <td>username: </td>
            <td>
              <input
                aria-label="username"
                name="username"
                onChange={({ target: { value } }) => {
                  setUsername(value);
                }}
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
                <tr id={`${k + 1}errors`} key={`${k}errors`}>
                  <td colSpan={2} style={{ color: "Red" }}>
                    <p>{err}</p>
                  </td>
                </tr>
              ))
            : null}
          <tr>
            <td colSpan={3}>
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
                value="ADD"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default connect(null, { addUser })(AddRecord);
