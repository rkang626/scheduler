import React from "react";
import DayListItem from '../components/DayListItem';

// import "components/DayListItem.scss";

// const classNames = require('classnames');

function CreateDayList(props) {
  const days = props.days.map(day => {
    return (
      <DayListItem 
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  />
    );
  });

  return days;
}

export default function DayList(props) {
  return (
    <ul>
      {CreateDayList(props)};
    </ul>
  );
}