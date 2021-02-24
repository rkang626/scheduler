import React from "react";
import "components/Button.scss";
const classNames = require('classnames');

// React component for the various button types used in the app.

export default function Button(props) {
   const buttonClass =  classNames("button", { 
      "button--confirm": props.confirm, 
      "button--danger": props.danger 
   });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
