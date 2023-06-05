import { useState } from "react";

import { UploadForm } from "./UploadForm";
import { ReactComponent as EditIcon } from "../../assets/svg/edit.svg";
import { ReactComponent as RemoveIcon } from "../../assets/svg/remove.svg";

import { Modal } from "../../core/Modal";

import axios from "../../api/axios";
import { useGetGames } from "../catalog/useGetGames";

import { GameCard } from "../../core/GameCard";

export const Admin = () => {
  const [show, toggleShow] = useState(false);
  const [game, setGame] = useState(undefined);

  const { lastGameRef, games, resetGamesData, handleDeleteGame } =
    useGetGames();

  const handleEditGame = async (game) => {
    const response = await axios.get(`/games/image/?id=${game._id}`, {
      withCredentials: true,
    });

    setGame({
      ...game,
      image: {
        data: game.image,
        file: new File([response], game.image.match(/[^/]+$/)),
      },
    });

    toggleShow((prevState) => !prevState);
  };

  const handleNewGame = () => {
    setGame(undefined);
    toggleShow((prevState) => !prevState);
  };

  return (
    <>
      <div className="row justify-content-center">
        <article className="col-sm flex-grow-0 mb-4">
          <button className="add-game-btn" onClick={handleNewGame}>
            +
          </button>
        </article>

        {/* {games.map((game) => (
          <>
            <button
              // className="edit-btn"
              onClick={() => handleEditGame(game)}
            >
              <EditIcon />
            </button>

            <button
              // className="remove-btn"
              onClick={() => handleDeleteGame(game)}
            >
              <RemoveIcon />
            </button>

            <GameCard
              game={game}
              lastGameRef={lastGameRef}
              key={`game-${game._id}`}
            />
          </>
        ))} */}
      </div>

      <Modal show={show} toggleShow={toggleShow}>
        <UploadForm
          toggleShow={toggleShow}
          resetGamesData={resetGamesData}
          game={game}
        />
      </Modal>
    </>
  );
};
