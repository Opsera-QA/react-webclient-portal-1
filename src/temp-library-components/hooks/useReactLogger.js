import {ReactLoggingHandler} from "temp-library-components/handler/reactLogging.handler";
const isProductionEnvironment = String(process.env.REACT_APP_ENVIRONMENT) !== "development" && String(process.env.REACT_APP_ENVIRONMENT) !== "test";

export default function useReactLogger() {
  const reactLogger = {};

  reactLogger.logApiErrorMessage = (
    originComponentName,
    functionName,
    error,
    prependedMessage = "API Response Error:",
    defaultErrorMessage,
  ) => {
    return reactLogger.logErrorMessage(
      originComponentName,
      functionName,
      prependedMessage,
      error,
      defaultErrorMessage,
    );
  };

  reactLogger.logErrorMessage = (
    originComponentName,
    functionName,
    prependedMessage,
    error,
    defaultErrorMessage
  ) => {
    return ReactLoggingHandler.logErrorMessage(
      originComponentName,
      functionName,
      prependedMessage,
      error,
      defaultErrorMessage
    );
  };

  reactLogger.logInfoMessage = (
    originComponentName,
    functionName,
    infoMessage,
  ) => {
    return ReactLoggingHandler.logInfoMessage(
      originComponentName,
      functionName,
      infoMessage,
    );
  };

  reactLogger.logDebugMessage = (
    originComponentName,
    functionName,
    debugMessage,
  ) => {
    if (isProductionEnvironment) {
      return;
    }

    return ReactLoggingHandler.logDebugMessage(
      originComponentName,
      functionName,
      debugMessage,
    );
  };

  reactLogger.logWarningMessage = (
    originComponentName,
    functionName,
    warningMessage,
  ) => {
    return ReactLoggingHandler.logWarningMessage(
      originComponentName,
      functionName,
      warningMessage,
    );
  };

  return reactLogger;
}