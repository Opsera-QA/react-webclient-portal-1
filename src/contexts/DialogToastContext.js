import React, {createContext, useState} from "react";
import SuccessDialog from "../components/common/status_notifications/SuccessDialog";
import ErrorDialog from "../components/common/status_notifications/error";
import WarningDialog from "../components/common/status_notifications/WarningDialog";
import InformationDialog from "../components/common/status_notifications/info";

const ToastContextProvider = (props) => {
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState(undefined);
  const [modalToast, setModalToast] = useState(undefined);
  let autoCloseTimer;

  const resetToast = () => {
    setShowToast(false);
    setToast(undefined);
    setModalToast(undefined);
  }

  const refreshTimer = (autoCloseLength) => {
    if (autoCloseTimer != null) {
      console.log("Cleared out auto close timer");
      clearTimeout(autoCloseTimer);
      autoCloseTimer = null;
    }

    if (autoCloseLength) {
      console.log("setting toast auto close timer to " + autoCloseLength + " seconds.");
      autoHideDialog(autoCloseLength * 1000);
    }
  };

  function autoHideDialog(autoCloseLength = 20000) {
    autoCloseTimer = setTimeout(function () { resetToast(); }, autoCloseLength);
  }

  const showErrorDialog = (errorMessage) => {
    setToast(getErrorDialog(errorMessage));
    setShowToast(true);
    refreshTimer();
  }

  const showWarningDialog = (warningMessage) => {
    setToast(getWarningDialog(warningMessage));
    setShowToast(true);
    refreshTimer();
  }

  const showSuccessDialog = (successMessage, autoCloseLengthInSeconds = 20) => {
    setToast(getSuccessDialog(successMessage));
    setShowToast(true);
    refreshTimer(autoCloseLengthInSeconds);
  }

  const showInformationDialog = (informationMessage, autoCloseLengthInSeconds) => {
    setToast(getInformationDialog(informationMessage));
    setShowToast(true);
    refreshTimer(autoCloseLengthInSeconds);
  }

  const showFormValidationErrorDialog = (modal = false, errorMessage) => {
    if (modal) {
      setModalToast(getErrorDialog(undefined,`WARNING! There are errors in your form: ${errorMessage}`));
    }
    else {
      setToast(getErrorDialog(undefined,`WARNING! There are errors in your form: ${errorMessage}`));
      setShowToast(true);
    }
    refreshTimer();
  };

  const showLoadingErrorDialog = (error) => {
    setToast(getErrorDialog(error,`WARNING! An error has occurred loading:`));
    setShowToast(true);
    refreshTimer();
  }

  const showServiceUnavailableDialog = (error) => {
    setToast(getErrorDialog(error,`Service Unavailable. Please try again or report this issue:`));
    setShowToast(true);
    refreshTimer();
  }

  const showUpdateSuccessResultDialog = (type, autoCloseLengthInSeconds = 20) => {
    setToast(getSuccessDialog(`${type} updated successfully!`));
    setShowToast(true);
    autoHideDialog();
    refreshTimer(autoCloseLengthInSeconds);
  }

  const showDeleteSuccessResultDialog = (type) => {
    setToast(getSuccessDialog(`${type} deleted successfully!`));
    setShowToast(true);
    refreshTimer();
  }

  const showCreateSuccessResultDialog = (type,  modal = false, autoCloseLengthInSeconds = 20) => {
    if (modal) {
      setModalToast(getSuccessDialog(`${type} created successfully!`));
    }
    else {
      setToast(getSuccessDialog(`${type} created successfully!`));
      setShowToast(true);
    }
    refreshTimer(autoCloseLengthInSeconds);
  }

  const showCreateFailureResultDialog = (type, error, modal = true) => {
    console.log("in showCreateFailureResultDialog: " + modal)
    if (modal) {
      setModalToast(getErrorDialog(error, `WARNING! An error has occurred creating this ${type}:`));
    }
    else {
      setToast(getErrorDialog(error, `WARNING! An error has occurred creating this ${type}:`));
      setShowToast(true);
    }
    refreshTimer();
  }

  const showUpdateFailureResultDialog = (type, error) => {
    setToast(getErrorDialog(error, `WARNING! An error has occurred updating this ${type}:`));
    setShowToast(true);
    refreshTimer();
  }

  const showDeleteFailureResultDialog = (type, error, modal = false) => {
    if (modal) {
      setToast(getErrorDialog(error,`WARNING! An error has occurred deleting this ${type}:`));
    }
    else {
      setToast(getErrorDialog(error,`WARNING! An error has occurred deleting this ${type}`));
      setShowToast(true);
    }
    refreshTimer();
  }

  const showEmailAlreadyExistsErrorDialog = () => {
    setToast(getErrorDialog(null, `WARNING! The email address given has already been registered to an Opsera account`));
    setShowToast(true);
    refreshTimer();
  };

  const showMissingRequiredFieldsErrorDialog = () => {
    setToast(getErrorDialog(null, `Required Fields Missing!`));
    setShowToast(true);
    refreshTimer();
  };

  const getSuccessDialog = (message, alignment = "dialogToast") => {
    return <SuccessDialog successMessage={message} setSuccessMessage={resetToast} alignment={alignment} />
  };

  const getErrorDialog = (error, prependMessage = "", alignment = "dialogToast") => {
    return <ErrorDialog error={error} prependMessage={prependMessage} align={alignment} setError={resetToast}/>
  };

  const getWarningDialog = (message,  alignment = "dialogToast") => {
    return <WarningDialog warningMessage={message} alignment={alignment} setWarningMessage={resetToast}/>
  };

  const getInformationDialog = (message, alignment = "dialogToast") => {
    return <InformationDialog message={message} alignment={alignment} setInformationMessage={resetToast}/>
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
          showInformationDialog: showInformationDialog,
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
