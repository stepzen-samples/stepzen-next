import React, { useState } from "react";
import { GraphQLClient, request } from "graphql-request";
import { useForm } from "react-hook-form";
import {WEATHER} from "../queries/weather.queries"
import {JOHN} from "../queries/john.queries"
import {CUSTOMERS} from "../queries/customers.queries"

function Home({ customers }) {
  const [orders, setOrders] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState(false);

  const { handleSubmit, register } = useForm();

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

  if (orders.delivery) {
    let delivery = orders.delivery;
    return (
      <div className="container">
        <h1>Welcome to Jamstack SF!</h1>
        {temp ? <p>{weather.customerByEmail.weather.temp} &#x2109;</p> :
        <button onClick={weatherSubmit} className="weather submit">
          Weather
        </button>}

        <div className="user">
          <h2>{customers.name}</h2>
          <h4>{customers.street}</h4>
          <h4>{customers.stateProvince}</h4>
        </div>
        <div className="delivery">
          <h3>Delivery Status:</h3>
          <p>{delivery.status}</p>
          <h3>Status Date:</h3>
          <p>{delivery.statusDate}</p>
        </div>

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
    );
  }
  if (!orders.customerByEmail)
    return (
      <div className="container">
        <h1>Welcome to Jamstack SF!</h1>
        {temp ? <p>{weather.customerByEmail.weather.temp} &#x2109;</p> :
        <button onClick={weatherSubmit} className="weather submit">
          Weather
        </button>}

        <div className="user">
          <h2>{customers.name}</h2>
          <h4>{customers.street}</h4>
          <h4>{customers.stateProvince}</h4>
        </div>

        <h2>Sorry {customers.name}, we could not retrieve your delivery status.</h2>
        <h3>Can you provide us your carrier and trackerId below?</h3>

        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="cars">
              Choose a carrier:
            </label>
            <select name="carrier" ref={register}>
              <option></option>
              <option value="fedex">Fedex</option>
            </select>
          </div>

          <div>
            <label htmlFor="trackingId">
              Tracking ID:
            </label>
            <select name="trackingId" ref={register}>
              <option></option>
              <option value="395644759071">395644759071</option>
            </select>
          </div>

          <button type="submit" className="submit">
            Submit
          </button>
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
    );
}

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

export default Home;