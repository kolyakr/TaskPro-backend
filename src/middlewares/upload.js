import multer from 'multer';
import { AVATARS_DIRECTION } from '../constants.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, AVATARS_DIRECTION);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
