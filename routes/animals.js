import { Router } from "express";
import Animal from '../models/animals.js'; 
import checkRole from "../middleware/checkRole.js";
import checkToken from "../middleware/checkToken.js";
const animalsRouter = Router();

// Route to fetch all animals
animalsRouter.get('/', async (req, res) => { // Removed '/animals' from the route path
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (error) {
    console.error('Error fetching animals:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

animalsRouter.post('/', checkToken, checkRole("admin"), async (req, res) => {
  try {
    // Extract data from the request body
    
    const { name, species, age, adopted, description, image, chip, lastViewed } = req.body;
  
    // Create a new Animal document
    const newAnimal = new Animal({
      name,
      species,
      age,
      adopted,
      description,
      image,
      chip,
      lastViewed,
    });

    // Save the new Animal document to the database
    await newAnimal.save();

    // Send a success response
    res.status(201).json({ message: "Animal created successfully", animal: newAnimal });
  } catch (error) {
    // Handle errors
    console.error('Error creating animal:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

animalsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, species, age, adopted, description, image, chip, lastViewed } =
    req.body;

  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(
      id,
      {
        name,
        species,
        age,
        adopted,
        description,
        image,
        chip,
        lastViewed,
      },
      { new: true }
    );

    if (!updatedAnimal) {
      return res.status(404).json({ error: "Animal not found" });
    }

    res.json(updatedAnimal);
  } catch (error) {
    console.error("Error updating animal:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


animalsRouter.delete('/:id', async (req, res) => {
  try {
  const animal = await Animal.findByIdAndDelete(req.params.id);
  if (!animal) {
  return res.status(404).send(`Animal doesn't exist`);
  }
  res.send('Animal deleted');
  } catch (error) {
  res.status(500).send(error.message);
  }
 });
 



export default animalsRouter;
