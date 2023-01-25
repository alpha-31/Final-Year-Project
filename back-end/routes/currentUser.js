const express = require('express');
const router = express.Router();
const currentUser = require('../middlewares/current-user');

router.get('/', currentUser, async (req, res) => {
    // console.log(req.currentUser);
    res.send({ currentUser: req.currentUser || null });
});

module.exports = router;