const calculateTotalMinutes = (startTime, endTime) => {
  const startHours = parseInt(startTime.split(":")[0], 10);
  const startMinutes = parseInt(startTime.split(":")[1], 10);
  const startTimeInMinutes = startHours * 60 + startMinutes;

  const endHours = parseInt(endTime.split(":")[0], 10);
  const endMinutes = parseInt(endTime.split(":")[1], 10);
  const endTimeInMinutes = endHours * 60 + endMinutes;

  return endTimeInMinutes - startTimeInMinutes;
};

const addMinutes = (time, minute) => {
  var [hours, mins] = time.split(":").map(Number);
  var totalMinutes = hours * 60 + mins + minute;
  hours = Math.floor(totalMinutes / 60) % 24;
  mins = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

const minusMinutes = (time, minute) => {
  var [hours, mins] = time.split(":").map(Number);
  var totalMinutes = hours * 60 + mins - minute;
  hours = Math.floor(totalMinutes / 60) % 24;
  mins = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

export { calculateTotalMinutes, addMinutes, minusMinutes };
