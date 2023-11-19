function UserGuess({ guess }) {
  // When the guess is undefined
  if (!guess) {
    return (
      <div className="guess">
        {[...new Array(5)].map((_, i) => {
          return <span className="letter" key={i}></span>;
        })}
      </div>
    );
  }

  // When the guess is the currentGuess entered by user
  if (typeof guess[0] === "string") {
    return (
      <div className="guess">
        {[...guess, ...new Array(5 - guess.length)].map((elm, i) => {
          return (
            <span className="letter" key={i}>
              {elm}
            </span>
          );
        })}
      </div>
    );
  }
  // When guess is from previous compared guesses which is an array of guess letters and their status like: [[{letter:"a",status:'correct'}]]
  return (
    <div className="guess">
      {guess.map((elm, i) => {
        return (
          <span className={`letter ${elm.status}`} key={i}>
            {elm.letter}
          </span>
        );
      })}
    </div>
  );
}
export default UserGuess;
