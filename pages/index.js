import Head from "next/head";
import React, { useState } from "react";
import { GraphQLClient, request } from "graphql-request";
import { useForm } from "react-hook-form";

import { WEATHER } from "../queries/weather.queries"
import { JOHN } from "../queries/john.queries"
import { CUSTOMERS } from "../queries/customers.queries"

import Footer from "../components/Footer"

const url = "https://demo.stepzen.net/api/meetup/__graphql"

function Home({ customers }) {
  const [orders, setOrders] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState(false);

  const { handleSubmit, register } = useForm();

  const onSubmit = handleSubmit(async ({ carrier, trackingId }) => {
    const graphQLClient = new GraphQLClient(url, {});
    try {
      const data = await graphQLClient.request(CUSTOMERS, { carrier, trackingId });
      console.log(data.delivery);
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  });

  const weatherSubmit = async () => {
    const graphQLClient = new GraphQLClient(url, {});
    try {
      const data = await graphQLClient.request(WEATHER);
      console.log(data.customerByEmail);
      setWeather(data);
      setTemp(temp => !temp);
    } catch (err) {
      console.error(err);
    }
  };

  if (orders.delivery) {
    let delivery = orders.delivery;
    return (
      <div className="container">
        <Head>
          <title>stepzen-next</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="StepZen demo with Next.js" />
        </Head>
        
        <h1>Welcome to Jamstack SF!</h1>
        {temp ? <p>{weather.customerByEmail.weather.temp} &#x2109;</p> :
        <button onClick={weatherSubmit} className="submit">
          Weather
        </button>}

        <div className="user">
          <h2>{customers.name}</h2>
          <div className="userCard">{customers.street}</div>
          <div className="userCard">{customers.stateProvince}</div>
        </div>

        <div className="delivery">
          <h3>Delivery Status:</h3>
          <p>{delivery.status}</p>
          <h3>Status Date:</h3>
          <p>{delivery.statusDate}</p>
        </div>

        <Footer />
      </div>
    );
  }
  if (!orders.customerByEmail)
    return (
      <div className="container">
        <Head>
          <title>stepzen-next</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="StepZen demo with Next.js" />
        </Head>

        <h1>Welcome to Jamstack SF!</h1>
        {temp ? <p>{weather.customerByEmail.weather.temp} &#x2109;</p> :
        <button onClick={weatherSubmit} className="submit">
          Weather
        </button>}

        <div className="user">
          <h2>{customers.name}</h2>
          <div className="userCard">{customers.street}</div>
          <div className="userCard">{customers.stateProvince}</div>
        </div>

        <div className="delivery">
          <p style={{marginBottom: '2px'}}>Hello {customers.name},</p>
          <p style={{margin: '2px 0 2em 0'}}>which package would you like the delivery status of?</p>
        </div>

        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="carrier" style={{marginRight: '1em'}}>
              Choose a carrier:
            </label>
            <select name="carrier" ref={register}>
              <option></option>
              <option value="fedex">Fedex</option>
            </select>
          </div>
          <br/>
          <div>
            <label htmlFor="trackingId" style={{marginRight: '1em'}}>
              Tracking ID:
            </label>
            <select name="trackingId" ref={register}>
              <option></option>
              <option value="395644759071">395644759071</option>
            </select>
          </div>
          <br/>
          <button type="submit" className="submit bottom">
            Submit
          </button>
        </form>

        <Footer />
      </div>
    );
}

export async function getStaticProps() {
  const res = await request(url, JOHN);
  const data = res.customerByEmail;
  return {
    props: { customers: data },
  };
}

export default Home;
