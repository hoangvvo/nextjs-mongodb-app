import nextConnect from 'next-connect';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import middleware from '../../../middlewares/middleware';

const upload = multer({ dest: '/tmp' });
const handler = nextConnect();

handler.use(middleware);

handler.patch(upload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.user) throw new Error('You need to be logged in.');
    let profilePicture;

    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        width: 512,
        height: 512,
        crop: 'fill',
      });
      profilePicture = image.secure_url;
    }

    const { name, bio } = req.body;
    await req.db
      .collection('users')
      .updateOne(
        { _id: req.user._id },
        {
          $set: {
            ...(name && { name }),
            bio: bio || '',
            ...(profilePicture && { profilePicture }),
          },
        },
      );
    res.json({
      ok: true,
      message: 'Profile updated successfully',
      data: { name, bio },
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.toString(),
    });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
