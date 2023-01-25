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
  size : {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  },
  results: {
    type: Object
  }
});

const Video = mongoose.model('videos', videoSchema);


exports.Video = Video;
