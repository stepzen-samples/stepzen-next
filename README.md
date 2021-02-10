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

### JOHN

```javascript
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

### CUSTOMERS

```javascript
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

### WEATHER

```javascript
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
