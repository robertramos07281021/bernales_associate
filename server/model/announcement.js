import mongoose from "mongoose";

const Schema = mongoose.Schema;

const announcementSchema = new Schema(
  {
    announcement: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
