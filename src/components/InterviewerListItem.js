import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require('classnames');

// React component for InterviewerListItem.

export default function InterviewerListItem(props) {
  const interviewerClass =  classNames("interviewers__item", { 
    "interviewers__item--selected": props.selected
  });
  const interviewerImageClass =  classNames("interviewers__item-image", { 
    "interviewers__item-image--selected": props.selected
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className={interviewerImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};