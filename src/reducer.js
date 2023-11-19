export const initialState = {
  prevGuesses: [], // hold previous guess of user to prevent using the same guess
  guesses: [], // each element is an array of guess letters and their status like: [[{letter:"a",status:'correct'}]]
  currentGuess: "", // current word entered by user
  showInfoModal: false,
  showResultModal: false,
  alertMsg: "",
  userWon: false,
  usedKeys: {},
};

export const ACTIONS = {
  TOGGLE_INFO_MODAL: "TOGGLE_INFO_MODAL",
  UPDATE_CURRENT_GUESS: "UPDATE_CURRENT_GUESS",
  TOGGLE_ALERT_MSG: "TOGGLE_ALERT_MSG",
  ADD_NEW_GUESS: "ADD_NEW_GUESS",
  RESET_CURRENT_GUESS: "RESET_CURRENT_GUESS", // this action will add currentGuess to prevGuesses and reset currentGuess
  DECLARE_USER_WINING: "DECLARE_USER_WINING",
  TOGGLE_RESULT_MODAL: "TOGGLE_RESULT_MODAL",
  RESET_TO_INITIAL_STATE: "RESET_TO_INITIAL_STATE",
  UPDATE_USED_KEYS: "UPDATE_USED_KEYS",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_CURRENT_GUESS:
      const { key } = action.payload;
      let newCurrentGuess;
      if (key === "Backspace") {
        newCurrentGuess = state.currentGuess.slice(0, -1);
      } else {
        newCurrentGuess = state.currentGuess + key;
      }

      return {
        ...state,
        currentGuess: newCurrentGuess,
      };

    case ACTIONS.TOGGLE_INFO_MODAL:
      return {
        ...state,
        showInfoModal: !state.showInfoModal,
      };
    case ACTIONS.TOGGLE_ALERT_MSG:
      const { msg } = action.payload;

      return {
        ...state,
        alertMsg: msg,
      };

    case ACTIONS.ADD_NEW_GUESS:
      const { comparedGuess: newGuess } = action.payload;
      return {
        ...state,
        guesses: [...state.guesses, newGuess],
      };

    case ACTIONS.RESET_CURRENT_GUESS:
      // Before resetting currentGuess added it to prev guesses
      const updatedPrevGuesses = [...state.prevGuesses, state.currentGuess];
      return {
        ...state,
        prevGuesses: updatedPrevGuesses,
        currentGuess: "",
      };

    case ACTIONS.DECLARE_USER_WINING:
      return {
        ...state,
        userWon: true,
      };
    case ACTIONS.TOGGLE_RESULT_MODAL:
      return {
        ...state,
        showResultModal: !state.showResultModal,
      };
    case ACTIONS.RESET_TO_INITIAL_STATE:
      return {
        ...initialState,
      };

    case ACTIONS.UPDATE_USED_KEYS:
      const { comparedGuess } = action.payload;
      const updatedUsedKeys = { ...state.usedKeys };
      comparedGuess.forEach(({ letter, status }) => {
        // when key is new, meaning was never used before
        if (!updatedUsedKeys[letter]) updatedUsedKeys[letter] = status;

        // when key was used before
        const prevKeyStatus = updatedUsedKeys[letter];
        if (prevKeyStatus !== status && status === "correct") {
          updatedUsedKeys[letter] = status;
        }
      });
      return {
        ...state,
        usedKeys: updatedUsedKeys,
      };
    default:
      return state;
  }
}

export default reducer;
