import React from "react";
import InterviwerListItem from '../components/InterviewerListItem';
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';

// Function that generates the InterviewerList JSX from InterviewerListItem components.

function CreateInterviwerList(props) {
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviwerListItem
        key={interviewer.id} 
        name={interviewer.name} 
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return interviewers;
};

// React component that contains InterviewerListItems.

function InterviewerList(props) {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {CreateInterviwerList(props)}
      </ul>
    </section>
  );
  
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;