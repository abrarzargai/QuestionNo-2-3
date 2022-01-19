const mongoose = require("mongoose");
const argon2 = require('argon2');
const userSchema = new mongoose.Schema({

  Email: {
    type: String,
    lowercase: true,
  },
  Password: {
    type: String,
  },
  Location: {
    Lat: { type: Number},
    Long: { type: Number}
  }
 
},
  {
    timestamps: true,
  });

userSchema.pre('save', async function(next) {
  this.Password = await argon2.hash(this.Password);
  next();
})
userSchema.pre('updateOne', async function (next) {
  this.getUpdate().Password = await argon2.hash(this.getUpdate().Password); 
  next();
})


const User = mongoose.model("User", userSchema);
module.exports = User;
