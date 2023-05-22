import React, { useEffect, useState } from "react";
import "./admin.css";
import { UploadForm } from "./components/UploadForm";
import { Modal } from "../../core/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../catalog/api/GET.api";
import { setGames } from "../../reducers/games";
import { deleteGame } from "./api/POST.api";

export const Admin = () => {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.gamesState);

  const [show, toggleShow] = useState(false);

  useEffect(() => {
    getAndSetGames();
  }, []);

  const handleDeleteGame = (id) => deleteGame(id).then(() => getAndSetGames());

  const getAndSetGames = () =>
    getGames()
      .then((res) => res.json())
      .then((data) => dispatch(setGames(data)));

  if (!games || !games.length) {
    return <span>Game over!</span>;
  }

  return (
    <div>
      <div className="row justify-content-end">
        <article className="col-sm flex-grow-0 mb-4">
          <button
            className="add-game-btn"
            onClick={() => toggleShow((prevState) => !prevState)}
          >
            +
          </button>
        </article>
        {games.map((game) => (
          <article className="col-sm flex-grow-0 mb-4">
            <button
              className="remove-game-btn"
              onClick={() => handleDeleteGame(game._id)}
            >
              X
            </button>
            <img
              className="game-card admin-game-card"
              src={game.image}
              alt=""
              width={300}
              height={400}
            />
          </article>
        ))}
      </div>

      <Modal show={show} toggleShow={toggleShow}>
        <UploadForm toggleShow={toggleShow} getAndSetGames={getAndSetGames} />
      </Modal>
    </div>
  );
};
