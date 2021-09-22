import { updateUserById } from '@/api-lib/db';
import { all } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import nc from 'next-connect';

const upload = multer({ dest: '/tmp' });
const handler = nc(ncOpts);

/* eslint-disable camelcase */
const {
  hostname: cloud_name,
  username: api_key,
  password: api_secret,
} = new URL(process.env.CLOUDINARY_URL);

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

handler.use(all);

handler.get(async (req, res) => {
  // Filter out password
  if (!req.user) return res.json({ user: null });
  const { password, ...u } = req.user;
  return res.json({ user: u });
});

handler.patch(upload.single('profilePicture'), async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }
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

  const user = await updateUserById(req.db, req.user._id, {
    ...(name && { name }),
    ...(typeof bio === 'string' && { bio }),
    ...(profilePicture && { profilePicture }),
  });

  res.json({ user });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
