const calculateTotalMinutes = (startTime, endTime) => {
  const startHours = parseInt(startTime.split(":")[0], 10);
  const startMinutes = parseInt(startTime.split(":")[1], 10);
  const startTimeInMinutes = startHours * 60 + startMinutes;

  const endHours = parseInt(endTime.split(":")[0], 10);
  const endMinutes = parseInt(endTime.split(":")[1], 10);
  const endTimeInMinutes = endHours * 60 + endMinutes;

  return endTimeInMinutes - startTimeInMinutes;
};

export { calculateTotalMinutes };
