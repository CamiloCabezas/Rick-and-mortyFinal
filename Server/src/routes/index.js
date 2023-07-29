const express = require('express');
const login  = require('../controllers/login');
const { getCharById } = require('../controllers/getCharById');
const postFav = require('../controllers/postFav');
const postUser = require('../controllers/postUsers');
const deleteFav = require('../controllers/deleteFav');
const router = express.Router();

router.get('/character/:id', (req, res) => {//Si algo aca va un ascyn
    getCharById(req, res)
})

router.get('/login',(req, res)=>{
    login(req, res);
})

router.post('/login',(req, res) => {
    postUser(req,res)
})

router.post('/fav',(req, res) =>{
    postFav(req, res)
})

router.delete('/fav/:id', (req, res) => {
    deleteFav(req, res)
})


module.exports = router; 
