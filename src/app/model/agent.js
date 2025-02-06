const { Schema, mongoose } = require("mongoose");

 const AgentSchema = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    businessName: { type: String },
    officeAddress: { type: String, required: true, unique: true },
    status:{
      type:String,
      enum:['Approved', 'Declined'],
      default: 'Pending'
    }
 })
  const Agent = mongoose.models?.Agent || mongoose.model("Agent", AgentSchema);
  module.exports = Agent;

// Use this in your routes or controllers to create a new agent