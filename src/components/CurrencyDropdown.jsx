import { useEffect, useState } from "react";
import axios from "axios";
import CurrencyConverter from "./CurrencyConverter";
import "./CurrencyStyling.css";

function CurrencyDropdown() {
  const [currencies, setCurrencies] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [defaultValueSelectOne, setDefaultValueSelectOne] = useState("Euro");
  const [defaultValueSelectTwo, setDefaultValueSelectTwo] = useState(
    "United States Dollar"
  );

  useEffect(() => {
    axios
      .get("https://v6.exchangerate-api.com/v6/YOUR-API-KEY/codes")
      .then((res) => {
        setCurrencies(res.data.supported_codes);
      });
  }, []);

  const handleSelectOneValue = (event) => {
    setDefaultValueSelectOne(event.target.value);
  };

  const handleSelectTwoValue = (event) => {
    setDefaultValueSelectTwo(event.target.value);
  };

  return (
    <>
      <div className="container">
        <select
          value={defaultValueSelectOne}
          onChange={handleSelectOneValue}
          className="from-select"
        >
          {currencies &&
            currencies.map((cur) => (
              <option
                key={cur[0]}
                onClick={() => {
                  setFromCurrency(cur[0]);
                }}
              >
                {cur[1]}
              </option>
            ))}
        </select>

        <select
          value={defaultValueSelectTwo}
          onChange={handleSelectTwoValue}
          className="to-select"
        >
          {currencies &&
            currencies.map((cur) => (
              <option
                key={cur[0]}
                onClick={() => {
                  setToCurrency(cur[0]);
                }}
              >
                {cur[1]}
              </option>
            ))}
        </select>
      </div>
      <CurrencyConverter fromCurrency={fromCurrency} toCurrency={toCurrency} />
    </>
  );
}
export default CurrencyDropdown;
