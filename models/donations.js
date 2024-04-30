import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the schema for the donation
const donationSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// Define the model for the donation
const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
