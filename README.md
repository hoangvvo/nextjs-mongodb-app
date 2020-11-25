[![Next.js](https://assets.zeit.co/image/upload/v1538361091/repositories/next-js/next-js.png)](https://nextjs.org)

<h1 align="center">Next.js ❤️ MongoDB</h1>

<div align="center">
  
[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/new/project?template=https://github.com/hoangvvo/nextjs-mongodb-app)

An [**Next.js**](https://github.com/zeit/next.js/) and [**MongoDB**](https://www.mongodb.com/) web application, designed with simplicity for learning and real-world applicability in mind.

:rocket: [Check out the demo](https://nextjs-mongodb.now.sh/) :rocket:

</div>

<h2 align="center">Features</h2>

<div align="center">

  - 🐇 [Fast](https://github.com/fastify/benchmarks#benchmarks) and light without [bulky](https://bundlephobia.com/result?p=express@4.17.1) Express.js.
  - ✨ Full [API Routes](https://nextjs.org/blog/next-9#api-routes) implementation and 👻 Serverless ready
  - 🤠 Good ol' Middleware pattern
  - 💋 [KISS](https://en.wikipedia.org/wiki/KISS_principle): No fancy stuff like GraphQL, SASS, Redux, etc.
  - ✍️ Come with explanatory blog posts
  - ✌️ Can be adapted to any databases besides MongoDB

</div>

<h3 align="center">:lock: Authentication and Account</h3>

<div align="center">

<sup>*without passportjs*: [`a1747b7`](https://github.com/hoangvvo/nextjs-mongodb-app/commit/c36c5826f691032803760b5404ccec3446575504) *with passportjs*: `master`</sup>

- [x] Session-based authentication
- [x] Sign up/Sign in/Sign out API
- [x] Authentication via email/password
- [ ] Authentication via OAuth (Google, Facebook, etc.)
- [x] Email verification
- [x] Password change
- [x] Password reset via email

</div>

<h3 align="center">:woman::man: Profile</h3>

<div align="center">

- [x] Profile picture, name, bio, email
- [x] Update user profile

</div>

<h3 align="center">:eyes: Social</h3>

<div align="center">

- [x] View others' profiles and posts
- [x] Public postings like Twitter and Facebook

</div>

<div align="center">
  
<sup>Have any features that interest you, [make an issue](https://github.com/hoangvvo/nextjs-mongodb-app/issues). Would like to work on a feature, [make a PR](https://github.com/hoangvvo/nextjs-mongodb-app/pulls).<sup>
  
</div>

<h2 align="center">Guide</h2>

This project accompanies the following posts:

- [User authentication (using Passport.js)](https://hoangvvo.com/blog/next-js-and-mongodb-app-1)
- [User profile and Profile Picture](https://hoangvvo.com/blog/next-js-and-mongodb-app-2)
- [Email Verification, Password Reset/Changee](https://hoangvvo.com/blog/next-js-and-mongodb-app-3)

Also check them out on [dev.to](https://dev.to/hoangvvo).

The project is designed to **as simple as possible** for learning purpose. Due to its simplicity, aspects such as **security** must be reconsidered before being **used in production**.

<h3 align="center">Dependencies</h3>

This project uses the following dependencies:

- `next.js` - v9.3 or above required for **API Routes** and new [**new data fetching method**](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering).
- `react` - v16.8 or above required for **react hooks**.
- `react-dom` - v16.8 or above.
- `swr` - required for state management
- `mongodb` - may be replaced by `mongoose`.
- `passport`, `passport-local` - required after [#39](https://github.com/hoangvvo/nextjs-mongodb-app/pull/39) for authentication
- `next-connect` - recommended if you want to use Express/Connect middleware and easier method routing.
- `express-session`, `connect-mongo` - required for session, may be replaced with other session libraries such as `cookie-session` or `next-iron-session`.
- `bcryptjs` - optional, may be replaced with any password-hashing library. `argon2` recommended.
- `validator` - optional but recommended.
- `multer` - may be replaced with any middleware that handles `multipart/form-data`
- `cloudinary` - optional, **only if** you are using [Cloudinary](https://cloudinary.com) for image upload.
- `@sendgrid/mail` - optional, **only if** you are using [SendGrid](https://sendgrid.com/) to send emails.

<h3 align="center">Environmental variables</h3>

The environment variables [will be inlined during build time](https://nextjs.org/docs#build-time-configuration)

Environmental variables in this project include:

- `MONGODB_URI` The MongoDB Connection String (with credentials)
- `EMAIL_FROM` The email address to send your emails from.
- `DB_NAME` The name of the MongoDB database to be used.
- `WEB_URI` The *URL* of your web.
- `SESSION_SECRET` (only if you use `express-session`) The secret to be used in `express-session`.
- `CLOUDINARY_URL` (optional, Cloudinary **only**) Cloudinary environment variable for configuration. See [this](https://cloudinary.com/documentation/node_integration#configuration).
- `SENDGRID_API_KEY` (optional, SendGrid **only**) SendGrid API Key. See [this](https://sendgrid.com/docs/ui/account-and-settings/api-keys/).

<h3 align="center">Development</h3>

Start the development server by running `yarn dev` or `npm run dev`. The project supports using `.env`. Getting started by create a `.env` file with the above variables.

#### `.env`

I include my own environment variables in [.env.example](.env.example) for experimentation purposes. Please replace them with your owns and refrain from sabotaging them. You can try them in development by renaming it into `.env`.

In production, it is recommended to set the environment variables using the options provided by your cloud/hosting providers. **Do not use or commit `.env`**.

<h2 align="center">Deployment</h2>

This project can be deployed [anywhere Next.js can be deployed](https://nextjs.org/docs/deployment). Make sure to set the environment variables using the options provided by your cloud/hosting providers.

After building using `npm run build`, simply start the server using `npm run start`.

You can also deploy this with serverless providers given the correct setup.

<h2 align="center">Contributing</h2>

<div align="center">
  
Please see my [contributing.md](CONTRIBUTING.md).

</div>

<h2 align="center">
  License
</h2>

<div align="center">
  
  [MIT](LICENSE)
  
</div>
