import React, { useEffect, useState } from "react";
import styles from "../PrincipalHome.module.css";
import axios from "axios";
import $, { event } from "jquery";

export default function AssignClass() {
  const [userArr, setUserArr] = useState([]);
  const [classArr, setClassArr] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const userResult = await axios.get("http://localhost:3000/get/students");
      setUserArr(userResult.data);
      const classResult = await axios.get("http://localhost:3000/get/class");
      setClassArr(classResult.data);
    };
    getData();
  }, []);

  async function postForm(event) {
    event.preventDefault();
    const student = $("select[name='students'] option:selected").val();
    const classroom = $("select[name='class'] option:selected").text();

    axios.post(
      "http://localhost:3000/assignClass",
      {
        student: student,
        classroom: classroom,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }

  return (
    <div className={styles.assignClass}>
      <form onSubmit={postForm}>
        <h4>Assign Classroom</h4>

        <select
          className="form-select"
          aria-label="Default select example"
          id="students"
          name="students"
        >
          <option defaultValue="Students">Students</option>
          {userArr.map((obj) => {
            return (
              <option key={userArr.indexOf(obj)} value={obj.id}>
                {obj.name}
              </option>
            );
          })}
        </select>

        <select
          className="form-select"
          aria-label="Default select example"
          id="class"
          name="class"
        >
          <option defaultValue="Classroom">Classroom</option>
          {classArr.map((obj) => {
            return (
              <option
                key={classArr.indexOf(obj)}
                value={classArr.indexOf(obj) + 1}
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
