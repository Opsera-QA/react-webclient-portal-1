import React from "react";
import SuccessDialog from "../status_notifications/SuccessDialog";
import ErrorDialog from "../status_notifications/error";

export const getLoadingErrorDialog = (errorMessage, toggleToast, alignment) => {
  return getErrorDialog(`WARNING! An error has occurred loading: ${errorMessage}`, toggleToast, alignment);
}

export const getCreateSuccessResultDialog = (type, toggleToast, alignment) => {
  return getSuccessDialog(`${type} created successfully!`, toggleToast, alignment)
}

export const getUpdateSuccessResultDialog = (type, toggleToast, alignment) => {
  return getSuccessDialog(`${type} updated successfully!`, toggleToast, alignment);
}

export const getDeleteSuccessResultDialog = (type, toggleToast, alignment) => {
  return getSuccessDialog(`${type} deleted successfully!`, toggleToast, alignment);
}

export const getCreateFailureResultDialog = (type, errorMessage, toggleToast, alignment) => {
  return getErrorDialog(`WARNING! An error has occurred creating this ${type}: ${errorMessage}`, toggleToast, alignment);
}

export const getUpdateFailureResultDialog = (type, errorMessage, toggleToast, alignment) => {
  return getErrorDialog(`WARNING! An error has occurred updating this ${type}: ${errorMessage}`, toggleToast, alignment);
}

export const getDeleteFailureResultDialog = (type, errorMessage, toggleToast, alignment) => {
  return getErrorDialog(`WARNING! An error has occurred deleting this ${type}: ${errorMessage}`, toggleToast, alignment);
}

// TODO: Remove when all pages are updated
export const getPersistResultDialog = (success, action, type, message, toggleToast, alignment) => {
  if (success) {
    switch (action) {
      case "add":
        return getSuccessDialog(`${type} created successfully!`, toggleToast, alignment);
      case "update":
        return getSuccessDialog(`${type} updated successfully!`, toggleToast, alignment);
      case "delete":
        return getSuccessDialog(`${type} deleted successfully!`, toggleToast, alignment);
    }
  } else {
    switch (action) {
      case "add":
        return getErrorDialog(`WARNING! An error has occurred creating this ${type}: ${message}`, toggleToast, alignment);
      case "update":
        return getErrorDialog(`WARNING! An error has occurred updating this ${type}: ${message}`, toggleToast, alignment);
      case "delete":
        return getErrorDialog(`WARNING! An error has occurred deleting this ${type}: ${message}`, toggleToast, alignment);
    }
  }
};

export const getFormValidationErrorDialog = (toggleToast) => {
  return <ErrorDialog error={`WARNING! There are errors in your form`} align={"top"} setError={toggleToast}/>
};

export const getSuccessDialog = (message, toggleToast, alignment) => {
  return <SuccessDialog successMessage={message} setSuccessMessage={toggleToast} alignment={alignment} />
};

export const getErrorDialog = (message, toggleToast, alignment) => {
  return <ErrorDialog error={message} align={alignment} setError={toggleToast}/>
};
