import { Router } from "express";
import Donation from '../models/donations.js';
const donationsRouter = Router();

donationsRouter.get('/', async (req, res) => {
  try {
      const donations = await Donation.find();
      res.json(donations);
  } catch (error) {
      console.error("Error fetching donations:", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH/update donation by ID
donationsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  try {
      const updatedDonation = await Donation.findByIdAndUpdate(id, { category }, { new: true });
      if (!updatedDonation) {
          return res.status(404).json({ message: "Donation not found" });
      }
      res.json(updatedDonation);
  } catch (error) {
      console.error("Error updating donation:", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
});

// POST/create new donation
donationsRouter.post("/", async (req, res) => {
  const { category, type, amount, description } = req.body;

  if (!category || !type || !amount || !description) {
      return res.status(400).json({ message: "Missing required fields" });
  }

  try {
      const newDonation = new Donation({ category, type, amount, description });
      await newDonation.save();
      res.status(201).json(newDonation);
  } catch (error) {
      console.error("Error creating donation:", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE donation by ID
donationsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
      await Donation.findByIdAndDelete(id);
      res.sendStatus(204); // No content, successful deletion
  } catch (error) {
      console.error("Error deleting donation:", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
});


export default donationsRouter