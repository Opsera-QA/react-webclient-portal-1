import React, {createContext, useState} from "react";
import SuccessDialog from "../components/common/status_notifications/SuccessDialog";
import ErrorDialog from "../components/common/status_notifications/error";
import WarningDialog from "../components/common/status_notifications/WarningDialog";
import InformationDialog from "../components/common/status_notifications/info";

const ToastContextProvider = (props) => {
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState(undefined);
  const [modalToast, setModalToast] = useState(undefined);

  const resetToast = () => {
    setShowToast(false);
    setToast(undefined);
    setModalToast(undefined);
  }

  function autoHideDialog() {
      setTimeout(function () {
        resetToast();
      }, 20000);
  }

  const showErrorDialog = (errorMessage) => {
    setToast(getErrorDialog(errorMessage));
    setShowToast(true);
  }

  const showWarningDialog = (warningMessage) => {
    setToast(getWarningDialog(warningMessage));
    setShowToast(true);
  }

  const showSuccessDialog = (successMessage) => {
    setToast(getSuccessDialog(successMessage));
    setShowToast(true);
    autoHideDialog();
  }

  const showInformationDialog = (informationMessage) => {
    setToast(getInformationDialog(informationMessage));
    setShowToast(true);
  }

  const showFormValidationErrorDialog = (modal = false) => {
    if (modal) {
      setModalToast(getErrorDialog(`WARNING! There are errors in your form`));
    }
    else {
      setToast(getErrorDialog(`WARNING! There are errors in your form`));
      setShowToast(true);
    }
  };

  const showLoadingErrorDialog = (error) => {
    setToast(getErrorDialog(error,`WARNING! An error has occurred loading:`));
    setShowToast(true);
  }

  const showServiceUnavailableDialog = (error) => {
    setToast(getErrorDialog(error,`Service Unavailable. Please try again or report this issue:`));
    setShowToast(true);
  }

  const showUpdateSuccessResultDialog = (type) => {
    setToast(getSuccessDialog(`${type} updated successfully!`));
    setShowToast(true);
    autoHideDialog();
  }

  const showDeleteSuccessResultDialog = (type) => {
    setToast(getSuccessDialog(`${type} deleted successfully!`));
    setShowToast(true);
  }

  const showCreateSuccessResultDialog = (type,  modal = false) => {
    if (modal) {
      setModalToast(getSuccessDialog(`${type} created successfully!`));
    }
    else {
      setToast(getSuccessDialog(`${type} created successfully!`));
      setShowToast(true);
    }
    autoHideDialog();
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
  }

  const showUpdateFailureResultDialog = (type, error) => {
    setToast(getErrorDialog(error, `WARNING! An error has occurred updating this ${type}:`));
    setShowToast(true);
  }

  const showDeleteFailureResultDialog = (type, error, modal = false) => {
    if (modal) {
      setToast(getErrorDialog(error,`WARNING! An error has occurred deleting this ${type}:`));
    }
    else {
      setToast(getErrorDialog(error,`WARNING! An error has occurred deleting this ${type}`));
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
