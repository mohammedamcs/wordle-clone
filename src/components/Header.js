import infoIcon from "../assets/icons/question-mark-icon.png";
import { useWordleContext } from "../context";
import InfoModal from "./InfoModal";

function Header() {
  const {toggleInfoModal,showInfoModal} = useWordleContext();
  return (
    <header>
      {showInfoModal && <InfoModal />}
      <div className="empty"></div>
      <div className="title">
        <h1>Wordle</h1>
      </div>
      <div className="info">
        <button onClick={toggleInfoModal}>
          <img src={infoIcon} alt="info icon" />
        </button>
      </div>
    </header>
  );
}
export default Header;
