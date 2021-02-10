This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Run the development server

```bash
yarn dev
```

### _app.js

```javascript
import "../App.css"

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

### getStaticProps

```javascript
export async function getStaticProps() {
  const res = await request(
    "https://anant.stepzen.net/api/meetup/__graphql",
    JOHN
  );
  const data = res.customerByEmail;
  return {
    props: { customers: data },
  };
}
```

### Initialize State and Form Handlers

```javascript
function Home({ customers }) {
  const [orders, setOrders] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState(false);
  const { handleSubmit, register } = useForm();
```

### onSubmit

```javascript
const onSubmit = handleSubmit(async ({ carrier, trackingId }) => {
  const graphQLClient = new GraphQLClient("https://anant.stepzen.net/api/meetup/__graphql", {});
  try {
    const data = await graphQLClient.request(CUSTOMERS, { carrier, trackingId });
    console.log(data);
    setOrders(data);
  } catch (err) {
    console.error(err);
  }
});
```

### weatherSubmit

```javascript
const weatherSubmit = async () => {
  const graphQLClient = new GraphQLClient("https://anant.stepzen.net/api/meetup/__graphql", {});
  try {
    const data = await graphQLClient.request(WEATHER);
    console.log(data);
    setWeather(data);
    setTemp(temp => !temp);
  } catch (err) {
    console.error(err);
  }
};
```

### If order information is given, show delivery information

```javascript
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
