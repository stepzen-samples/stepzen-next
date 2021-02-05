This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

### index.js

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/43lisl7h17b7bzkb0wju.jpg)

```javascript
// pages/index.js

import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>stepzen-next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Jamstack SF!</h1>

        <p>
          Get started by editing{' '}
          <code>pages/index.js</code>
        </p>
      </main>

      <footer>
        <a
          href="https://stepzen.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by StepZen
        </a>
      </footer>
    </div>
  )
}
```

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

### users.js

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/4mxxqk0qhw8r5fpiwjlo.jpg)

```javascript
export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return {
    props: { users: data }
  }
}

const Users = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
        </div>
      ))}
    </div>
  );
}
 
export default Users;
```

### _app.js

```javascript
// pages/_app.js

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

### hello.js

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`. The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

```javascript
// pages/api/hello.js

export default (req, res) => {
  res.status(200).json({ name: 'Hello Jamstack SF' })
}
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/8o8tyux37vm12gsr2xsv.jpg)
