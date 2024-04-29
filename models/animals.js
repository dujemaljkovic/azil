import mongoose from "mongoose";

// Define the schema for the animal
const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  age: {
    type: String
  },
  adopted: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  chip: {
    type: String
  },
  lastViewed: {
    type: Date
  }
});

// Define the model for the animal
const Animal = mongoose.model('Animal', animalSchema);

export default Animal;
