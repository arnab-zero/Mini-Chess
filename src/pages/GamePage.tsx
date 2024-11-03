import GameBoard from "../components/GameBoard";

const GamePage = () => {
  return (
    <div className="mx-[2%] mt-5">
      <div>Game</div>
      <div className="mt-4">
        <GameBoard />
      </div>
    </div>
  );
};

export default GamePage;
