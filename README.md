This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Install dependencies

```bash
yarn
```

## Run the development server

```bash
yarn dev
```

### _app.js

Next.js uses the `MyApp` component to initialize pages.

```javascript
// pages/_app.js

import "../App.css"

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

### _document.js

A custom `Document` is commonly used to augment your application's `<html>` and `<body>` tags, for example by adding a language tag for english: `lang="en"`

```javascript
// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

### Head

Next exposes a built-in component for appending elements to the `head` of the page:

```javascript
// pages/index.js

<Head>
  <title>stepzen-next</title>
  <link rel="icon" href="/favicon.ico" />
  <meta name="description" content="StepZen demo with Next.js" />
</Head>
```

### getStaticProps

If you export an `async` function called `getStaticProps` from a page, Next.js will pre-render this page at build time using the props returned by `getStaticProps`.

```javascript
// pages/index.js

export async function getStaticProps() {
  const res = await request(url, JOHN);
  const data = res.customerByEmail;
  return {
    props: { customers: data },
  };
}

export default Home;
```

### JOHN

The `customer` query contains a `customerByEmail` field that accepts an `email` argument and returns the customer's information.

```javascript
// queries/john.queries.js

export const JOHN = gql`
  query customer {  
    customerByEmail(email: "john.doe@example.com") {
      name 
      email
      street
      postalCode
      stateProvince
    }
  }
`
```

### Initialize State and Form Handlers

```javascript
// pages/index.js

function Home({ customers }) {
  const [orders, setOrders] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState(false);
  
  const { handleSubmit, register } = useForm();
```

### onSubmit

The `onSubmit` handler takes the results of the `data` object received by the `CUSTOMERS` query and sets those results to the `orders` object with the `setOrders` hook.

```javascript
// pages/index.js

const onSubmit = handleSubmit(async ({ carrier, trackingId }) => {
  const graphQLClient = new GraphQLClient(url, {});
  try {
    const data = await graphQLClient.request(CUSTOMERS, { carrier, trackingId });
    setOrders(data);
  } catch (err) {
    console.error(err);
  }
});
```

### CUSTOMERS

The `customer` query contains a `delivery` field that accepts `carrier` and `trackingId` arguments and returns the delivery information.

```javascript
// queries/customers.queries.js

export const CUSTOMERS = gql`
  query customer($carrier: String!, $trackingId: String!) {
    delivery(carrier: $carrier, trackingId: $trackingId) {
      status
      statusDate
    }
  }
`
```

### weatherSubmit

The `weatherSubmit` handler does two things:
* `data` object received by the `WEATHER` query is set to the `weather` object with the `setWeather` hook
* `temp` is set to `true` with the `setTemp` hook

```javascript
// pages/index.js

const weatherSubmit = async () => {
  const graphQLClient = new GraphQLClient(url, {});
  try {
    const data = await graphQLClient.request(WEATHER);
    setWeather(data);
    setTemp(temp => !temp);
  } catch (err) {
    console.error(err);
  }
};
```

### WEATHER

The `weather` query contains a `customerByEmail` field that accepts an `email` argument and returns the customer's current temperature.

```javascript
// queries/weather.queries.js

export const WEATHER = gql`
  query weather {
    customerByEmail(email: "john.doe@example.com") {
      weather {
        temp
      }
    }
  }
`
```

### If order information is given, show delivery information

```javascript
// pages/index.js

if (orders.delivery) {
  let delivery = orders.delivery;
  return (
    <div className="container">
      ***
    </div>
  );
}

if (!orders.customerByEmail)
  return (
    <div className="container">
      ***
    </div>
  );
```
