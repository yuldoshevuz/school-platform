const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../', 'public', 'uploads', 'original-format'),
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const checkFileType = (req, file, cb) => {
    try {
        const fileTypes = /jpg|jpeg|png|gif|heic/
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = fileTypes.test(file.mimetype)
    
        if (extname && mimetype) {
            return cb(null, true)
        }

        // req.session.error = 'Siz rasm formatdagi faylni yuklamadingiz!'
        cb('Siz rasm formatdagi faylni yuklamadingiz!')
    } catch (error) {
        console.log(error);
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 10000000 },
    fileFilter(req, file, cb) {
        checkFileType(req, file, cb)
    }
})

module.exports = upload
