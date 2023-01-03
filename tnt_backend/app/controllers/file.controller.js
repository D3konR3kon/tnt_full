const uploadFile = require('../middlewares/upload')
const cloudinary =require('../middlewares/cloudinary')
const fs = require('fs')
const db = require('../models')
const Shop = db.shop
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/auth.config')



exports.upload = async (req, res) => {
  try {
    
        
    
    const result =  cloudinary.uploader.upload(req.file.path)
     // Create new shop
    const shop = new Shop({
      name: req.body.name,
      email: req.body.email,
      img: (await result).secure_url,
      password: bcrypt.hashSync(req.body.password, 10),
     
    })
    // Save shop
    await shop.save((err, shop)=>{
        if(err){
            console.log(err)
            res.send({message: err})
            return
        }
        res.json(shop);
    });
    
  } catch (err) {
    console.log(err);
  }}; 

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    fs.readdir(directoryPath, function (err, files){
        if(err){
            res.status(500).send({
                message: "Unable to scan files ",
            });
        }
    
        let filesInfos = [];
        let baseUrl = 'http://localhost:8080';

        files.forEach((file) =>{
            filesInfos.push({
                name: file,
                url : baseUrl + file,
            });
        });

        res.status(200).send(filesInfos)
    });

};

// const getListFiles = (req, res) => {
//   const directoryPath = __basedir + "/resources/static/assets/uploads/";

//   fs.readdir(directoryPath, function (err, files) {
//     if (err) {
//       res.status(500).send({
//         message: "Unable to scan files!",
//       });
//     }

//     let fileInfos = [];

//     files.forEach((file) => {
//       fileInfos.push({
//         name: file,
//         url: baseUrl + file,
//       });
//     });

//     res.status(200).send(fileInfos);
//   });
// };

// const download = (req, res) =>{
//     const filename = req.params.name;
//     const directoryPath = __basedir + "/resources/static/assets/uploads/";
    

//     res.download(directoryPath + filename, filename, (err)=>{
      
//         res.status(500).send({
//             message: "Could not download file " + err
            
//         });
//     });
//     return;
// }

exports.signin = (req, res) => {

    Shop.findOne({
        name: req.body.name
    })
    // .populate("roles", "-__v")
    .exec((err, shop) => {
        if(err){
            res.status(500).send({ msg: err})
            return
        }
        if(!shop){
            return res.status(404).send({ msg: "Shop not found!" })
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, shop.password)
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                msg: "Invalid Password"
            })
        }
        let token = jwt.sign({ id: shop.id}, config.secrete, {
            expiresIn: 86400
        })
        // console.log(user.roles)
        // let authorities = []
        // for(let i = 0; i < user.roles.length; i++){
        //     authorities.push("Role_"+user.roles[i].name.toUpperCase())
        // }
        res.status(200).send({
            id: shop._id,
            name: shop.name,
            email: shop.email,
            // roles: authorities,
            accessToken: token
        })
    })
}