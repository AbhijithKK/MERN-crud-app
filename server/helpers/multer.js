const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, file.fieldname + '-' + uniqueSuffix+'.jpg')
    }
  
  })
 
let upload=multer({
    storage: storage
})

// const multipleUpload = upload.fields([{ name: 'main_image', maxCount: 3},{ name: 'sub_image', maxCount: 3 }])


module.exports=upload
