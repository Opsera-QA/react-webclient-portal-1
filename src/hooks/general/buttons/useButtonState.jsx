import React, {useState} from 'react';

export const BUTTON_STATES = {
  READY: "ready",
  BUSY: "busy",
  SUCCESS: "success",
  ERROR: "error",
};
export default function useButtonState() {
  const [buttonState, setButtonState] = useState(BUTTON_STATES.READY);
  const buttonStateFunctions = {};

  buttonStateFunctions.setReadyState = () => setButtonState(BUTTON_STATES.READY);
  buttonStateFunctions.setBusyState = () => setButtonState(BUTTON_STATES.BUSY);
  buttonStateFunctions.setErrorState = () => setButtonState(BUTTON_STATES.ERROR);
  buttonStateFunctions.setSuccessState = () => setButtonState(BUTTON_STATES.SUCCESS);

  return ({
    buttonState: buttonState,
    buttonStateFunctions: buttonStateFunctions,
  });
}