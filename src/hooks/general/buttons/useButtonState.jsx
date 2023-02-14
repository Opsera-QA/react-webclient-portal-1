import React from 'react';
import useApiState from "hooks/general/api/useApiState";

export const BUTTON_STATES = {
  READY: "ready",
  BUSY: "busy",
  SUCCESS: "success",
  ERROR: "error",
};
export default function useButtonState() {
  const {
    apiState,
    apiStateFunctions,
  } = useApiState();

  return ({
    buttonState: apiState,
    buttonStateFunctions: apiStateFunctions,
  });
}