const db = require('../db/db')
const express = require('express');

const router = express();

router.get('/all', async (req,res) => {
  try{
    const result = await db('countries').select('*');
    return res.status(200).json(result);
  }catch(err){
    res.status(500).send({message: err})
  }
});

module.exports = router;