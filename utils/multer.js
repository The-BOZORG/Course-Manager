import multer from 'multer';
import path from 'path';

const uploadDir = path.resolve('uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
});

const upload = multer({ storage });

export default upload;
