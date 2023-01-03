
const util = require("util");
const path = require("path")
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const store = require('./cloudinary')

let uploadFile = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb)=>{
    let ext = path.extname(file.originalname);
    if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
      cb(new Error("File type is not supported."), false)
      return;
    } 
    cb(null, true)
  },
  
}).single('image');



module.exports = uploadFile;
