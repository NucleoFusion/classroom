import React, { useEffect, useState } from "react";
import styles from "../TeacherHome.module.css";
import Cookies from "js-cookie";
import axios from "axios";

export default function TimeTable() {
  const [time, setTime] = useState([]);
  const subjArr = ["Math", "Science", "Sports", "Biology", "CS"];
  useEffect(() => {
    const getClass = async () => {
      const result = await axios.get(
        `http://localhost:3000/get/timetable/${Cookies.get("id")}`
      );
      if (result.data.message === "No Classroom") {
        alert("Not Part of a Classroom");
        return;
      }
      const startTime = +result.data.startTime.split(":")[0];
      const endTime = +result.data.endTime.split(":")[0];
      let arr = [];
      for (let i = startTime; i < endTime; i++) {
        arr.push(i);
      }
      setTime(arr);
    };
    getClass();
  }, []);

  return (
    <div className={styles.timetable}>
      <h1>View TimeTable</h1>
      {time.map((currTime) => {
        return (
          <div className={styles.ttRow} key={time.indexOf(currTime)}>
            <h6>
              {currTime} to {currTime + 1}
            </h6>
            <h6>{subjArr[Math.floor(Math.random() * 5)]}</h6>
          </div>
        );
      })}
    </div>
  );
}
