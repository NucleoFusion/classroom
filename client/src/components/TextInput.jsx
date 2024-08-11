import React from "react";

export default function TextInput(props) {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="inputGroup-sizing-default">
        {props.name}
      </span>
      <input
        type={props.type ? props.type : "text"}
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
        id={props.id}
        name={props.id}
        required
      />
    </div>
  );
}
