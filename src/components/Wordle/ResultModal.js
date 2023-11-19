import { useWordleContext } from "../../context";
import gameOver from "../../assets/images/game-over.png";
import winner from "../../assets/images/winner.png";
import cross from "../../assets/icons/cross.png";
function ResultModal() {
  const { userWon, wordle, prevGuesses, resetWordle } = useWordleContext();
  const userTries = prevGuesses.length;
  return (
    <div className="modal result-modal">
      <button onClick={resetWordle}>
        <img src={cross} alt="cross-icon" />
      </button>
      {userWon ? (
        <UserWonMsg  wordle={wordle} userTries={userTries} />
      ) : (
        <UserLostMsg wordle={wordle} userTries={userTries} />
      )}
    </div>
  );
}

const UserWonMsg = ({ wordle, userTries }) => {
  return (
    <>
      <img src={winner} alt="winner" />
      <h3 style={{ color: "green" }}>{wordle.toUpperCase()}</h3>
      <p>
        You guessed our wordle in {userTries}{" "}
        {userTries === 1 ? "try" : "tries"}, well done!
      </p>
      <p>Close modal to play another wordle!</p>
    </>
  );
};

const UserLostMsg = ({ wordle, userTries }) => {
  return (
    <>
      <img src={gameOver} alt="loser" />
      <h3 style={{ color: "red" }}>{wordle.toUpperCase()}</h3>
      <p>
        You couldn't guess our wordle in {userTries}{" "}
        {userTries === 1 ? "try" : "tries"}, may be next time.
      </p>
      <p>Close modal to play another wordle!</p>
    </>
  );
};
export default ResultModal;
