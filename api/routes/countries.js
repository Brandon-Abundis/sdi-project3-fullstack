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

router.get('/id/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const result = await db('countries').select('*').where({id});
    return res.status(200).json(result);
  }catch(err) {
    res.status(500).send({message: err.message})
  }
});

router.get('/cca2/:cca2', async (req,res) => {
  try{
    const {cca2} = req.params;

    const cca2Capalized = cca2.toUpperCase();

    const result = await db('countries').select('*').where('cca2', cca2Capalized).first();
    return res.status(200).json(result);
  } catch(err) {
    res.status(500).send({message: err.message});
  }
});

router.get('/name/:name', async (req,res) => {
  try{
    const {name} = req.params;
    const result = await db('countries').select('*').whereILike('name', name).first();

    return res.status(200).json(result);
  } catch(err) {
    res.status(500).send({message: err.message});
  }
});

router.get('/region/:region', async (req,res) => {
  try{
    const {region} = req.params;
    const result = await db('countries').select('*').whereILike('region', region);

    return res.status(200).json(result);
  } catch(err) {
    res.status(500).send({message: err.message});
  }
});

module.exports = router;