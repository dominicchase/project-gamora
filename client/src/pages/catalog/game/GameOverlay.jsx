import { useEffect } from "react";
import { useSelector } from "react-redux";

import { GameInfo } from "./GameInfo";
import "../../../assets/css/Game.css";

export const GameOverlay = ({ showGame, toggleShowGame }) => {
  const { game } = useSelector((state) => state.gameState);

  useEffect(() => {
    if (showGame) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showGame]);

  const MobileGameInfo = () => {
    return (
      <div className="d-lg-none py-4">
        <img className="mobile-game d-block mx-auto col-9" src={game.image} />

        <div className="mobile-game-info mx-auto col-9 p-4">
          <GameInfo toggleShowGame={toggleShowGame} />
        </div>
      </div>
    );
  };

  return (
    <div className="game-overlay">
      <MobileGameInfo />

      <div className="d-none d-lg-flex justify-content-center py-5">
        <img className="game col-5" src={game.image} />

        <div className="game-info col-5 p-4">
          <GameInfo toggleShowGame={toggleShowGame} />
        </div>
      </div>
    </div>
  );
};
