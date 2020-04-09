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
        bar_id: req.body.bar_id,
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

router.delete('/delete', async (req, res) => {
    console.log('/review/delete DELETE request received');

    let rc = await Review.delete_review(req.query.id);
    return res.status(rc.status).json({ message: rc.message });
});

router.put('/update', async (req, res) => {
    console.log('/review/update PUT request received');

    let rc = await Review.update_review({
        id: req.body.id,
        content: req.body.content,
        score: req.body.score
    });
    return res.status(rc.status).json({ message: rc.message });
});

module.exports = router;