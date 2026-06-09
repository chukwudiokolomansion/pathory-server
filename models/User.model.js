const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    username: String,
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "What are you 'user' or 'admin'",
      },
      default: "user",
    }
  },
  {
      
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
