export const GameCard = ({ game, handleClick, lastGameRef }) => {
  return (
    <article
      className="col-sm flex-grow-0 mb-4"
      onClick={() => handleClick(game)}
      ref={lastGameRef}
    >
      <img
        className="game-card"
        src={game.image}
        width={300}
        height={400}
        alt=""
      />
    </article>
  );
};
