//videoController.js
exports.uploadVideo = async (req, res) => {
    const video = new Video({
        video: req.file.path,
        owner: req.currentUser._id
    });
    await video.save();
    res.status(201).send({ data: { video } });
}


exports.analyzeVideo = async (req, res) => {
    const video = await Video.findById(req.params.id);
    if (!video) {
        throw new NotFoundError();
    }

    // perform video analysis here
    const results = {...[]};

    video.results = results;
    await video.save();

    res.send({ data: { video } });
}


exports.upload = upload.single('file'), async (req, res, next) => {
  try {
    const video = new Video({
      file: req.file.path,
      user: req.currentUser._id,
      uploadDate: new Date()
    });
    await video.save();
    res.status(201).send(video);
  } catch (err) {
    next(err);
  }
};

exports.getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      throw new NotFoundError();
    }
    res.send(video);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  
};

exports.delete = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      throw new NotFoundError();
    }
    await video.remove();
    res.send(video);
  } catch (err) {
    next(err);
  }
};
const Video = require('../models/video');
const { sendMail } = require('../services/mailer');
const { classify } = require('../services/classify');

exports.upload = async (req, res) => {
  try {
    const video = new Video({
      file: req.file.buffer,
      user: req.model._id,
      uploadDate: Date.now()
    });

    const classificationResults = await classify(req.file.buffer);
    video.classificationResults = classificationResults;

    await video.save();

    const user = await req.model.populate('user').execPopulate();
    sendMail(user.email, 'Video Uploaded', 'Your video has been uploaded and classified');

    res.status(201).send(video);
  } catch (error) {
    res.status(500).send(error);
  }
};


exports.getAll = async (req, res) => {
  try {
    const videos = await Video.find({ user: req.model._id });
    res.send(videos);
  } catch (error) {
    res.status(500).send();
  }
};
