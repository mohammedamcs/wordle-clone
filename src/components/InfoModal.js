import { useWordleContext } from "../context";
import cross from "../assets/icons/cross.png";
function InfoModal() {
  const { toggleInfoModal } = useWordleContext();

  return (
    <div className="modal info-modal">
      <button onClick={toggleInfoModal}>
        <img src={cross} alt="cross-icon"/>
      </button>
      <div className="info-header">
        <h2>How To Play</h2>
        <p>Guess the Wordle in 6 tries</p>
        <ul>
          <li>Each guess must be a valid 5-letter word.</li>
          <li>
            The color of the tiles will change to show how close your guess was
            to the word.
          </li>
        </ul>
      </div>
      <div className="examples">
        <h3>Examples</h3>
        <div className="example">
          <div className="letters">
            <span className="letter correct">W</span>
            <span className="letter">E</span>
            <span className="letter">A</span>
            <span className="letter">R</span>
            <span className="letter">Y</span>
          </div>
          <p>
            <span>W</span> is in the word and in the correct spot.
          </p>
        </div>
        <div className="example">
          <div className="letters">
            <span className="letter">P</span>
            <span className="letter">I</span>
            <span className="letter exists">L</span>
            <span className="letter">L</span>
            <span className="letter">S</span>
          </div>
          <p>
            <span>I</span> is in the word but in the wrong spot.
          </p>
        </div>
        <div className="example">
          <div className="letters">
            <span className="letter">V</span>
            <span className="letter">A</span>
            <span className="letter">G</span>
            <span className="letter wrong">U</span>
            <span className="letter">E</span>
          </div>
          <p>
            <span>U</span> is not in the word in any spot.
          </p>
        </div>
      </div>
    </div>
  );
}
export default InfoModal;
