import React, {useState} from 'react';

export const API_STATES = {
  READY: "ready",
  BUSY: "busy",
  SUCCESS: "success",
  ERROR: "error",
};
export default function useApiState() {
  const [apiState, setApiState] = useState(API_STATES.READY);
  const apiStateFunctions = {};

  apiStateFunctions.setReadyState = () => setApiState(API_STATES.READY);
  apiStateFunctions.setBusyState = () => setApiState(API_STATES.BUSY);
  apiStateFunctions.setErrorState = () => setApiState(API_STATES.ERROR);
  apiStateFunctions.setSuccessState = () => setApiState(API_STATES.SUCCESS);

  return ({
    apiState: apiState,
    apiStateFunctions: apiStateFunctions,
  });
}