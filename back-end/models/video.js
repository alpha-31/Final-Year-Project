const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  classificationResults: {
    type: Object
  }
});

const Video = mongoose.model('videos', videoSchema);


module.Video = Video;
