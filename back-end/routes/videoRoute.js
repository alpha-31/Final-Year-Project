const express = require('express');
const videoRouter = new express.Router();
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middlewares/authenticate');
const setRequestMiddleware = require('../middlewares/setRequest');
const upload = require('../services/upload');

videoRouter.get('/:id', videoController.get);

videoRouter.get('/', videoController.getAll);

videoRouter.put('/:id', videoController.update);
videoRouter.delete('/:id', videoController.delete);

module.exports = videoRouter;