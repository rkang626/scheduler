import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";
  
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
        return { ...state, days: action.days }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

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
  }, [])

  const setDay = day => dispatch({ type: SET_DAY, day });

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
    // axios
    //   .put(`/api/days/${dayObject.id}`, {
    //     dayObject
    //   })

    return daysArray;
  }

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  };

}