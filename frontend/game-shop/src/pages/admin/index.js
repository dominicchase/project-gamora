import React, { useState } from "react";

import { UploadForm } from "./components/UploadForm";
import { ReactComponent as EditIcon } from "../../public/svg/edit.svg";
import { ReactComponent as RemoveIcon } from "../../public/svg/remove.svg";

import { Modal } from "../../core/Modal";

import { useGetGames } from "../catalog/useGetGames";

import { deleteGame, getGameImage } from "../../api/admin/api";

import "../../public/css/admin.css";

export const Admin = () => {
  const [show, toggleShow] = useState(false);
  const [game, setGame] = useState(undefined);

  const { lastGameRef, games, resetGames } = useGetGames();

  const handleEditGame = (game) =>
    getGameImage(game._id).then((res) => {
      setGame({
        ...game,
        image: {
          data: game.image,
          file: new File([res], game.image.match(/[^\/]+$/)),
        },
      });

      toggleShow((prevState) => !prevState);
    });

  const handleNewGame = () => {
    setGame(undefined);
    toggleShow((prevState) => !prevState);
  };
  const handleDeleteGame = (id) =>
    deleteGame(id).then(() => console.log("delete"));

  if (!games || !games.length) {
    return <span>Game over!</span>;
  }

  return (
    <div>
      <div className="row justify-content-center">
        <article className="col-sm flex-grow-0 mb-4">
          <button className="add-game-btn" onClick={handleNewGame}>
            +
          </button>
        </article>

        {games.map((game, index) => (
          <article
            className="game-card col-sm flex-grow-0 mb-4"
            ref={index === games.length - 1 ? lastGameRef : null}
          >
            <button className="edit-btn" onClick={() => handleEditGame(game)}>
              <EditIcon />
            </button>

            <button
              className="remove-btn"
              onClick={() => handleDeleteGame(game._id)}
            >
              <RemoveIcon />
            </button>

            <img
              className="game-image"
              src={game.image}
              alt=""
              width={300}
              height={400}
            />
          </article>
        ))}
      </div>

      <Modal show={show} toggleShow={toggleShow}>
        <UploadForm
          toggleShow={toggleShow}
          // resetGames={resetGames}
          game={game}
        />
      </Modal>
    </div>
  );
};
