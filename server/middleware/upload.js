import multer from 'multer'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = './uploads'
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    cb(null, dir)
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  if (!file) {
    return cb('Please upload a file.', false)
  } else if (file.mimetype.includes('csv')) {
    return cb(null, true)
  } else {
    req.fileValidationError = {
      status: 'fail',
      message: 'Only support CSV file.',
    }
    return cb(null, false, req.fileValidationError)
  }
}

export default multer({
  storage,
  fileFilter,
})
