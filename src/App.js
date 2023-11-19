import Alert from "./components/Alert";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import Wordle from "./components/Wordle/Wordle";
import { useWordleContext } from "./context";

function App() {
  const { showInfoModal, userWon, showResultModal } = useWordleContext();
  const appOverlay = showInfoModal || showResultModal || userWon;
  return (
    <div className={`App ${appOverlay ? "overlay" : ""}`}>
      <Header />
      <main>
        <Alert />
        <Wordle />
        <Keyboard />
      </main>
    </div>
  );
}

export default App;
