import React, { useEffect, useState } from "react";
import styles from "./PrincipalHome.module.css";
import CreateAcc from "./components/CreateAcc";
import CreateClass from "./components/CreateClass";
import List from "./components/List";
import $ from "jquery";
import TextInput from "../TextInput";
import DropdownInput from "../DropdownInput";
import axios from "axios";
import AssignClass from "./components/AssignClass";
import { redirect, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrincipalHome() {
  const [arrCont, setArrCont] = useState({
    userArr: [],
    classroomArr: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("role") !== "Teacher") {
      navigate(`/${Cookies.get("role")}`);
    }
    const getData = async () => {
      const userResult = await axios.get(
        "https://classroom-server-iw5w.onrender.com/get/users"
      );
      setArrCont({
        ...arrCont,
        userArr: userResult.data,
      });
    };
    getData();
  });

  function closeEdit() {
    $(`.${styles.editContainer}`).hide();
  }

  async function editSubmit(event) {
    event.preventDefault();
    const email = $("select[name='editEmail'] option:selected").text();
    const Name = $("input[name='editName']").val();
    if (email === "Email") {
      alert("Please Select an Email");
      return;
    }

    await axios.post(
      "https://classroom-server-iw5w.onrender.com/changeName",
      {
        name: Name,
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    closeEdit();
  }

  async function deleteEdit() {
    const email = $("select[name='editEmail'] option:selected").text();
    if (email === "Email") {
      alert("Please Select an Email");
      return;
    }

    axios.post(
      "https://classroom-server-iw5w.onrender.com/delete/byEmail",
      { email: email },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    $(`.${styles.editContainer}`).hide();
  }

  return (
    <div className={styles.container}>
      <List />
      <CreateClass />
      <AssignClass />
      <CreateAcc />
      <div className={styles.editContainer} style={{ display: "none" }}>
        <div className={styles.formContainer} id="toBeOp">
          <form onSubmit={editSubmit}>
            <h3 style={{ textAlign: "center" }}>Edit Entry</h3>
            <TextInput name="Name" id="editName" />
            <select
              className="form-select"
              aria-label="Default select example"
              id="editEmail"
              name="editEmail"
            >
              <option defaultValue="None">Email</option>
              {arrCont.userArr.map((obj) => {
                return (
                  <option
                    key={arrCont.userArr.indexOf(obj)}
                    value={arrCont.userArr.indexOf(obj) + 1}
                  >
                    {obj.email}
                  </option>
                );
              })}
            </select>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={editSubmit}
            >
              Submit
            </button>
          </form>
          <hr />
          <br />
          <div className={styles.buttons}>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={closeEdit}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={deleteEdit}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
