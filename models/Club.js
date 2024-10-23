const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 charcters"],
    },
    imageURL:{
        type: String,
    },
    header:{
        type: String,
    },
    catgeory:{
        type: String,
    },
    status:{
        type: String,
    },
    type:{
        type: String,
    },
    members:{
        type: Array,
    },
    contacts:{
        type:Array,
    }

},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Club", ClubSchema);
