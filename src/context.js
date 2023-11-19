import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
  useRef,
} from "react";
import reducer, { ACTIONS, initialState } from "./reducer";
import { compareToWordle } from "./helpers";
import words from "./words";

const WordleContext = createContext(null);

export const WordleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [wordle, setWordle] = useState("limit");
  const wordleFetched = useRef(false);

  const toggleInfoModal = () => {
    dispatch({ type: ACTIONS.TOGGLE_INFO_MODAL });
  };

  const toggleResultModal = () => {
    dispatch({ type: ACTIONS.TOGGLE_RESULT_MODAL });
  };

  const toggleAlertMsg = useCallback((msg = "") => {
    dispatch({ type: ACTIONS.TOGGLE_ALERT_MSG, payload: { msg } });
  }, []);

  const resetWordle = () => {
    dispatch({ type: ACTIONS.RESET_TO_INITIAL_STATE });
    wordleFetched.current = false;
  };

  // Effect to fetch random english word of length 5
  useEffect(() => {
    if (wordleFetched.current) return;
    const fetchWordle = async () => {
      try {
        const res = await fetch(
          "https://random-word-api.herokuapp.com/word?length=5"
        );
        const [word] = await res.json();
        setWordle(word);
      } catch (error) {
        // when there is an error just use a random word form words!
        setWordle(words[Math.floor(Math.random() * words.length)]);
      }
    };
    fetchWordle();
    wordleFetched.current = true;
  }, [wordleFetched.current]);

  // Effect to handle user input
  useEffect(() => {
    const handleUserInput = ({ key }) => {
      // when key is Enter
      if (key === "Enter") {
        // Each guess must be of length 5
        if (state.currentGuess.length !== 5) {
          toggleAlertMsg("Each guess must be of length 5");
          return;
        }

        // repetition are not allowed
        if (state.prevGuesses.includes(state.currentGuess)) {
          toggleAlertMsg(`You already guessed ${state.currentGuess} before!`);
          return;
        }

        // Check if user won
        if (state.currentGuess === wordle) {
          dispatch({ type: ACTIONS.DECLARE_USER_WINING });
        }

        // Compare currentGuess entered by user against wordle and return each letter with it's status
        const comparedGuess = compareToWordle(state.currentGuess, wordle);
        // Add comparedGuess to guesses
        dispatch({ type: ACTIONS.ADD_NEW_GUESS, payload: { comparedGuess } });
        // update usedKeys to guesses
        dispatch({
          type: ACTIONS.UPDATE_USED_KEYS,
          payload: { comparedGuess },
        });
        // Reset currentGuess
        dispatch({ type: ACTIONS.RESET_CURRENT_GUESS });

        // only 6 guesses are allowed, user lost.
        if (state.guesses.length >= 5) {
          return;
        }
      }

      // when key is Backspace
      if (key === "Backspace") {
        // Update current guess by subtracting last letter if key === backspace
        dispatch({
          type: ACTIONS.UPDATE_CURRENT_GUESS,
          payload: { key },
        });
      }
      // when key is a letter
      if (/^[a-zA-Z]$/.test(key)) {
        if (state.currentGuess.length < 5) {
          // Update current guess by adding the entered letter key
          dispatch({
            type: ACTIONS.UPDATE_CURRENT_GUESS,
            payload: { key },
          });
        }
      }
    };
    // listener for user input
    document.addEventListener("keydown", handleUserInput);
    let timeOutId;
    // check if user won or lost
    if (state.userWon || state.guesses.length > 5) {
      document.removeEventListener("keydown", handleUserInput);
      timeOutId = setTimeout(toggleResultModal, 500);
    }

    return () => {
      document.removeEventListener("keydown", handleUserInput);
      clearTimeout(timeOutId);
    };
  }, [
    state.currentGuess,
    state.guesses,
    state.prevGuesses,
    state.userWon,
    toggleAlertMsg,
    wordle,
  ]);

  // Effect to remove error alert messages after 2s
  useEffect(() => {
    const timeOutId = setTimeout(toggleAlertMsg, 2000);
    return () => clearTimeout(timeOutId);
  }, [state.alertMsg, toggleAlertMsg]);
  return (
    <WordleContext.Provider
      value={{
        ...state,
        wordle,
        toggleAlertMsg,
        toggleInfoModal,
        toggleResultModal,
        resetWordle,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};

export const useWordleContext = () => useContext(WordleContext);
