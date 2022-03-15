import {capitalizeFirstLetter, hasStringValue} from "components/common/helpers/string-helpers";

export const errorHelpers = {};

// TODO: Handle better when error handling standards are in place
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

    if (hasStringValue(responseData)) {
      return responseData;
    }

    if (error?.error) {
      if (hasStringValue(error?.error) === true) {
        return error.error;
      }

      const requestResponseText = error?.error?.response?.data?.message;
      if (hasStringValue(requestResponseText) === true) {
        return requestResponseText;
      }

      if (hasStringValue(error?.error?.message) === true) {
        return error.error.message;
      }
    }

    if (error.response) {
      const responseData = error?.response?.data;

      if (responseData) {
        if (hasStringValue(responseData) === true) {
          return error?.response.data;
        }

        if (hasStringValue(responseData?.message) === true) {
          return responseData?.message;
        }
      }
    }

    if (hasStringValue(error.message) === true) {
      return error.message;
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