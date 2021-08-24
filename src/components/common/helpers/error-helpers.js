export function parseError(error) {
  if (!error || error.length === 0) {
    return "Unknown error reported. Please check console log.";
  }
  console.error(error); //log all errors to console

  if (typeof error === "string") {
    return error;
  }

  if (typeof error === "object") {
    if (error?.error) {
      if (typeof error.error === "string") {
        return error.error;
      }

      const requestResponseText = error?.error?.response?.data?.message;
      if (requestResponseText) {
        return `Status ${error?.error?.response?.status}: ${requestResponseText}`;
      }

      if (error?.error?.message) {
        return error.error.message;
      }

      return JSON.stringify(error.error);
    }

    if (error.response) {
      let messageBody = `Status ${error.response.status}: `;
      messageBody += error.response.data.message ? error.response.data.message : JSON.stringify(error.response.data);
      return messageBody;
    }

    if (error.message) {
      return error.message;
    }

    return JSON.stringify(error);
  }
}