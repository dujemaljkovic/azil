import express from 'express';
import cors from 'cors';
import animalsRouter from './routes/animals.js'; 
import donationsRouter from './routes/donations.js';
import announcementsRouter from './routes/announcements.js';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import loggerMiddleware from './middleware/loggerMiddleware';
import dotenv from 'dotenv';
dotenv.config();



const app = express();

app.use(express.json());
app.use(cors());
app.use(loggerMiddleware);
app.use('/users', usersRouter)
app.use('/animals', animalsRouter);
app.use('/donations', donationsRouter)
app.use('/announcements', announcementsRouter )


mongoose.connect(process.env.DB_URL, {
});

const db = mongoose.connection


db.on('error', (error) => {
  console.error('Greška pri spajanju:', error);
});
db.once('open', function() {
console.log('Spojeni smo na MongoDB bazu');
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server sluša zahtjeve na portu ${PORT}`);
});
