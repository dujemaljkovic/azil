import { Router } from "express";
import { v4 as uuidv4 } from 'uuid'; 
const announcementsRouter = Router();

// Sample in-memory animal data for testing
let announcements = [
    {
        "title": "Volunteers needed for dog walking",
        "text": "Our shelter is in need of volunteers to help walk our dogs on a daily basis. If you love spending time with furry friends and have some spare time, please consider joining our team of volunteers!",
        "important": false,
        "addedAt": "2023-05-11",
        "id": 5
      },
      {
        "title": "Foster families needed for puppies!",
        "text": "We have a litter of adorable puppies that need temporary foster homes until they are old enough to be adopted. If you are interested in fostering one of these little cuties, please get in touch with us",
        "important": false,
        "addedAt": "2023-05-11",
        "id": 6
      },
      {
        "title": "Lost dog in the area",
        "text": "A friendly and well-behaved dog was spotted in the area. If you know anything about this dog or have seen it around, please contact us as soon as possible so we can reunite it with its owner",
        "important": true,
        "addedAt": "2023-05-11",
        "id": 7
      },
      {
        "title": "Urgent adoption needed!!!",
        "text": "We have a lovely 3-month-old kitten that urgently needs a new home. She is playful, healthy, and up-to-date on all her vaccinations. Please consider adopting her and giving her a forever home!",
        "important": true,
        "addedAt": "2023-05-11",
        "id": 8
      }
];

// Route to fetch all animals
announcementsRouter.get("/", (req, res) => {
  res.json(announcements);
});

// POST route to add a new announcement
announcementsRouter.post('/', (req, res) => {
    const { title, text, important, addedAt } = req.body;
  
    // Check if all required fields are provided
    if (!title || !text || addedAt === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    // Create a new announcement object
    const newAnnouncement = {
      id: uuidv4(), 
      title,
      text,
      important: important || false, // Set important to false if not provided
      addedAt,
    };
  
    // Add the new announcement to the announcements array
    announcements.push(newAnnouncement);
  
    // Return the newly created announcement
    res.status(201).json(newAnnouncement);
  });

// Route to delete an animal by ID
announcementsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  announcements = announcements.filter((announcement) => announcement.id !== parseInt(id));
  res.sendStatus(204); // No content, successful deletion
});

export default announcementsRouter;
