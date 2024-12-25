import fs from 'fs';
import { AVATARS_DIRECTION, TEMP_DIRECTION } from '../constants.js';

export const createTemp = async () => {
  const isTempExist = await fs.existsSync(TEMP_DIRECTION);

  if (isTempExist) {
    return;
  } else {
    fs.mkdirSync(TEMP_DIRECTION);
    fs.mkdirSync(AVATARS_DIRECTION);
  }
};
