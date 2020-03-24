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

router.get('/', async (req, res) => {
    console.log("/deal GET request received");
    const id = req.query.id;
    console.log(id);

    let rc = await Deal.get_deal(id);
    
    return res.status(rc.status).json({ message: rc.message, deal: rc.deal });
});

router.delete('/delete', async (req, res) => {
    console.log('/deal/delete DELETE request received');

    let rc = await Deal.delete_deal(req.query.id);
    return res.status(rc.status).json({ message: rc.message });
});

router.put('/update', async (req, res) => {
    console.log('/deal/update PUT request received');

    let rc = await Deal.update_deal({
        id: req.body.id,
        info: req.body.info,
        times: req.body.times
    });
    return res.status(rc.status).json({ message: rc.message });
});

module.exports = router;