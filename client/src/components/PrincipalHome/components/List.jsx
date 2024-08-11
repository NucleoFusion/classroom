import React, { useEffect, useState } from "react";
import styles from "../PrincipalHome.module.css";
import axios from "axios";
import $ from "jquery";

export default function List() {
  const [userArr, setUserArr] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const result = await axios.get("http://localhost:3000/get/users");
      setUserArr(result.data);
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
        <h5>Edit</h5>
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
              <h5 key={obj.id} style={{ fontSize: "1.5vh" }}>
                <button
                  key={obj.id}
                  data-id={obj.id}
                  onClick={editEntry}
                  id={obj.id}
                >
                  Edit
                </button>
              </h5>
            </div>
            <br key={obj.id} />
          </>
        );
      })}
    </div>
  );
}
