import React, { useEffect } from "react";
import styles from "./TeacherHome.module.css";
import TimeTable from "./components/TimeTable";
import ListStud from "./components/ListStud";
import Cookies from "js-cookie";
import { redirect, useNavigate } from "react-router-dom";

export default function TeacherHome() {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("role") !== "Teacher") {
      navigate(`/${Cookies.get("role")}`);
    }
  });
  return (
    <div className={styles.container}>
      <ListStud />
      <TimeTable />
    </div>
  );
}
