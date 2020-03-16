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
    const id = req.query.id;
    const username = req.query.username;
    let rc;

    if (id)
        rc = await User.get_user_by_id(id);
    else
        rc = await User.get_user(username);
    
    return res.status(rc.status).json({ message: rc.message, user: rc.user });
});

router.post('/create', async (req, res) => {
    console.log("/user/create POST request received");
    console.log(req.body);
    
    let rc = await User.create_user({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        favorites: {
            bars: [],
            deals: []
        },
        friends: [],
        comments: [],
        bars_owned: []
    });

    return res.status(rc.status).json({ message: rc.message, user: rc.user });
});

router.post('/login', async (req, res) => {
    console.log("/user/login POST request received");
    console.log(req.body);

    let rc = await User.user_login({
        email: req.body.email,
        password: req.body.password
    });

    return res.status(rc.status).json({ message: rc.message, user: rc.user });
});

router.put('/update', async (req, res) => {
    console.log("/user/update PUT request receieved");
    console.log(req.body);

    let rc = await User.update_user(req.body);
    return res.status(rc.status).json({ message: rc.message });
});

router.delete('/delete', async (req, res) => {
    console.log('/user/delete DELETE request received');
    console.log(req.body);

    let rc = await User.delete_user(req.query.id);
    return res.status(rc.status).json({ message: rc.message });
});

module.exports = router;