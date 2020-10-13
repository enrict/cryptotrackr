import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Coin from "./Coin";

function App() {
  // variables
  const endpoint =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=20&page=1&sparkline=false";

  const [coins, setCoins] = useState([]);

  const [search, setSearch] = useState("");

  // effects
  useEffect(() => {
    setInterval(() => {
      axios
        .get(endpoint)
        .then((res) => {
          setCoins(res.data);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    }, 4000);
  }, []);

  // event handlers
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // filter search
  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <div className="coin__search">
        <h1 className="coin__text">
          <span className="red">C</span>rypto<span className="red">T</span>
          rackr+
        </h1>
        <form>
          <input
            type="text"
            placeholder="Search crypto..."
            className="coin__input"
            onChange={handleChange}
          />
        </form>
      </div>
      {filterCoins.map((coin) => (
        <Coin
          key={coin.id}
          name={coin.name}
          symbol={coin.symbol}
          price={coin.current_price}
          image={coin.image}
          marketCap={coin.market_cap}
          volume={coin.total_volume}
          priceChange={coin.price_change_percentage_24h}
        />
      ))}
    </div>
  );
}

export default App;
