//videoController.js
const axios = require('axios');
const {Video} = require('../models/video.js');
const NotFoundError = require('../errors/not-found-error');
const VideoController = require('../controllers/videoController');
const upload = require('../services/uploadVideo');
const { getVideoDurationInSeconds } = require('get-video-duration')


exports.uploadVideo = async (req, res, next) => {
  
  const project_path = "F:/FYP/Sky-Net(A Web App)/Final-Year-Project/back-end/" ;

  let file_duration = 0;
  // From a local path...
  await getVideoDurationInSeconds(req.file.path).then((duration) => {
    let temp = duration /60;
    file_duration= temp.toFixed(2);
  })



  try {
    const video = new Video({
      file: project_path+ "uploads/Videos/"+ req.file.filename ,
      user: req.currentUser.db_id ,
      uploadDate: new Date(),
      size: req.file.size,
      duration: file_duration,  
      results : {processed: false}});

    await video.save();
    res.status(201).send({ data: { video: req.file } }); 
  }catch (err) {
    next(err);
  }
 
};


exports.analyzeVideo = async (req, res) => {
    const video = await Video.findById(req.params.id);

    if (!video) {
        throw new NotFoundError();
    }
    // perform video analysis here
    let results;
    try {
      const response = await axios.post('http://127.0.0.1:5000/process_video', {
        "file_path": video.file
      });
      results = response.data;
      // console.log(results);
      video.results = {...results};
      await video.save();
    } catch (error) {
      console.log(error);
    }

    res.send({ results : video.results } );
}



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

exports.getAllVideos = async (req, res, next) => {
  try {
    const videos = await Video.find();
    res.send(videos);
  } catch (err) {
    next(err);
  }
};


exports.deleteVideo = async (req, res, next) => {
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

