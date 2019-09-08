# nextjs-mongodb-app

A full-fledged app made with Next.JS and MongoDB.

## About this project

`nextjs-mongodb-app` is a full-fledged app built with Next.JS and MongoDB. Most tutorials on the Internet are either _half-baked_ or _not production-ready_. This project aims to fix that.

This project goes even further and attempts to integrate top features as seen in real-life apps, making it a full-fledged app.

## Using this project

This project accompanies the following posts:

- https://www.hoangvvo.com/blog/full-fledged-app-with-next-js-and-mongodb-part-1/
- https://www.hoangvvo.com/blog/full-fledged-app-with-next-js-and-mongodb-part-2/

### Requirement

This project relies on the following components. Some of them are **optional** (can be used without) and some may be replaced by others with similar functionalities.

#### Dependencies

This project uses the following dependencies:

- `next.js` - v9 or above required for **API Routes**.
- `react` - v16.8 or above required for **react hooks**.
- `react-dom` - v16.8 or above.
- `mongodb` - may be replaced by `mongoose`.
- `axios`, `axioswal` - optional, may be replaced with any request library.
- `next-session`, `connect-mongo` - may be replaced with any session management solution.
- `bcryptjs` - optional, may be replaced with any password-hashing library. `argon2` recommended.
- `validator` - optional but recommended.
- `formidable` - may be replaced by other file parser.
- `cloudinary` - optional, only if you are using [Cloudinary](https://cloudinary.com) for image upload.

#### Environmental variables

Required environmental variables in this project include:

- `process.env.MONGODB_URI` The MongoDB Connection String (with credentials)
- `process.env.CLOUDINARY_URL` Cloudinary environment variable for configuration. See [this](https://cloudinary.com/documentation/node_integration#configuration "Cloudinary Configuration").

I include my own MongoDB and Cloudinary environment variable in [now.json](now.json) for experimentation purposes. Please replace them with your owns and refrain from sabotaging them. In production, if you deploy with [Now](https://zeit.co/), consider using [Secret](https://zeit.co/docs/v2/environment-variables-and-secrets).

## Development

`nextjs-mongodb-app` is a long-term developing project. There is no constraint on numbers of features. I continuously accepts feature proposals and am actively developing and expanding functionalities.

### Features

There are three states in feature development:

- `developed`: The feature has been fully developed and is functional.
- `developing`: The feature is being developed or being improved.
- `proposed`: The feature is proposed and may or may not be developed in the future.

#### Authentication

- Session management
- Allow users to sign up and log in/log out.

#### User profile

- Avatar, name, email, location, etc.
- User profile page
- Edit user profile

#### Social `developing`

- Find other users with search functionality
- View other users' profile page
- Add/Remove friends

Have any features in mind, [make an issue](https://github.com/hoangvvo/nextjs-mongodb-app/issues). Would like to work on a feature, [make a PR](https://github.com/hoangvvo/nextjs-mongodb-app/pulls).

## Contributing

Please see my [contributing.md](contributing.md).

## License

[MIT](LICENSE)
