import { useWordleContext } from "../../context";
import ResultModal from "./ResultModal";
import UserGuess from "./UserGuess";

function Wordle() {
  const { guesses, currentGuess,showResultModal } = useWordleContext();
  return (
    <>
      {showResultModal && <ResultModal />}
      <div className="wordle">
        {[...guesses, ...new Array(6 - guesses.length)].map((guess, i) => {
          if(guesses.length === i)return <UserGuess key={i} guess={currentGuess}/>
          return <UserGuess key={i} guess={guess}/>
        })}
      </div>
    </>
  );
}
export default Wordle;
