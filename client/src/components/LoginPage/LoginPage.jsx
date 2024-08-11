import React, { useEffect } from "react";
import styles from "./LoginPage.module.css";
import TextInput from "../TextInput";
import $ from "jquery";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("id")) {
      navigate(`/${Cookies.get("role")}`);
    }
  });

  async function postForm(event) {
    event.preventDefault();
    const email = $("input[name='email']").val();
    const password = $("input[name='password']").val();

    const result = await axios.post(
      "http://localhost:3000/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (result.data.message === "Authentication Success") {
      console.log(result.data);
      Cookies.set("id", result.data._id);
      Cookies.set("role", result.data.role);
      navigate(`/${Cookies.get("role")}`);
    } else if (result.data.message === "Failure") {
      alert("An Error Occured, Retry!");
      navigate("/");
    } else if (result.data.message === "Incorrect Password") {
      alert("Incorrect Password");
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={postForm}>
        <h1>Login</h1>
        <TextInput name="Email" id="email" type="email" />
        <TextInput name="Password" id="password" type="password" />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
