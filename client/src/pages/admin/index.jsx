import { useEffect, useState } from "react";

import { UploadForm } from "./UploadForm";

import { Modal } from "../../components/Modal";

import axios from "../../api/axios";
import { useGetGames } from "../catalog/useGetGames";

import "../../assets/css/admin.css";
import { useSetOverflow } from "../../hooks/useSetOverflow";

export const Admin = () => {
  const [show, toggleShow] = useState(false);
  const [game, setGame] = useState(undefined);

  const { games, resetGamesData } = useGetGames();

  useSetOverflow(show);

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
    <div className="mt-4 px-4">
      <div className="row justify-content-start">
        <div className="col-6 col-sm-4 col-md-3 mb-4" onClick={handleNewGame}>
          <button className="h1 new-game-btn m-0">+</button>
        </div>

        {games.map((game) => (
          <button
            className="col-6 col-sm-4 col-md-3 mb-4 bg-transparent border-0"
            onClick={() => handleEditGame(game)}
            key={game._id}
          >
            <img className="admin-game-img" src={game.image} width="100%" />
          </button>
        ))}
      </div>

      <Modal
        title={game ? "Edit" : "Create"}
        show={show}
        toggleShow={toggleShow}
      >
        <UploadForm
          toggleShow={toggleShow}
          resetGamesData={resetGamesData}
          game={game}
        />
      </Modal>
    </div>
  );
};

{
  /* <button className="edit-btn" onClick={() => handleEditGame(game)}>
              <EditIcon />
            </button>

            <button
              className="remove-btn"
              onClick={() => handleDeleteGame(game)}
            >
              <RemoveIcon />
            </button> */
}
