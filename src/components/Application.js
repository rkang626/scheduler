import React, { useState } from "react";
import axios from "axios";
import "components/Application.scss";
import Appointment from "../components/Appointment"
import DayList from "../components/DayList"
import { getAppointmentsForDay } from "../helpers/selectors"

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers")
  ]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data }));
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);

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
        {dailyAppointments.map((appointment) => {
          return (
            <Appointment key={appointment.id} {...appointment} />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
  
}
