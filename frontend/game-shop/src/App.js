import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  const handleBuy = () => {
    console.log("add to cart");
  };

  if (!games) {
    return null;
  }

  return (
    <>
      {games.map((game) => (
        <article className="mb-5" key={`game-${game.name}`}>
          <span className="d-block mb-2">name: {game.name}</span>
          <span className="d-block mb-4">price: {game.price}</span>
          <button onClick={handleBuy}>Buy</button>
        </article>
      ))}
    </>
  );
};

export default App;
