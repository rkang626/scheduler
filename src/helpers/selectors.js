// Contains helper functions used by the main application.

export function getAppointmentsForDay(state, day) {

  const output = [];
  const selectedDay = state.days.filter(i => i.name === day);
  if (selectedDay.length === 0) {
    return output;
  }

  const appointmentIDs = selectedDay[0].appointments;
  const appointments = state.appointments;

  for (const appointmentID of appointmentIDs) {
    output.push(appointments[appointmentID]);
  }

  return output;

};

export function getInterviewersForDay(state, day) {

  const output = [];
  const selectedDay = state.days.filter(i => i.name === day);
  if (selectedDay.length === 0) {
    return output;
  }

  const interviewerIDs = selectedDay[0].interviewers;
  const interviewers = state.interviewers;

  for (const interviewerID of interviewerIDs) {
    output.push(interviewers[interviewerID]);
  }

  return output;

};

export function getInterview(state, interview) {

  if (interview) {
    const interviewerID = interview.interviewer;
    const interviewDetails = state.interviewers[interviewerID];
    return { ...interview, interviewer: interviewDetails };
  }
  return null;

};