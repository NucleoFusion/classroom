import React, { useEffect } from "react";
import styles from "./StudentHome.module.css";
import TimeTable from "../TeacherHome/components/TimeTable";
import ClassList from "./ClassList";
import Cookies from "js-cookie";
import { redirect, useNavigate } from "react-router-dom";

export default function StudentHome() {
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("role") !== "Student") {
      navigate(`/${Cookies.get("role")}`);
    }
  });
  return (
    <div className={styles.container}>
      <ClassList />
      <TimeTable />
    </div>
  );
}
