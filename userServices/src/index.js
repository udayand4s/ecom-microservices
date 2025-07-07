require ('dotenv').config();
const connectDB = require('./config/dbConnection');
const express = require('express');
const app=express();
const port = process.env.PORT || 3000;

app.use(express.json());
connectDB();

app.get('/', (req, res) => res.send('User Service Running'));
app.use('/private', authMiddleware, privateRoutes);

app.listen(port, () => {
  console.log(`User Services API listening at http://localhost:${port}`);
});