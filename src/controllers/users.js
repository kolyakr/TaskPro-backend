import { updateUserProfile } from '../services/users.js';
import { saveToCloudinary } from '../utils/saveToCloudinary.js';

export const getUserInfoController = (req, res) => {
  res.json({
    status: 200,
    message: 'User info sccessfully got',
    data: {
      user: {
        name: req.user.name,
        email: req.user.email,
        avatar: req?.user.avatar,
        theme: req.user.theme,
      },
    },
  });
};

export const updateUserProfileController = async (req, res) => {
  const avatar = await saveToCloudinary(req);
  let payload = req.body || {};

  if (avatar) {
    payload = {
      ...payload,
      avatar: avatar,
    };
  }

  const { user } = req;

  const updatedUser = await updateUserProfile(payload, user._id);
  const { password, ...updatedUserData } = updatedUser._doc;

  res.json({
    status: 200,
    message: 'User profile successfully updated',
    data: {
      user: {
        name: updatedUserData.name,
        email: updatedUserData.email,
        avatar: updatedUser?.avatar || null,
        theme: updatedUserData.theme,
      },
    },
  });
};
