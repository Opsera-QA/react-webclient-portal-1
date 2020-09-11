import React, {createContext, useState} from "react";
import SuccessDialog from "../components/common/status_notifications/SuccessDialog";
import ErrorDialog from "../components/common/status_notifications/error";

const ToastContextProvider = (props) => {
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState(undefined);
  const [modalToast, setModalToast] = useState(undefined);

  const resetToast = () => {
    setShowToast(false);
    setToast(undefined);
    setModalToast(undefined);
  }

  const showErrorDialog = (errorMessage) => {
    setToast(getErrorDialog(errorMessage));
    setShowToast(true);
  }

  const showSuccessDialog = (errorMessage) => {
    setToast(getErrorDialog(errorMessage));
    setShowToast(true);
  }

  const showFormValidationErrorDialog = () => {
    setToast(getErrorDialog(`WARNING! There are errors in your form`));
    setShowToast(true);
  };

  const showLoadingErrorDialog = (errorMessage) => {
    setToast(getErrorDialog(`WARNING! An error has occurred loading: ${errorMessage}`));
    setShowToast(true);
  }

  const showServiceUnavailableDialog = () => {
    setToast(getErrorDialog(`Service Unavailable.  Please try again or report this issue.`));
    setShowToast(true);
  }

  const showUpdateSuccessResultDialog = (type) => {
    setToast(getSuccessDialog(`${type} updated successfully!`));
    setShowToast(true);
  }

  const showDeleteSuccessResultDialog = (type) => {
    setToast(getSuccessDialog(`${type} deleted successfully!`));
    setShowToast(true);
  }

  const showCreateSuccessResultDialog = (type) => {
    setToast(getSuccessDialog(`${type} created successfully!`));
    setShowToast(true);
  }

  const showCreateFailureResultDialog = (type, errorMessage, modal = true) => {
    if (modal) {
      setModalToast(getErrorDialog(`WARNING! An error has occurred creating this ${type}: ${errorMessage}`, "dialogToast"));
    }
    else {
      setToast(getErrorDialog(`WARNING! An error has occurred creating this ${type}: ${errorMessage}`));
      setShowToast(true);
    }
  }

  const showUpdateFailureResultDialog = (type, errorMessage) => {
    setToast(getErrorDialog(`WARNING! An error has occurred updating this ${type}: ${errorMessage}`));
    setShowToast(true);
  }

  const showDeleteFailureResultDialog = (type, errorMessage, modal = false) => {
    if (modal) {
      setToast(getErrorDialog(`WARNING! An error has occurred deleting this ${type}: ${errorMessage}`, "dialogToast"));
    }
    else {
      setToast(getErrorDialog(`WARNING! An error has occurred deleting this ${type}: ${errorMessage}`));
      setShowToast(true);
    }
  }

  const showEmailAlreadyExistsErrorDialog = () => {
    setToast(getErrorDialog(`WARNING! The email address given has already been registered to an Opsera account`));
    setShowToast(true);
  };

  const showMissingRequiredFieldsErrorDialog = () => {
    setToast(getErrorDialog(`Required Fields Missing!`));
    setShowToast(true);
  };

  const getSuccessDialog = (message, alignment = "dialogToast") => {
    return <SuccessDialog successMessage={message} setSuccessMessage={resetToast} alignment={alignment} />
  };

  const getErrorDialog = (message, alignment = "dialogToast") => {
    return <ErrorDialog error={message} align={alignment} setError={resetToast}/>
  };

  const getModalToast = () => {
    return <>{modalToast != null ? modalToast : null}</>;
  }

    return (
      <DialogToastContext.Provider
        value={{
          showFormValidationErrorDialog: showFormValidationErrorDialog,
          showMissingRequiredFieldsErrorDialog: showMissingRequiredFieldsErrorDialog,
          showEmailAlreadyExistsErrorDialog: showEmailAlreadyExistsErrorDialog,
          showDeleteFailureResultDialog: showDeleteFailureResultDialog,
          showUpdateFailureResultDialog: showUpdateFailureResultDialog,
          showCreateFailureResultDialog: showCreateFailureResultDialog,
          showDeleteSuccessResultDialog: showDeleteSuccessResultDialog,
          showUpdateSuccessResultDialog: showUpdateSuccessResultDialog,
          showCreateSuccessResultDialog: showCreateSuccessResultDialog,
          showServiceUnavailableDialog: showServiceUnavailableDialog,
          showLoadingErrorDialog: showLoadingErrorDialog,
          showErrorDialog: showErrorDialog,
          showSuccessDialog: showSuccessDialog,
          getModalToast: getModalToast
        }}>
        {showToast && toast}
        {props.children}
      </DialogToastContext.Provider>
    );
  }
;

ToastContextProvider.propTypes = {};

export const DialogToastContext = createContext();
export default ToastContextProvider;
