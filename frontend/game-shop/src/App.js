import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [games, setGames] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  const handleBuy = (id) => {
    console.log(id);
    console.log("add to cart");
    fetch(`http://localhost:3001/api/cart/add-to-cart/?userId=${userId}`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDY0MTFhMGM5MzEyYTYxMjdkYjA3NjkiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODQzODcyODAsImV4cCI6MTY4NDQ3MzY4MH0.oGbVKLLvt-3zq1yaMaIza7kZ3QVFh3MGtW_Gd8C-S7E",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }).then(() =>
      fetch(`http://localhost:3001/api/cart/?userId=${userId}`, {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDY0MTFhMGM5MzEyYTYxMjdkYjA3NjkiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODQzODcyODAsImV4cCI6MTY4NDQ3MzY4MH0.oGbVKLLvt-3zq1yaMaIza7kZ3QVFh3MGtW_Gd8C-S7E",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setCart(data))
    );
  };

  if (!games) {
    return null;
  }

  const userId = "646411a0c9312a6127db0769";

  return (
    <>
      {games.map((game) => (
        <article className="mb-5" key={`game-${game.name}`}>
          <span className="d-block mb-2">name: {game.name}</span>
          <span className="d-block mb-4">price: {game.price}</span>
          <button onClick={() => handleBuy([game._id])}>Buy</button>
        </article>
      ))}

      {!!cart.games?.length &&
        cart.games.map((game) => (
          <article>
            <span>{game.name}</span>
          </article>
        ))}
    </>
  );
};

export default App;
