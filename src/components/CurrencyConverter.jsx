import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./CurrencyStyling.css";

function CurrencyConverter({ fromCurrency, toCurrency }) {
  const [amount, setAmount] = useState("");
  const [output, setOutput] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/${fromCurrency}/${toCurrency}/${+amount}`
      )
      .then((res) => {
        setOutput(res.data.conversion_result);
      });
  }, [fromCurrency, toCurrency, amount]);

  const handleAmountChange = (event) => {
    const value = event.target.value.replace(/[^\d.]|\.(?=.*\.)/g, "");
    setAmount(value);
  };

  return (
    <>
      <div className="container">
        <div className="converter">
          <input
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            className="converter-input"
          ></input>
          <span>{fromCurrency}</span>
        </div>

        <div className="converter">
          <input
            value={amount === "" ? "0" : output.toFixed(2)}
            className="converter-input disabled-input"
            disabled
          ></input>
          <span>{toCurrency}</span>
        </div>
      </div>

      <div className="result-container">
        <p>
          {amount === "" ? "0" : amount} {fromCurrency}
          <span className="result-arrow">&rarr;</span>
          {amount === "" ? "0" : output.toFixed(2)} {toCurrency}
        </p>
      </div>
    </>
  );
}
CurrencyConverter.propTypes = {
  fromCurrency: PropTypes.string,
  toCurrency: PropTypes.string,
};
export default CurrencyConverter;
