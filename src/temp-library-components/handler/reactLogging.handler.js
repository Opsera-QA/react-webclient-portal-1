import ErrorParsingHelper from "@opsera/persephone/helpers/error/errorParsing.helper";

export const ReactLoggingHandler = {};
const LOG_ORIGIN_METADATA = false;

ReactLoggingHandler.logApiErrorMessage = (
  originComponentName,
  functionName,
  error,
  prependedMessage = "API Response Error:",
  defaultErrorMessage,
  ) => {
  return ReactLoggingHandler.logErrorMessage(
    originComponentName,
    functionName,
    prependedMessage,
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
  const originText = LOG_ORIGIN_METADATA === true ? `[${originComponentName}.${functionName}] ` : "";
  const parsedError = ErrorParsingHelper.parseAndSanitizeErrorMessage(error, defaultErrorMessage);
  const constructedError = `${originText}${prependedMessage}:\n ${parsedError}`;
  console.error(constructedError);

  return parsedError;
};

ReactLoggingHandler.logInfoMessage = (
  originComponentName,
  functionName,
  infoMessage,
) => {
  const originText = LOG_ORIGIN_METADATA === true ? `[${originComponentName}.${functionName}] ` : "";
  console.info(`${originText}${String(infoMessage)}`);
};

ReactLoggingHandler.logDebugMessage = (
  originComponentName,
  functionName,
  debugMessage,
) => {
  const originText = LOG_ORIGIN_METADATA === true ? `[${originComponentName}.${functionName}] ` : "";
  console.debug(`${originText}${String(debugMessage)}`);
};

ReactLoggingHandler.logWarningMessage = (
  originComponentName,
  functionName,
  warningMessage,
) => {
  const originText = LOG_ORIGIN_METADATA === true ? `[${originComponentName}.${functionName}] ` : "";
  console.debug(`${originText}${String(warningMessage)}`);
};