import React from "react";

export default function DropdownInput(props) {
  return (
    <select
      className="form-select"
      aria-label="Default select example"
      id={props.id}
      name={props.id}
    >
      <option defaultValue={props.name}>{props.name}</option>
      {props.arr.map((obj) => {
        return (
          <option
            key={props.arr.indexOf(obj)}
            value={props.arr.indexOf(obj) + 1}
          >
            {obj}
          </option>
        );
      })}
    </select>
  );
}
