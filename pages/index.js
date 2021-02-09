import React, { useState } from "react";
import { GraphQLClient, request } from "graphql-request";
import { useForm } from "react-hook-form";
import {WEATHER} from "../queries/weather.queries"
import {JOHN} from "../queries/john.queries"
import {CUSTOMERS} from "../queries/customers.queries"

function Home({ customers }) {
  const [showOrders, setShowOrders] = useState("");
  const [orders, setOrders] = useState(false);
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = handleSubmit(async ({ carrier, trackingId }) => {
    const endpoint = "https://anant.stepzen.net/api/meetup2/__graphql";
    const graphQLClient = new GraphQLClient(endpoint, {});
    if (showOrders.delivery) {
      setOrders(orders => !orders);
    }
    if (errorMessage) setErrorMessage("");
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
    const endpoint = "https://anant.stepzen.net/api/meetup2/__graphql";
    const graphQLClient = new GraphQLClient(endpoint, {});
    if (errorMessage) setErrorMessage("");
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

  if (showOrders.customerByEmail) {
    console.log(showOrders.customerByEmail.name);
  }

  if (showOrders.delivery) {
    let delivery = showOrders.delivery;
    console.log(delivery)
    return (
      <div className="container">
      <h1>Welcome to Jamstack SF!</h1>
        {temp ?
        <h2 className="weather">{weather.customerByEmail.weather.temp} &#x2109;</h2>
        :
        <button onClick={weatherSubmit} className="weather">Weather</button>
        }
        <div className="user">
            <h2>{customers.name}</h2>
            <h4>{customers.street}</h4>
            <h4>{customers.stateProvince}</h4>
            <h4>{customers.postalCode}</h4>
        </div>
            <h3>Delivery Status:</h3>
            <p>{delivery.status}</p>
            <h3>Delivery Status Date:</h3>
            <p>{delivery.statusDate}</p>
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
  if (!showOrders.customerByEmail)
    return (
      <div className="container">
      <h1>Welcome to Jamstack SF!</h1>
        {temp ?
        <h2 className="weather">{weather.customerByEmail.weather.temp} &#x2109;</h2>
        :
        <button onClick={weatherSubmit} className="weather submit">Weather</button>
        }
        <div className="user">
        <h2>{customers.name}</h2>
        <h4>{customers.street}</h4>
        <h4>{customers.stateProvince}</h4>
        <h4>{customers.postalCode}</h4>
        </div>
        <p>Sorry {customers.name}, we could not retrieve your delivery status. Can you
        provide us your carrier and trackerId below?</p>
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
            {errors.task && <span role="alert">{errors.task.message}</span>}
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
    );
}

export async function getStaticProps() {
  const res = await request(
    "https://anant.stepzen.net/api/meetup2/__graphql",
    JOHN
  );
  const data = res.customerByEmail;
  console.log(data);
  return {
    props: { customers: data },
  };
}

export default Home;
