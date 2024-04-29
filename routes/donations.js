import { Router } from "express";
import { v4 as uuidv4 } from 'uuid'; 
const donationsRouter = Router();

let donations = [
    {
        "category": "looking_for",
        "type": "Medicine",
        "amount": "22.50",
        "description": "Box of antibiotics for cats and dogs",
        "id": 2
      },
      {
        "category": "offers",
        "type": "Toys",
        "amount": "30",
        "description": "Assortment of plush toys for dogs and cats",
        "id": 3
      },
      {
        "category": "looking_for",
        "type": "vet. costs",
        "amount": "120",
        "description": "Routine check-up and vaccinations for two cats",
        "id": 4
      },
      {
        "id": 5,
        "category": "donated",
        "type": "grooming",
        "amount": "25",
        "description": "Bath and haircut for a medium-sized dog"
      },
      {
        "category": "offers",
        "type": "blankets",
        "amount": "15",
        "description": "Assortment of cozy blankets for cats and dogs",
        "id": 6
      },
      {
        "category": "donated",
        "type": "vet. costs",
        "amount": "350",
        "description": "Spay surgery for a female dog",
        "id": 7
      }
]

donationsRouter.get('/', (req, res) => {
    res.json(donations)
})

donationsRouter.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { category } = req.body;

    const donationIndex = donations.findIndex((donation) => donation.id === parseInt(id));
    if (donationIndex === -1) {
        return res.status(404).json({ message: "Donation not found" });
    }

    donations[donationIndex].category = category;
    res.json(donations[donationIndex]);
});

donationsRouter.post("/", (req, res) => {
    const { category, type, amount, description } = req.body;

    if (!category || !type || !amount || !description) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newDonation = {
        id: uuidv4(),
        category,
        type,
        amount,
        description
    };

    donations.push(newDonation);
    res.status(201).json(newDonation);
});


donationsRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    donations = donations.filter((donation) => donation.id !== parseInt(id));
    res.sendStatus(204); // No content, successful deletion
  });

export default donationsRouter