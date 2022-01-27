export function parseError(error) {
  if (!error || error.length === 0) {
    return "Unknown error reported.";
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
        return requestResponseText;
      }

      if (error?.error?.message) {
        return error.error.message;
      }

      return JSON.stringify(error.error);
    }

    if (error.response) {
      return error.response.data.message ? error.response.data.message : JSON.stringify(error.response.data);
    }

    if (error.message) {
      return error.message;
    }

    return JSON.stringify(error);
  }
}