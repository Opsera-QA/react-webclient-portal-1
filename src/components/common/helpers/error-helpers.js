import {capitalizeFirstLetter, hasStringValue} from "components/common/helpers/string-helpers";

export const errorHelpers = {};

// TODO: Handle better when error handling standards are in place
//  Technically errors should be stored in error?.response?.data coming from Node (new standards) or error?.response?.data?.message
export function parseError(error) {
  if (!error || error.length === 0) {
    return "Unknown error reported.";
  }
  console.error(error); //log all errors to console

  if (hasStringValue(error) === true) {
    return error;
  }

  if (typeof error === "object") {
    const responseData = error?.response?.data;

    if (hasStringValue(responseData) === true) {
      return responseData;
    }

    const responseDataMessage = error?.response?.data?.message;

    if (hasStringValue(responseDataMessage) === true) {
      return responseDataMessage;
    }

    const innerError = error?.error;

    if (innerError) {
      if (hasStringValue(innerError) === true) {
        return innerError;
      }

      if (typeof innerError === "object") {
        const innerResponseData = innerError?.response?.data;

        if (hasStringValue(innerResponseData) === true) {
          return innerResponseData;
        }

        if (typeof innerResponseData === "object") {
          const innerResponseDataMessage = innerResponseData?.message;

          if (hasStringValue(innerResponseDataMessage) === true) {
            return innerResponseDataMessage;
          }
        }

        const innerErrorMessage = innerError?.message;
        if (hasStringValue(innerErrorMessage) === true) {
          return innerErrorMessage;
        }
      }
    }

    const errorMessage = error?.message;

    if (hasStringValue(errorMessage) === true) {
      return errorMessage;
    }

    return "Unknown error reported. Please check your browser's console logs for more details";
  }
}

errorHelpers.parseApiErrorForInfoText = (topic = "data", error) => {
  const parsedError = parseError(error);

  if (hasStringValue(topic) !== true) {
    topic = "data";
  }

  return `Error Pulling ${capitalizeFirstLetter(topic)}: ${parsedError}`;
};

errorHelpers.constructApiResponseErrorPlaceholderText = (topic = "data") => {
  if (hasStringValue(topic) !== true) {
    topic = "data";
  }

  return `Error Pulling ${capitalizeFirstLetter(topic)}!`;
};