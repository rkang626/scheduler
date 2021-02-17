import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

const reset = (setName, setInterviewer) => {
  setName(() => "");
  setInterviewer(() => null);
};

const cancel = (setName, setInterviewer, props) => {
  reset(setName, setInterviewer);
  return props.onCancel();
}

const Form = (props) => {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel(setName, setInterviewer, props)}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )

}

export default Form;