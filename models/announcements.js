import mongoose from "mongoose";

// Define the schema for the announcement
const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  important: {
    type: Boolean,
    default: false
  },
  addedAt: {
    type: Date,
    required: true
  }
});

// Define the model for the announcement
const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;
