import React, { useEffect, useState } from "react";
import styles from "../PrincipalHome/PrincipalHome.module.css";
import axios from "axios";
import $ from "jquery";
import Cookies from "js-cookie";

export default function ClassList() {
  const [userArr, setUserArr] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const result = await axios.get(
        `https://classroom-server-iw5w.onrender.com/get/classStudents/${Cookies.get(
          "id"
        )}`
      );
      if (result.data.message !== "No Classroom") {
        setUserArr(result.data);
      }
    };
    getUsers();
  });

  async function editEntry(event) {
    $(`.${styles.editContainer}`).show();
    $("#tobeOp").css({ opacity: "1 !important" });
  }

  return (
    <div className={styles.list}>
      <div className={styles.listRow}>
        <h5>Name</h5>
        <h5>Email</h5>
        <h5>Classroom</h5>
      </div>
      <hr />
      {userArr.map((obj) => {
        return (
          <>
            <div className={styles.listRow} key={obj.id}>
              <h5 key={obj.id} style={{ fontSize: "1.5vh" }}>
                {obj.name}
              </h5>
              <h5 key={obj.id} style={{ fontSize: "1.5vh" }}>
                {obj.email}
              </h5>
              <h5 key={obj.id} style={{ fontSize: "1.5vh" }}>
                {obj.classroom}
              </h5>
            </div>
            <br key={obj.id} />
          </>
        );
      })}
    </div>
  );
}
