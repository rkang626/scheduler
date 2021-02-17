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

}