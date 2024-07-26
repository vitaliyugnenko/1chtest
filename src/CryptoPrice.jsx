import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoPrice = () => {
  const symbol = "DAI"; // Жестко задаем символ для тестирования
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3000/crypto", {
          params: {
            symbol: symbol,
            convert: "USD",
          },
        });

        // Логирование для отладки
        console.log("API Response:", response.data);

        if (response.data.data && response.data.data[symbol]) {
          setPrice(response.data.data[symbol].quote.USD.price);
        } else {
          setError(`Symbol ${symbol} not found in response`);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{symbol} Price</h1>
      <p>${price ? price.toFixed(2) : "N/A"}</p>
    </div>
  );
};

export default CryptoPrice;
