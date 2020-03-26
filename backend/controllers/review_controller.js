import * as Review from '../models/review';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());

router.post('/create', async (req, res) => {
    console.log("/review/create POST request received");
    console.log(req.body);
    
    let rc = await Review.create_review({
        content: req.body.content,
        bar: req.body.bar,
        score: req.body.score,
        user: req.body.user
    });

    return res.status(rc.status).json({ message: rc.message, review: rc.review });
});

router.get('/', async (req, res) => {
    console.log("/review GET request received");
    const id = req.query.id;
    console.log(id);

    let rc = await Review.get_review(id);
    
    return res.status(rc.status).json({ message: rc.message, review: rc.review });
});

module.exports = router;