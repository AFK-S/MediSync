import DoctorSchema from "../models/DoctorSchema.js";
import HospitalSchema from "../models/HospitalSchema.js";
import AppointmentSchema from "../models/AppointmentSchema.js";

const GovernmentStats = async (req, res) => {
  try {
    const treated_appointment = await AppointmentSchema.aggregate([
      {
        $match: {
          treated: true,
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 },
        },
      },
    ]).sort({ _id: 1 });
    const treated_appointment_dates = treated_appointment.map(
      (item) => item._id
    );
    const treated_appointment_counts = treated_appointment.map(
      (item) => item.count
    );
    const non_treated_appointment = await AppointmentSchema.aggregate([
      {
        $match: {
          treated: false,
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 },
        },
      },
    ]).sort({ _id: 1 });
    const non_treated_appointment_dates = non_treated_appointment.map(
      (item) => item._id
    );
    const non_treated_appointment_counts = non_treated_appointment.map(
      (item) => item.count
    );
    const doctors = await DoctorSchema.find().count();
    const hospitals = await HospitalSchema.find().count();
    res.status(200).json({
      treated_patient: {
        dates: treated_appointment_dates,
        counts: treated_appointment_counts,
      },
      non_treated_patient: {
        dates: non_treated_appointment_dates,
        counts: non_treated_appointment_counts,
      },
      hospitals_count: hospitals,
      doctors_count: doctors,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export { GovernmentStats };
