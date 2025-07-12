const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 3002;

const app= express();

app.use(express.json());
app.use(cors());

app.use('/api/orders', );

app.listen(PORT, ()=>{
    console.log(`Order service is running on port ${PORT}`);
})