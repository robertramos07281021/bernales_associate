import asyncHandler from "../../middleware/asyncHandler.js";
import Announcement from "../../model/announcement.js";

export const createAnnouncement = asyncHandler(async (req, res) => {
  if (!req.body.announcement)
    return res.status(400).json({ message: "Please add new announcement." });

  try {
    const announcement = await Announcement.create({
      announcement: req.body.announcement,
    });
    return res.status(200).json(announcement);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export const updateAnnouncement = asyncHandler(async (req, res) => {
  if (!req.body.announcement)
    return res.status(400).json({ message: "Announcement is required!" });

  const findAnnoucement = await Announcement.findById(req.params.id);
  if (!findAnnoucement)
    return res.status(404).json({ message: "Announcement not found!" });
  try {
    await findAnnoucement.updateOne({
      announcement: req.body.announcement,
    });
    return res
      .status(200)
      .json({ message: "Annoucement Update", findAnnoucement });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export const deleteAnnouncement = asyncHandler(async (req, res) => {
  const findAnnoucement = await Announcement.findById(req.params.id);
  if (!findAnnoucement)
    return res.status(404).json({ message: "Announcement not found" });

  try {
    await findAnnoucement.deleteOne();
    return res.status(200).json({ message: "Announcement deleted!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export const getAllAnnouncement = asyncHandler(async (req, res) => {
  const announcements = await Announcement.find();
  return res.status(200).json(announcements);
});

export const getAnnouncement = asyncHandler(async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement)
      return res.status(404).json({ message: "Announcement not found!" });
    return res.status(200).json(announcement);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export const lastAnnouncement = asyncHandler(async (req, res) => {
  try {
    const announcement = await Announcement.find();
    return res.status(200).json(announcement[announcement.length - 1]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});
