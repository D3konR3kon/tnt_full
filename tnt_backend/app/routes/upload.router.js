const uploadFile = require('../middlewares/upload');

module.exports = app => {
  const { verifySignUp } = require('../middlewares')
  const controller = require('../controllers/file.controller');

  // router.post("/images", controller.upload);
  

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Access",
            "x-access-token, Origin, Content-Type, Accept"
        )

        
        
    })

    app.post("/api/auth/sig", uploadFile,
    controller.upload)
  //   app.post("/api/auth/signin", controller.signin)
  
  // // 

  //app.use('/api/auth/',router);
};

