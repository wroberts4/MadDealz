import * as User from '../models/user';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());

router.get('/', async (req, res) => {
    console.log("/user GET request received");
    const id = req.body.id;
    console.log(id);

    let rc = await User.get_user(id);
    
    return res.status(rc.status).json({ message: rc.message, user: rc.user });
});

router.post('/create', async (req, res) => {
    console.log("/user/create POST request received");
    console.log(req.body);
    
    let rc = await User.create_user({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        favorites: {
            bars: [],
            deals: []
        },
        friends: [],
        comments: [],
        bars_owned: []
    });

    return res.status(rc.status).send(rc.message);
});

router.post('/login', async (req, res) => {
    console.log("/user/login POST request received");
    console.log(req.body);

    let rc = await User.user_login({
        email: req.body.email,
        password: req.body.password
    });

    return res.status(rc.status).send(rc.message);
});

module.exports = router;