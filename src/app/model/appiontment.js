const { Schema, mongoose } = require("mongoose");

 const AppointmentSchema = new Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    email: { type: String, required: true, },
 })
  const Appointment = mongoose.models?.Appointment || mongoose.model("Appointment", AppointmentSchema  );
  module.exports = Appointment;

// Use this in your routes or controllers to create a new agent