const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {   
        
     title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    aiDescription: {
      type: String,
      trim: true,
      maxlength: [1000, "Description too long"],
    },

    activityType: {
      type: String,
      required: true,
      enum: [
        "travel",
        "food",
        "fitness",
        "study",
        "social",
        "adventure",
        "work",
        "other",
      ],
    },

    location: {
      lat: {
        type: Number,
        required: true,
        min: [-90, "Latitude cannot be below -90"],
        max: [90, "Latitude cannot exceed 90"],
      },

      lng: {
        type: Number,
        required: true,
        min: [-180, "Longitude cannot be below -180"],
        max: [180, "Longitude cannot exceed 180"],
      },

      city: {
        type: String,
        trim: true,
        maxlength: 100,
      },

      country: {
        type: String,
        trim: true,
        maxlength: 100,
      },

      address: {
        type: String,
        trim: true,
        maxlength: 300,
      },
    },

    image: {
  type: [String],
  default: [],
},

    video: {
  type: [String],
  default: [],
},
    tag: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    weather: {
      type: String,
      trim: true,
      maxlength: 100,
    },
  },

  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Activity", activitySchema);