import express from 'express';
import multer from 'multer';
import path from 'path';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images'));
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  }
});

const upload = multer({ storage });
uploadRouter.post('/', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

export default uploadRouter;
