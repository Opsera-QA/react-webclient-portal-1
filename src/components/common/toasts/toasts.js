import {Alert} from "react-bootstrap";
import React from "react";

export const getPersistToast = (success, action, type, message, toggleToast) => {
  if (success) {
    switch (action) {
      case "add":
        return getSuccessToast(`${type} created successfully!`, toggleToast);
      case "update":
        return getSuccessToast(`${type} updated successfully!`, toggleToast);
      case "delete":
        return getSuccessToast(`${type} deleted successfully!`, toggleToast);
    }
  } else {
    switch (action) {
      case "add":
        return getErrorToast(`WARNING! An error has occurred creating this ${type}: ${message}`, toggleToast);
      case "update":
        return getErrorToast(`WARNING! An error has occurred updating this ${type}: ${message}`, toggleToast);
      case "delete":
        return getErrorToast(`WARNING! An error has occurred deleting this ${type}: ${message}`, toggleToast);
    }
  }
};

export const getFromValidationErrorToast = (errors, toggleToast) => {
  return getErrorToast(`WARNING! There are errors in your form: ${errors}`, toggleToast);
};

export const getSuccessToast = (message, toggleToast) => {
  return getToast("success", message, toggleToast);
};

export const getErrorToast = (message, toggleToast) => {
  return getToast("danger", message, toggleToast);
};

const getToast = (type, message, toggleToast) => {
  return <Alert variant={type} onClose={() => toggleToast(false)} dismissible>{message}</Alert>
};
