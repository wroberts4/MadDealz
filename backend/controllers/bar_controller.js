import * as Bar from '../models/bar';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());

router.get('/', async (req, res) => {
    console.log("/bar GET request received");
    const id = req.query.id;
    console.log(id);

    let rc = await Bar.get_bar(id);
    
    return res.status(rc.status).json({ message: rc.message, bar: rc.bar });
});

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
        reviews: []
    });

    return res.status(rc.status).json({ message: rc.message, bar: rc.bar });
});

router.get('/list', async (req, res) => {
    console.log("/bar/list POST request received");

    let loc;
    if (req.query.lat && req.query.lon) {
      loc = {lat: req.query.lat, lon: req.query.lon};
    }
    let rc = await Bar.get_bars(loc, req.query.limit);

    return res.status(rc.status).json({ message: rc.message, bars: rc.bars });
});

router.put('/update', async (req, res) => {
    console.log("/bar/update PUT request receieved");
    console.log(req.body);

    let rc = await Bar.update_bar(req.body);
    return res.status(rc.status).json({ message: rc.message });
});

router.delete('/delete', async (req, res) => {
    console.log('/bar/delete DELETE request received');

    let rc = await Bar.delete_bar(req.query.id);
    return res.status(rc.status).json({ message: rc.message });
});

router.get('/deals', async (req, res) => {
    console.log("/bar/deals GET request received");
    const id = req.query.id;
    console.log(id);

    let rc = await Bar.get_deals(id);
    
    return res.status(rc.status).json({ message: rc.message, deals: rc.deals });
});

module.exports = router;