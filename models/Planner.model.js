const { Schema, model } = require("mongoose");

const plannerSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },

    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },

    reminders: {
      type: [Date],
      default: [],
    },

    destination: {
      type: String,
      trim: true,
      maxlength: [200, "Destination is too long"],
    },

    status: {
      type: String,
      enum: {
        values: [
          "pending",
          "in-progress",
          "completed",
          "cancelled",
        ],
        message: "Invalid status value",
      },
      default: "pending",
    },
  },

  {
    timestamps: true,
  }
);

const Planner = model("Planner", plannerSchema);

module.exports = Planner;