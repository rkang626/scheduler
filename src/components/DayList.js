import React from "react";
import DayListItem from '../components/DayListItem';

// Function that generates the DayList JSX from DayListItem components.

function CreateDayList(props) {
  const days = props.days.map(day => {
    return (
      <DayListItem
        key={day.id} 
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
      />
    );
  });

  return days;
};

// React component that contains DayListItems.

export default function DayList(props) {
  return (
    <ul>
      {CreateDayList(props)}
    </ul>
  );
};