const multer = require('multer');
const path = require('path');
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpeg|jpg|png|mp4)$/)) {
    return cb(
      new Error(
        'only upload files with jpg, jpeg, png, mp4 format.'
      )
    );
  }
  
  cb(undefined, true);
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, __dirname + '/../uploads/');
    },
    filename(req, file, cb) {
      cb(null, `${file.filename}_${new Date().getTime()}_${file.originalname}`);
    }
  }),
  
  fileFilter: fileFilter
});


module.exports = upload;