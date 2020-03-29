import * as User from '../models/user';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());

const Storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, './public/images/user/')
    },
    filename(req, file, callback) {
      callback(null, `${req.query.username}` + '.png')
    },
  });

const upload = multer({ 
    storage: Storage,
    fileFilter: function (req, file, callback) {
        let filetypes = /jpeg|jpg|png/;
        let mimetype = filetypes.test(file.mimetype);
    
        if (mimetype) {
          return callback(null, true);
        }
        callback("Image must be png, jpg, jpeg");
      }
});

router.get('/', async (req, res) => {
    console.log("/user GET request received");
    const username = req.query.username;

    let rc = await User.get_user(username);

    return res.status(rc.status).json({ message: rc.message, user: rc.user });
});

router.post('/uploadimage', upload.single('image'), (req, res) => {
    let status = 200;
    let message = "Image uploaded successfully"
    if (req.image) {
      status = 404;
      message = "Image failed to upload"
    }

    return res.status(status).json({ message: message });
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
        friend_requests: {
            incoming: [],
            outgoing: []
        },
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

    let rc = await User.delete_user(req.query.username);
    return res.status(rc.status).json({ message: rc.message });
});

router.put('/add_favorite_bar', async (req, res) => {
    console.log('/user/add_favorite_bar PUT request received');

    let rc = await User.add_favorite_bar(req.body.username, req.body.bar_id);
    return res.status(rc.status).json({ message: rc.message });
});

router.delete('/remove_favorite_bar', async (req, res) => {
    console.log('/user/remove_favorite_bar DELETE request received');

    let rc = await User.remove_favorite_bar(req.body.username, req.body.bar_id);
    return res.status(rc.status).json({ message: rc.message });
});

router.put('/add_favorite_deal', async (req, res) => {
    console.log('/user/add_favorite_deal PUT request received');

    let rc = await User.add_favorite_deal(req.body.username, req.body.deal_id);
    return res.status(rc.status).json({ message: rc.message });
});

router.delete('/remove_favorite_deal', async (req, res) => {
    console.log('/user/remove_favorite_deal DELETE request received');

    let rc = await User.remove_favorite_deal(req.body.username, req.body.deal_id);
    return res.status(rc.status).json({ message: rc.message });
});

router.put('/friend_request', async (req, res) => {
    console.log('/user/friend_request PUT request received');

    let rc = await User.send_friend_request(req.body.requester, req.body.requestee);
    return res.status(rc.status).json({ message: rc.message });
});

router.put('/accept_friend', async (req, res) => {
    console.log('/user/accept_friend PUT request received');

    let rc = await User.accept_friend_request(req.body.requester, req.body.requestee);
    return res.status(rc.status).json({ message: rc.message });
});

router.delete('/remove_friend', async (req, res) => {
    console.log('/user/remove_friend DELETE request received');

    let rc = await User.remove_friend(req.body.user1, req.body.user2);
    return res.status(rc.status).json({ message: rc.message });
});

module.exports = router;