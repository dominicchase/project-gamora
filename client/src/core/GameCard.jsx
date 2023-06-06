export const GameCard = ({ game, handleClick, lastGameRef, children }) => {
  return (
    <article className="game-card col-sm flex-grow-0 mb-4" ref={lastGameRef}>
      {/* {children} */}
      <img
        style={{ objectFit: "cover" }}
        onClick={() => handleClick(game)}
        className="game-card-img"
        src={game.image}
        width={300}
        height={450}
        alt=""
      />
    </article>
  );
};
