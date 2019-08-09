# nextjs-mongodb-app

A full-fledged app made with Next.JS and MongoDB.

## About this project

`nextjs-mongodb-app` is a full-fledged app built with Next.JS and MongoDB. Most tutorials on the Internet are either *half-baked* or *not production-ready*. This project aims to fix that.

This project goes even further and attempts to integrate top features as seen in real-life apps, making it a full-fledged app.

## Using this project

This project accompanies the following posts:

- https://www.hoangvvo.com/blog/full-fledged-app-with-next-js-and-mongodb-part-1/

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
- `argon2` - optional, may be replaced with any password-hashing library.
- `validator` - optional but recommended.

#### Environmental variables

Required environmental variables in this project include:

- `process.env.MONGODB_URI` The MongoDB Connection String (with credentials)

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

#### User profile `developing`

- Avatar, name, email, location, etc.
- User profile page
- Edit user profile

Have any features in mind, [make an issue](https://github.com/hoangvvo/nextjs-mongodb-app/issues). Would like to work on a feature, [make a PR](https://github.com/hoangvvo/nextjs-mongodb-app/pulls).

## Contributing

Please see my [contributing.md](contributing.md).

## License

[MIT](LICENSE)
