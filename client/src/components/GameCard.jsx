export const GameCard = ({ game, handleClick, lastGameRef, children }) => {
  return (
    <article
      className="game-card col-6 col-sm-4 flex-grow-0 mb-4"
      ref={lastGameRef}
    >
      <img
        onClick={() => handleClick(game)}
        className="game-card-img"
        src={game.image}
        width="100%"
        // height={350}
      />
    </article>
  );
};
