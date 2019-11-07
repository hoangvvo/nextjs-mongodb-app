import nextConnect from 'next-connect';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import middleware from '../../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.put((req, res) => {
  if (!req.user) return res.status(401).send('You need to be logged in.');
  const form = new formidable.IncomingForm();
  return form.parse(req, (err, fields, files) => cloudinary.uploader
    .upload(files.profilePicture.path, {
      width: 512,
      height: 512,
      crop: 'fill',
    })
    .then(image => req.db
      .collection('users')
      .updateOne(
        { _id: req.user._id },
        { $set: { profilePicture: image.secure_url } },
      ))
    .then(() => res.send({
      status: 'success',
      message: 'Profile picture updated successfully',
    }))
    .catch(error => res.send({
      status: 'error',
      message: error.toString(),
    })));
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
