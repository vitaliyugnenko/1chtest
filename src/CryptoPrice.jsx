import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoPrice = ({ symbol }) => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
          {
            params: {
              symbol: symbol,
              convert: "USD",
            },
            headers: {
              "X-CMC_PRO_API_KEY": "48d81810-7c07-454d-a289-436eeb9e9743",
            },
          }
        );
        setPrice(response.data.data[symbol].quote.USD.price);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [symbol]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{symbol} Price</h1>
      <p>${price.toFixed(2)}</p>
    </div>
  );
};

export default CryptoPrice;
