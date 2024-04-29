import express from 'express';
import cors from 'cors';
import animalsRouter from './routes/animals.js'; 
import donationsRouter from './routes/donations.js';
import announcementsRouter from './routes/announcements.js';
import mongoose from 'mongoose';


const app = express();

app.use(express.json());
app.use(cors());
app.use('/animals', animalsRouter);
app.use('/donations', donationsRouter)
app.use('/announcements', announcementsRouter )

mongoose.connect('mongodb://127.0.0.1:27017/azil', {
});

const db = mongoose.connection


db.on('error', (error) => {
  console.error('Greška pri spajanju:', error);
});
db.once('open', function() {
console.log('Spojeni smo na MongoDB bazu');
});




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server sluša zahtjeve na portu ${PORT}`);
});
