import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  function updateSpots(appointmentID, increment) {
    let newSpots;
    let dayObject;
    let daysArray = [...state.days];
    for (const [index, day] of state.days.entries()) {
      if (day.appointments.includes(appointmentID)) {
        newSpots = day.spots + increment;
        dayObject = { ...day, spots: newSpots };
        daysArray[index] = dayObject;
        day.spots = newSpots;
      }
    }
    // axios
    //   .put(`/api/days/${dayObject.id}`, {
    //     dayObject
    //   })

    return daysArray;
  }

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`/api/appointments/${id}`, {
        id,
        time: appointment.time,
        interview
      })
      .then(() => updateSpots(id, -1))
      .then(() => {
        setState({ ...state, appointments });
      });

  };

  function deleteInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .delete(`/api/appointments/${id}`, {
        interview: null
      })
      .then(() => updateSpots(id, 1))
      .then(() => {
        setState({ ...state, appointments });
      });

  };

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  };

}