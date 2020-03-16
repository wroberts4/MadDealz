import * as Deal from '../models/deal';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());

router.post('/create', async (req, res) => {
    console.log("/bar/create POST request received");
    console.log(req.body);
    
    let rc = await Bar.create_bar({
        name: req.body.name,
        info: req.body.info ? req.body.info : [],
        address: req.body.address,
        location: req.body.location ? req.body.location : {},
        contact: req.body.contact ? req.body.contact : [],
        hours: req.body.hours ? req.body.hours : [],
        deals: req.body.deals ? req.body.deals : [],
        favorites: 0,
        rating: null,
        comments: []
    });

    return res.status(rc.status).json({ message: rc.message, bar: rc.bar });
});