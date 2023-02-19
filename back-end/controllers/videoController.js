//videoController.js
const axios = require('axios');
const {Video} = require('../models/video.js');
const {User} = require('../models/user.js');
const NotFoundError = require('../errors/not-found-error');
const VideoController = require('../controllers/videoController');
const upload = require('../services/uploadVideo');
const { getVideoDurationInSeconds } = require('get-video-duration')
const BadRequestError = require('../errors/bad-req-error');

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
    // find the user who uploaded the video
    let user = await User.findById(video.user);
    let len = video.duration;
    let size =  video.size;

    // perform video analysis here
    let results;
    try {
      const response = await axios.post('http://127.0.0.1:5000/process_video', {
        "file_path": video.file
      });
      console.log(size);
      if(parseInt(size) > user.plan_left_size){
        throw new BadRequestError('You have exceeded your plan limit');
      }
      if(parseInt(len) > user.plan_left_tim){
        throw new BadRequestError('You have exceeded your plan limit');
      }
      if(req.reqType === 'time'){
        user.plan_left_time -= len;
        await user.save();
      }
      else if(req.reqType === 'size'){
        user.plan_left_size -= size;
        await user.save();
      }
      results = response.data;
      // console.log(results);
      video.results = {...results};
      await video.save();
      console.log("done")
      res.send({ results : video.results } );
    } catch (error) {
      res.status(500).send({ error: error });
    }   
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

