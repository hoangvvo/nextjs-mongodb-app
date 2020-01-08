![nextjs-mongodb-app](https://repository-images.githubusercontent.com/201392697/5d392300-eef3-11e9-8e20-53310193fbfd)

# Next.js + MongoDB App

A full-fledged app made with Next.JS and MongoDB.

## About this project

`nextjs-mongodb-app` is a continously developed app built with Next.JS and MongoDB.

Give this project a big ol' 🌟 star motivates me to work on new features.

Check out the [demo](https://nextjs-mongodb-app.hoangvvo.now.sh/).

## Features

### Authentication

*without passportjs*: [`a1747b7`](https://github.com/hoangvvo/nextjs-mongodb-app/commit/c36c5826f691032803760b5404ccec3446575504)
*with passportjs*: `master`

- Session
- Sign up/Sign in/Sign out

### Profile

- Profile picture, name, bio, email
- Edit profile

### Account

- Email verification
- Password change
- Password reset

Have any features that interest you, [make an issue](https://github.com/hoangvvo/nextjs-mongodb-app/issues). Would like to work on a feature, [make a PR](https://github.com/hoangvvo/nextjs-mongodb-app/pulls).

## Using this project

Before getting started, I welcome you to read this [issue](https://github.com/hoangvvo/nextjs-mongodb-app/issues/13) on production readiness. The goal is not to use this project as it, but to implement your own version.

This project accompanies the following posts:

- https://www.hoangvvo.com/blog/full-fledged-app-with-next-js-and-mongodb-part-1/
- https://www.hoangvvo.com/blog/full-fledged-app-with-next-js-and-mongodb-part-2/

*Note*: **Part 1** and **Part 2** are written without [next-connect](https://www.npmjs.com/package/next-connect) for middleware and method routing and only apply to commits before [db910c2](https://github.com/hoangvvo/nextjs-mongodb-app/tree/db910c259adb96494156b467834c65075ca90714).

The project is designed to as simple as possible for the purpose of learning. Due to its simplicity, aspects such as security must be reconsidered before being pushed to production.

### Dependencies

This project uses the following dependencies:

- `next.js` - v9 or above required for **API Routes**.
- `react` - v16.8 or above required for **react hooks**.
- `react-dom` - v16.8 or above.
- `mongodb` - may be replaced by `mongoose`.
- `next-connect` - recommended if you want to use Express/Connect middleware.
- `axios`, `axioswal` - optional, may be replaced with any request library.
- `next-session`, `connect-mongo` - may be replaced with any session management solution.
- `bcryptjs` - optional, may be replaced with any password-hashing library. `argon2` recommended.
- `validator` - optional but recommended.
- `formidable` - may be replaced by other file parser.
- `cloudinary` - optional, **only if** you are using [Cloudinary](https://cloudinary.com) for image upload.
- `@sendgrid/mail` - optional, **only if** you are using [SendGrid](https://sendgrid.com/) to send emails.

### Environmental variables

The environment variables [will be inlined during build time](https://nextjs.org/docs#build-time-configuration) and thus should not be used in front-end codebase.

Required environmental variables in this project include:

- `process.env.MONGODB_URI` The MongoDB Connection String (with credentials)
- `process.env.EMAIL_FROM` The email address to send your emails from.
- `process.env.DB_NAME` The name of the MongoDB database to be used.
- `process.env.WEB_URI` The *URL* of your web.
- `process.env.CLOUDINARY_URL` (optional, Cloudinary **only**) Cloudinary environment variable for configuration. See [this](https://cloudinary.com/documentation/node_integration#configuration "Cloudinary Configuration").
- `process.env.SENDGRID_API_KEY` (optional, SendGrid **only**) SendGrid API Key. See [this](https://sendgrid.com/docs/ui/account-and-settings/api-keys/).
- `process.env.SENDGRID_TEMPLATEID_EMAILVERIFY` (optional, Sendgrid **only**) SendGrid Email Template to use.

### Development

Start the development server by running `yarn dev` or `npm run dev`. The project supports using `.env`. Getting started by create a `.env` file with the above variables.

**Styles (CSS):** This project does not contain any stylesheets, and no component has classes. To remove the style, simply remove all `<style jsx>` and `<style jsx global>` tags.

#### `.env`

I include my own MongoDB, Cloudinary, SendGrid environment variables in [.env.example](.env.example) for experimentation purposes. Please replace them with your owns and refrain from sabotaging them. You can try them in development by renaming it into `.env`.

In production, it is recommended to set the environment variables using the options provided by your cloud/hosting providers. **Do not use or commit `.env`**.

## Contributing

Please see my [contributing.md](contributing.md).

## License

[MIT](LICENSE)
