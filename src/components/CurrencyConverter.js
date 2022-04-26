import { useState } from "react";
import axios from "axios";
import { NEWS_API_KEY } from "../config";

// components
import ExchangeRate from "./ExchangeRate";

export default function CurrencyConverter() {
  const currencies = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA", "CNY"];
  const [primaryCurrency, setPrimaryCurrency] = useState("USD");
  const [secondaryCurrency, setSecondaryCurrency] = useState("CNY");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);

  const options = {
    url: "https://alpha-vantage.p.rapidapi.com/query",
    headers: {
      "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      "x-rapidapi-key": NEWS_API_KEY,
    },
    params: {
      from_currency: primaryCurrency,
      function: "CURRENCY_EXCHANGE_RATE",
      to_currency: secondaryCurrency,
    },
  };

  function convert() {
    const getData = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setExchangeRate(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] *
            amount
        );
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }

  return (
    <div className="currency-converter">
      <h2>CurrencyConverter</h2>
      <div className="primary">
        <p>Primary Currency:</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={primaryCurrency}
          onChange={(e) => setPrimaryCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="secondary">
        <p>Secondary Currency:</p>
        <input type="number" value={exchangeRate} disabled />
        <select
          value={secondaryCurrency}
          onChange={(e) => setSecondaryCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button onClick={convert}>Convert</button>
      <ExchangeRate
        primary={primaryCurrency}
        secondary={secondaryCurrency}
        exchange={exchangeRate}
      />
    </div>
  );
}
