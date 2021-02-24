import React from "react";
import "components/Application.scss";
import Appointment from "../components/Appointment";
import DayList from "../components/DayList";
import { getAppointmentsForDay } from "../helpers/selectors";
import { getInterviewersForDay } from "../helpers/selectors";
import { getInterview } from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

// React component for the main application.

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    editInterview,
    deleteInterview
  } = useApplicationData();
  
  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          editInterview={editInterview}
          deleteInterview={deleteInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
  
};
