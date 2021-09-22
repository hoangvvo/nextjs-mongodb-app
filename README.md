[![Next.js](https://assets.zeit.co/image/upload/v1538361091/repositories/next-js/next-js.png)](https://nextjs.org)

<h1 align="center">Next.js ❤️ MongoDB</h1>

<div align="center">
  
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhoangvvo%2Fnextjs-mongodb-app&env=MONGODB_URI,CLOUDINARY_URL,NODEMAILER_CONFIG,WEB_URI&envDescription=Environment%20Variables&envLink=https%3A%2F%2Fgithub.com%2Fhoangvvo%2Fnextjs-mongodb-app%23environmental-variables&demo-title=nextjs-mongodb-app%20demo&demo-description=A%20demo%20deployed%20on%20Vercel&demo-url=https%3A%2F%2Fnextjs-mongodb.vercel.app%2F)

An [**Next.js**](https://github.com/zeit/next.js/) and [**MongoDB**](https://www.mongodb.com/) web application, designed with simplicity for learning and real-world applicability in mind.

:rocket: [Check out the demo](https://nextjs-mongodb.now.sh/) :rocket:

</div>

<h2 align="center">Features</h2>

<div align="center">

- 🐇 Fast and light without [bulky](https://bundlephobia.com/result?p=express@4.17.1), [slow](https://github.com/fastify/benchmarks#benchmarks) Express.js.
- ✨ Full [API Routes](https://nextjs.org/blog/next-9#api-routes) implementation and 👻 Serverless ready
- 🤠 Good ol' Middleware pattern, compatible with Express ecosystem, powered by [next-connect](https://github.com/hoangvvo/next-connect)
- 💋 [KISS](https://en.wikipedia.org/wiki/KISS_principle): No fancy stuff like GraphQL, SASS, Redux, etc.
- ✍️ Come with explanatory blog posts
- ✌️ Can be adapted to any databases besides MongoDB

</div>

<h3 align="center">:lock: Authentication and Account</h3>

<div align="center">

<sup>_without passportjs_: [`a1747b7`](https://github.com/hoangvvo/nextjs-mongodb-app/commit/c36c5826f691032803760b5404ccec3446575504) _with passportjs_: `master`</sup>

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

**Note:** Some of the detail in the posts above might not be up to date due to breaking changes in libraries used in this projects. See [#125](https://github.com/hoangvvo/nextjs-mongodb-app/pull/125).

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
- `next-session`, `connect-mongo` - required for session, may be replaced with other session libraries such as `cookie-session`, `next-iron-session`, or `express-session` (`express-session` is observed not to work properly on Next.js 11+).
- `bcryptjs` - optional, may be replaced with any password-hashing library. `argon2` recommended.
- `validator` - optional but recommended, to validate email.
- `ajv` - optional but recommended, to validate request body.
- `multer` - may be replaced with any middleware that handles `multipart/form-data`
- `cloudinary` - optional, **only if** you are using [Cloudinary](https://cloudinary.com) for image upload.

<h3 align="center">Environmental variables</h3>

Environmental variables in this project include:

- `MONGODB_URI` The MongoDB Connection String (with credentials and database name)
- `WEB_URI` The _URL_ of your web.
- `CLOUDINARY_URL` (optional, Cloudinary **only**) Cloudinary environment variable for configuration. See [this](https://cloudinary.com/documentation/node_integration#configuration).
- `NODEMAILER_CONFIG` (optional, if using nodemailer **only**) JSON stringified nodemailer config. See `.env.example`.

<h3 align="center">Development</h3>

Start the development server by running `yarn dev` or `npm run dev`. Getting started by create a `.env.local` file with the above variables. See [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables).

#### `.env.local`

I include my own environment variables in [.env.example](.env.example) for experimentation purposes. Please replace them with your owns and refrain from sabotaging them. You can try them in development by renaming it into `.env.local`.

In production, it is recommended to set the environment variables using the options provided by your cloud/hosting providers. **Do not use or commit `.env.local`**.

It is at upmost importance that you do not reuse these variables in production. Especially, the database in use is public so its data is visible to all.

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
