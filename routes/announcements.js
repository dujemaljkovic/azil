import { Router } from "express";
import Announcement from "../models/announcements.js";
const announcementsRouter = Router();

announcementsRouter.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

announcementsRouter.post("/", async (req, res) => {
  try {
    // Extract data from the request body
    const { title, text, important, addedAt } = req.body;

    // Create a new Announcement document
    const newAnnouncement = new Announcement({
      title,
      text,
      important: important || false, // Set important to false if not provided
      addedAt,
    });

    // Save the new announcement to the database
    await newAnnouncement.save();

    // Send a success response with the newly created announcement
    res.status(201).json({
      message: "Announcement created successfully",
      announcement: newAnnouncement,
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating announcement:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

announcementsRouter.delete("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).send(`Announcemnt doesn't exist`);
    }
    res.send("Announcement deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default announcementsRouter;
