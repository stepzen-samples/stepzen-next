import Head from "next/head";
import React, { useState, useEffect } from "react";
import { GraphQLClient, gql, request } from "graphql-request";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import Orders from "./orders";

//request query
const JOHN = `query customer {  
  customerByEmail(email: "john.doe@example.com") {
		name 
    email
    street
    postalCode
    stateProvince
  }
}`;

// posts will be populated at build time by getStaticProps()
function Home({ customers }) {
  const [showOrders, setShowOrders] = useState("");
  const [orders, setOrders] = useState(false);
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = handleSubmit(async ({ carrier, trackingId }) => {
    const endpoint = "https://anant.stepzen.net/api/meetup/__graphql";
    const graphQLClient = new GraphQLClient(endpoint, {});
    if (showOrders.delivery) {
      setOrders(orders => !orders);
    }
    if (errorMessage) setErrorMessage("");
    const CUSTOMERS = gql`
      query customer($carrier: String!, $trackingId: String!) {
        delivery(carrier: $carrier, trackingId: $trackingId) {
          status
          statusDate
        }
      }
    `;
    try {
      const data = await graphQLClient.request(CUSTOMERS, { carrier, trackingId });
      console.log(data);
      setShowOrders(data);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  const weatherSubmit = async () => {
    console.log(temp)
    const endpoint = "https://anant.stepzen.net/api/meetup/__graphql";
    const graphQLClient = new GraphQLClient(endpoint, {});
    if (errorMessage) setErrorMessage("");
    const WEATHER = gql`
      query weather {
        customerByEmail(email: "john.doe@example.com") {
          weather {
            temp
          }
        }
      }
    `;
    try {
      const data = await graphQLClient.request(WEATHER);
      console.log(data);
      setWeather(data);
      setTemp(temp => !temp);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  console.log("static");
  console.log(customers);
  console.log("static");

  console.log("weather");
  console.log(weather);
  console.log(temp);
  console.log("weather");

  console.log("dynamic");
  if (showOrders.customerByEmail) {
    console.log(showOrders.customerByEmail.name);
  }
  console.log("dynamic");

  /* 
    Could not get useSWR to sync with the graphQLClient in the onSubmit function
  */

  // const { data, error } = useSWR(CUSTOMERS, (query) =>
  //   request(API_ENDPOINT, query)
  // );
  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>
  console.log("orders");
  console.log(orders);
  console.log("orders");
  if (showOrders.delivery) {
    let delivery = showOrders.delivery;
    console.log(delivery)
    return (
      <>
        {temp ?
        <h1 className="weather">{weather.customerByEmail.weather.temp}</h1>
        :
        <button onClick={weatherSubmit} className="weather">Weather</button>
        }
        <div className="user">
            <h1>{customers.name}</h1>
            <h4>{customers.street}</h4>
            <h4>{customers.stateProvince}</h4>
            <h4>{customers.postalCode}</h4>
        </div>
        <div className="container">
            <h3>Delivery Status: {delivery.status}</h3>
            <h3>Delivery Status Date: {delivery.statusDate}</h3>
        </div>        
    </>
    );
  }
  if (!showOrders.customerByEmail)
    return (
      <>
        {temp ?
        <h1 className="weather">{weather.customerByEmail.weather.temp} &#x2109;</h1>
        :
        <button onClick={weatherSubmit} className="weather submit">Weather</button>
        }
        <div className="user">
        <h1>{customers.name}</h1>
        <h4>{customers.street}</h4>
        <h4>{customers.stateProvince}</h4>
        <h4>{customers.postalCode}</h4>
        </div>
      <div className="container">
        <Head>
          <title>stepzen-next</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        Sorry {customers.name}, we could not retrieve your delivery status. Can you
        provide us your carrier and trackerId below?
        <form onSubmit={onSubmit}>
          <div className="input-area">
          <label for="cars">Choose a carrier:</label>
          <select name="carrier" ref={register}>
            <option></option>
            <option value="fedex">Fedex</option>
            <option value="ups">UPS</option>
          </select>
          <label for="trackingId">Tracking ID:</label>
          <select name="trackingId" ref={register}>
            <option></option>
            <option value="395644759071">395644759071</option>
            <option value="1Z6A0W651201777672">1Z6A0W651201777672</option>
          </select>
            {/* <label>Carrier</label>
            <input
              type="text"
              name="carrier"
              className="mb2"
              // value={initialValues.to}
              ref={register({ required: "Carrier is required" })}
              placeholder="fedex"
            /> */}
            {errors.task && <span role="alert">{errors.task.message}</span>}
          {/* </div>
          <div className="input-area">
            <label>Tracking</label>
            <input
              type="text"
              name="trackingId"
              className="mb2"
              // value={initialValues.to}
              ref={register({ required: "Tracking is required" })}
              placeholder="123134234232"
            /> */}
            {errors.task && <span role="alert">{errors.task.message}</span>}
          </div>
          <div>
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
        </form>
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
      </>
    );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // const variables = { // Line 2
  //   email: "john.doe@example.com",
  //   };

  const res = await request(
    "https://anant.stepzen.net/api/meetup/__graphql",
    JOHN
  );
  const data = res.customerByEmail;
  console.log(data);
  return {
    props: { customers: data },
  };
}

export default Home;
