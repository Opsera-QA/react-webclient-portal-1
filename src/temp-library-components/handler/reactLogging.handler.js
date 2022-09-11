import ErrorParsingHelper from "@opsera/persephone/helpers/error/errorParsing.helper";

export const ReactLoggingHandler = {};

ReactLoggingHandler.logApiErrorMessage = (
  originComponentName,
  functionName,
  error,
  defaultErrorMessage,
  ) => {
  return ReactLoggingHandler.logErrorMessage(
    originComponentName,
    functionName,
    "API Response Error:",
    error,
    defaultErrorMessage,
  );
};

ReactLoggingHandler.logErrorMessage = (
  originComponentName,
  functionName,
  prependedMessage,
  error,
  defaultErrorMessage
) => {
  const parsedError = ErrorParsingHelper.parseAndSanitizeErrorMessage(error, defaultErrorMessage);
  const constructedError = `[${originComponentName}.${functionName}] ${prependedMessage}:\n ${parsedError}`;
  console.error(constructedError);

  return parsedError;
};

ReactLoggingHandler.logInfoMessage = (
  originComponentName,
  functionName,
  infoMessage,
) => {
  console.info(`[${originComponentName}.${functionName}] ${String(infoMessage)}`);
};

ReactLoggingHandler.logDebugMessage = (
  originComponentName,
  functionName,
  debugMessage,
) => {
  console.debug(`[${originComponentName}.${functionName}] ${String(debugMessage)}`);
};

ReactLoggingHandler.logWarningMessage = (
  originComponentName,
  functionName,
  warningMessage,
) => {
  console.debug(`[${originComponentName}.${functionName}] ${String(warningMessage)}`);
};