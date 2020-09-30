import React from "react";
import SuccessDialog from "../status_notifications/SuccessDialog";
import ErrorDialog from "../status_notifications/error";

export const getLoadingErrorDialog = (errorMessage, toggleToast, alignment = "top") => {
  return getErrorDialog(`WARNING! An error has occurred: ${errorMessage}`, toggleToast, alignment);
}

export const getServiceUnavailableDialog = (toggleToast, alignment) => {
  return getErrorDialog(`Service Unavailable.  Please try again or report this issue.`, toggleToast, alignment);
}

export const getCreateSuccessResultDialog = (type, toggleToast, alignment = "top") => {
  return getSuccessDialog(`${type} created successfully!`, toggleToast, alignment)
}

export const getUpdateSuccessResultDialog = (type, toggleToast, alignment = "detailPanelTop") => {
  return getSuccessDialog(`${type} updated successfully!`, toggleToast, alignment);
}

export const getDeleteSuccessResultDialog = (type, toggleToast, alignment = "top") => {
  return getSuccessDialog(`${type} deleted successfully!`, toggleToast, alignment);
}

export const getCreateFailureResultDialog = (type, errorMessage, toggleToast, alignment = "top") => {
  return getErrorDialog(`WARNING! An error has occurred creating this ${type}: ${errorMessage}`, toggleToast, alignment);
}

export const getUpdateFailureResultDialog = (type, errorMessage, toggleToast, alignment = "detailPanelTop") => {
  return getErrorDialog(`WARNING! An error has occurred updating this ${type}: ${errorMessage}`, toggleToast, alignment);
}

export const getDeleteFailureResultDialog = (type, errorMessage, toggleToast, alignment = "detailPanelTop") => {
  return getErrorDialog(`WARNING! An error has occurred deleting this ${type}: ${errorMessage}`, toggleToast, alignment);
}

export const getFormValidationErrorDialog = (toggleToast, alignment = "top") => {
  return getErrorDialog(`WARNING! There are errors in your form`, toggleToast, alignment);
};

export const getEmailAlreadyExistsErrorDialog = (toggleToast, alignment = "top") => {
  return getErrorDialog(`WARNING! The email address given has already been registered to an Opsera account`, toggleToast, alignment);
};

export const getMissingRequiredFieldsErrorDialog = (toggleToast, alignment = "top") => {
  return getErrorDialog(`Required Fields Missing!`, toggleToast, alignment);
};

export const getSuccessDialog = (message, toggleToast, alignment) => {
  return <SuccessDialog successMessage={message} setSuccessMessage={toggleToast} alignment={alignment} />
};

export const getErrorDialog = (message, toggleToast, alignment) => {
  return <ErrorDialog error={message} align={alignment} setError={toggleToast}/>
};
