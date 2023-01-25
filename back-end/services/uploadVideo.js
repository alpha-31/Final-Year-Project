const multer = require('multer');
const path = require('path');
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(mp4)$/)) {
    return cb(
      new Error(
        'only upload files mp4 format.'
      )
    );
  }
  
  cb(undefined, true);
}

const stor = multer.diskStorage({
  destination: './uploads/Videos',
  filename :(req, file, cb) =>{
    return cb(null, `${file.fieldname}_${new Date().getTime()}_${file.originalname}`);
  },
  fileFilter: fileFilter

});
const upload = multer({
  storage: stor
})


  


module.exports = upload;