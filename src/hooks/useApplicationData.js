import { useReducer, useEffect } from "react";
import axios from "axios";

// Handles everything related to updating the state and server data.

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";

  // Set up the reducer.
  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };
      case SET_APPLICATION_DATA:
        return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers };
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[action.id],
          interview: { ...action.interview }
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
        return { ...state, appointments };
      }
      case SET_SPOTS: {
        return { ...state, days: action.days };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    };

  };

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    })
  }, []);

  // useEffect(() => {
  //   let ws = new WebSocket("ws://localhost:8001");
  //   ws.onopen = function () {
  //     ws.send("ping");
  //   };
  //   ws.onmessage = function (event) {
  //     console.log(`Message Received: ${event.data}`);
  //     const type = JSON.parse(event.data).type;
  //     const id = JSON.parse(event.data).id;
  //     const interview = JSON.parse(event.data).interview;
  //     dispatch({ type, id, interview });
  //   };
  //   return ws.close();
  // }, []);

  const setDay = day => dispatch({ type: SET_DAY, day });

  // Update data when a new interview is booked.
  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, {
        id,
        time: state.appointments[id].time,
        interview
      })
      .then(() => setSpots(id, -1))
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
  };

  // Update data when an existing interview is edited.
  function editInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, {
        id,
        time: state.appointments[id].time,
        interview
      })
      .then(() => setSpots(id, 0))
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
  };

  // Update data when an existing interview is deleted.
  function deleteInterview(id) {
    return axios
      .delete(`/api/appointments/${id}`, {
        interview: null
      })
      .then(() => setSpots(id, 1))
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      });
  };

  // Update the number of spots available for a day.
  function setSpots(appointmentID, increment) {
    let newSpots;
    let dayObject;
    let daysArray = [...state.days];
    for (const [index, day] of state.days.entries()) {
      if (day.appointments.includes(appointmentID)) {
        newSpots = day.spots + increment;
        dayObject = { ...day, spots: newSpots };
        daysArray[index] = dayObject;
        dispatch({ type: SET_SPOTS, days: daysArray });
      }
    }

    return daysArray;
  };

  return {
    state,
    setDay,
    bookInterview,
    editInterview,
    deleteInterview
  };

};