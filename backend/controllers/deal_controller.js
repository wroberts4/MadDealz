import * as Deal from '../models/deal';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());

router.post('/create', async (req, res) => {
    console.log("/deal/create POST request received");
    console.log(req.body);
    
    let rc = await Deal.create_deal({
        info: req.body.info,
        bar: req.body.bar,
        times: req.body.times,
    });

    return res.status(rc.status).json({ message: rc.message, deal: rc.deal });
});

router.get('/')