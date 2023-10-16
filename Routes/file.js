const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const upload = require('multer');

// router.post(
//     '/emails', 
//     multerConfig.single('file'), 
//     (req, res) => {
//     console.log(request.file);
//     return response.send();
// });

//router.post("/upload_file", multerConfig.single("file"), uploadFiles);
// function uploadFiles(req, res) {
//     console.log(req.body);
//     console.log(req.file);
//     res.json({ message: "Successfully uploaded file" });
// }


//router.post('/editPhoto', multerConfig.single('avatar'), (req, res, next) => {
    // here in the req.file you will have the uploaded avatar file
// })

 router.post('/editPhoto', (req, res, next) => {
    upload(req, res, function (err) {
      if (err) {
        // This is a good practice when you want to handle your errors differently
        console.log(req.body);
        console.log(req.body);
        return
      }
  
      // Everything went fine 
    })
  }) 

 const upload1 = upload({ dest: "uploads1/" });  
 router.post("/upload_file", upload1.array("file"), uploadFiles);

  function uploadFiles(req, res) {
      console.log(req.body);
      //console.log(req.files);
      res.json({ message: "Successfully uploaded files" });
  }


module.exports = router;