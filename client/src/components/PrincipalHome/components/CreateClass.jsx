import React, { useEffect, useState } from "react";
import styles from "../PrincipalHome.module.css";
import TextInput from "../../TextInput";
import DropdownInput from "../../DropdownInput";
import axios from "axios";
import $ from "jquery";

export default function CreateClass() {
  const timeArr = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  const [teachArr, setTeachArr] = useState([]);

  useEffect(() => {
    const getTeachers = async () => {
      const result = await axios.get("http://localhost:3000/get/teachers");
      setTeachArr(result.data);
    };
    getTeachers();
  }, []);

  async function postForm(event) {
    event.preventDefault();

    $(`${styles.createClass} form > button`).attr("disabled", "true");

    const name = $(`input[name='className']`).val();
    const startTime = $(`select[name='startTime'] option:selected`).text();
    const endTime = $(`select[name='endTime'] option:selected`).text();
    const teacher = $(`select[name='teacher'] option:selected`).text();

    const data = {
      startTime: startTime,
      endTime: endTime,
      teacher: teacher,
      name: name,
    };
    await axios.post("http://localhost:3000/Principal/createClass", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    $(`${styles.createClass} form > button`).attr("disabled", "false");
  }

  return (
    <div className={styles.createClass}>
      <form onSubmit={postForm}>
        <h3>Create Classroom</h3>
        <TextInput name="Name" id="className" />
        <DropdownInput arr={timeArr} name="Start Time" id="startTime" />
        <DropdownInput arr={timeArr} name="Start Time" id="endTime" />
        <select
          className="form-select"
          aria-label="Default select example"
          id="teacher"
          name="teacher"
        >
          <option defaultValue="Teacher">Teacher</option>
          {teachArr.map((obj) => {
            return (
              <option
                key={teachArr.indexOf(obj)}
                value={teachArr.indexOf(obj) + 1}
              >
                {obj.name}
              </option>
            );
          })}
        </select>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
