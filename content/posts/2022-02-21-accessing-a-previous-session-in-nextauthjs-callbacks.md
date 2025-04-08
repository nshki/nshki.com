---
title: Accessing a previous session in NextAuth.js callbacks
description: A how-to on accessing previous session tokens to enable account merging or something similar using NextAuth.js.
date: 2022-02-21 12:00:00 -0000
---

**Edit: February 22nd, 2022**: Balázs Orbán, the lead maintainer of NextAuth, [was kind enough to point out on Twitter](https://twitter.com/balazsorban44/status/1496322391059873796?s=20&t=k4AGaG_eh7gcPVJM4LhaDQ) that achieving this is much simpler by using the built-in [getToken()](https://next-auth.js.org/tutorials/securing-pages-and-api-routes#using-gettoken) function. Cheers for that! I've left the original article below.

--

I recently was working on a project that used [NextAuth.js](https://next-auth.js.org/) for its auth mechanism and needed to support account merging. e.g. If I’m already logged in via an email and password combination, I need to be able to “attach” an account from an OAuth service like Twitter or Discord to that main account.

For folks who use NextAuth, this should already be possible if you’re using the [database session strategy](https://next-auth.js.org/getting-started/upgrade-v4#session-strategy), but it’s not quite as obvious if you’re using the JWT strategy. The objective is to have access to the previous session with an identifier you can use to reference a main account/user record. There is a [GitHub discussion](https://github.com/nextauthjs/next-auth/discussions/3946) open to address this very thing, but this article outlines a way you can access previous session tokens in your currently installed version of NextAuth.

## General strategy

In Next.js, we’re already able to access request cookies by referencing the `req.cookies` object provided by the `NextApiRequest` object in each API route. We can utilize this to reference the session cookie provided by NextAuth. We can configure NextAuth to use a custom session cookie name so we can always reference it without fear of the default name changing in future releases.

The next challenge here is that the session cookie is encoded for security reasons, so we need a way to reliably decode it on the back end. Luckily, we can do that by defining custom JWT encode and decode functions for NextAuth.

### 1. Get access to the `NextApiRequest` object

As a first step, let’s make sure our NextAuth API route is set up to have access to the request object. Most examples from NextAuth’s docs don’t include the request, so here’s one way to do it:

```jsx
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'

export default (req, res) => {
  return NextAuth(req, res, {
    // Your NextAuth config
  })
}
```

```tsx
// For TypeScript folks, it'd look like this.
//
// pages/api/auth/[...nextauth].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, {
    // Your NextAuth config
  }
})
```

### 2. Use a custom session cookie name

Next, let’s use a custom session cookie name so we can future-proof ourselves from referencing a default session cookie name in case it changes in future NextAuth releases. You can see [specific option documentation here](https://next-auth.js.org/configuration/options#cookies).

```jsx
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'

export default (req, res) => {
  let sessionTokenName = '<your session token name>'

  return NextAuth(req, res, {
    cookies: {
      sessionToken: {
        name: sessionTokenName,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: true
        }
      }
    },

    // Rest of your NextAuth config
  })
}
```

### 3. Add custom JWT encode and decode functions

Now, let’s add custom JWT encode and decode functions so that we can prepare to properly decode the session token. I ended up using the [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) package [as suggested by NextAuth’s docs](https://next-auth.js.org/adapters/dgraph#working-with-jwt-session-and-auth-directive), so let’s install that.

```bash
# For Yarn users
yarn add jsonwebtoken
```

```bash
# For NPM users
npm install jsonwebtoken
```

We’ll define custom functions in a separate module.

```jsx
// lib/jwt.js
import * as jwt from 'jsonwebtoken'

export function jwtEncode({ token, secret }) {
  return jwt.sign({ ...token }, secret, { algorithm: 'HS256' })
}

export function jwtDecode({ token, secret }) {
  return jwt.verify(token, secret, { algorithms: ['HS256'] })
}
```

And use them in the NextAuth route. Generate a `NEXTAUTH_SECRET` environment variable if you haven’t done so already in your setup.

```jsx
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import { jwtEncode, jwtDecode } from '../../lib/jwt'

export default (req, res) => {
  let sessionTokenName = '<your session token name>'

  return NextAuth(req, res, {
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
      encode: jwtEncode,
      decode: jwtDecode
    },

    // Rest of your NextAuth config
  })
}
```

### 4. Decode the session token

Now we have all the piping in place to reference the decoded session token! This will obviously depend on your particular use case, but here’s an example of how to do it in the `jwt` callback.

```jsx
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import { jwtEncode, jwtDecode } from '../../lib/jwt'

export default (req, res) => {
  let sessionTokenName = '<your session token name>'

  return NextAuth(req, res, {
    callbacks: {
      jwt: ({ token }) => {
        let secret = process.env.NEXTAUTH_SECRET
        let sessionToken = req.cookies[sessionTokenName]
        let decodedSession = jwtDecode({ token: sessionToken, secret })

        // Use `decodedSession` here! Look up a user or account
        // record, persist current session data, etc.
      }
    },

    // Rest of your NextAuth config
  })
}
```

## Wrapping up

Keep tabs on the [relevant GitHub discussion](https://github.com/nextauthjs/next-auth/discussions/3946) to follow any official releases that might make this article obsolete, but I hope this serves as a helpful reference in the meantime for anyone looking to accomplish account merging or something similar using NextAuth.
