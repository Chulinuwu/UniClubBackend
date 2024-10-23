const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  club: {
    type: mongoose.Schema.ObjectId,
    ref: "club",
    required: true,
  },
  title:{
    type:String,
  },
  data:{
    type:Date,
  },
  detail:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Activity", ActivitySchema);