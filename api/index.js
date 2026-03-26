const db = require('./db/db');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

const countryRoutes = require('./routes/countries');

// const {username} = req.body;
// res.cookie('user', {id:1, username}, {httpOnly:true});
//res.clearCookie('user')

app.get('/', (req,res) => {
  return res.status(200).json({message: 'In the matrix'})
})

app.use('/countries', countryRoutes);

app.listen(port, () => console.log(`Express server listening on port ${port}`));