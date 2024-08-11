import React from "react";
import TextInput from "../../TextInput";
import styles from "../PrincipalHome.module.css";
import DropdownInput from "../../DropdownInput";
import $ from "jquery";
import axios from "axios";

export default function CreateAcc() {
  async function postForm(event) {
    event.preventDefault();

    $(".createAcc form > button").attr("disabled", "true");

    const name = $("input[name='name']").val();
    const email = $("input[name='email']").val();
    const password = $("input[name='password']").val();
    const role = $("select#role option:selected").text();

    if (role === "Role") {
      alert("Role Not Selected");
      return;
    }

    const result = await axios.post(
      "http://localhost:3000/Principal/createAcc",
      {
        email: email,
        password: password,
        role: role,
        name: name,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (result.data.message === "Account Exists") {
      alert("Accout Exists");
    } else {
      $(".createAcc form > button").attr("disabled", "false");
      alert("Accout Created");
    }
  }

  const selectOpt = ["Teacher", "Student"];

  return (
    <div className={styles.createAcc}>
      <form onSubmit={postForm}>
        <h3>Create An Account</h3>
        <TextInput name="Name" id="name" />
        <TextInput name="Email" id="email" />
        <TextInput name="Password" id="password" type="password" />
        <DropdownInput name="Role" arr={selectOpt} id="role" />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
