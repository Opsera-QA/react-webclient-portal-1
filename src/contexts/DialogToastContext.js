import React, {createContext, useCallback, useState} from "react";
import PropTypes from "prop-types";
import {generateUUID} from "../components/common/helpers/string-helpers";
import PersistentInformationMessage from "../components/common/status_notifications/banners/PersistentInformationMessage";
import BannerMessageContainer from "../components/common/status_notifications/banners/BannerMessageContainer";
import ErrorBanner from "../components/common/status_notifications/banners/ErrorBanner";
import SuccessToast from "../components/common/status_notifications/toasts/SuccessToast";
import Toaster from "../components/common/status_notifications/toasts/Toaster";
import ErrorToast from "../components/common/status_notifications/toasts/ErrorToast";
import InformationToast from "../components/common/status_notifications/toasts/InformationToast";
import WarningToast from "../components/common/status_notifications/toasts/WarningToast";
import SuccessBanner from "../components/common/status_notifications/banners/SuccessBanner";
import InformationBanner from "../components/common/status_notifications/banners/InformationBanner";
import WarningBanner from "../components/common/status_notifications/banners/WarningBanner";

function ToastContextProvider ({ children }) {
  const [toasts, setToasts] = useState([]);
  // TODO: Wire up way to arrow through banners
  const [bannerMessages, setBannerMessages] = useState([]);
  const [inlineBanner, setInlineBanner] = useState(undefined);

  const removeBanners = () => {
    setBannerMessages([]);
  };

  const addBannerMessage = useCallback((bannerMessage, id) => {
      let newBannerMessage = {id: id, bannerMessage: bannerMessage};
      setBannerMessages(bannerMessages => [...bannerMessages, newBannerMessage]);
    }, [setBannerMessages]
  );

  const removeBannerMessage = useCallback((id) => {
      setBannerMessages(bannerMessages => bannerMessages.filter((item) => { return item.id !== id; }));
    }, [setBannerMessages]
  );

  const addToast = useCallback((toast, id) => {
      let newToast = {id: id, toast: toast};
      setToasts(toasts => [...toasts, newToast]);
    }, [setToasts]
  );

  const removeToast = useCallback((id) => {
      setToasts(toasts => toasts.filter((item) => { return item.id !== id; }));
    }, [setToasts]
  );

  const showErrorBanner = (error, errorMessage) => {
    let id = generateUUID();
    let errorBanner = getErrorBanner(error, id, errorMessage);
    addBannerMessage(errorBanner, id);
  }

  const showErrorToast = (error, autoCloseLengthInSeconds) => {
    let id = generateUUID();
    let errorToast = getErrorToast(error, id, null, autoCloseLengthInSeconds);
    addToast(errorToast, id);
  }

  const showWarningBanner = (warningMessage) => {
    let id = generateUUID();
    let warningDialog = getWarningBanner(warningMessage, id);
    addBannerMessage(warningDialog, id);
  }

  const showWarningToast = (warningMessage, autoCloseLengthInSeconds) => {
    let id = generateUUID();
    let warningToast = getWarningToast(warningMessage, id, autoCloseLengthInSeconds);
    addToast(warningToast, id);
  }

  const showSuccessToast = (successMessage, autoCloseLengthInSeconds = 20) => {
    let id = generateUUID();
    let successToast = getSuccessToast(successMessage, id, autoCloseLengthInSeconds);
    addToast(successToast, id);
  }

  const showSuccessBanner = (successMessage)=> {
    let id = generateUUID();
    let successBanner = getSuccessBanner(successMessage, id);
    addBannerMessage(successBanner, id);
  }

  const showInformationBanner = (informationMessage) => {
    let id = generateUUID();
    let informationBanner = getInformationBanner(informationMessage, id);
    addBannerMessage(informationBanner, id);
  }

  const showInformationToast = (informationMessage, autoCloseLengthInSeconds) => {
    let id = generateUUID();
    let informationToast = getInformationToast(informationMessage, id, autoCloseLengthInSeconds)
    addToast(informationToast, id);
  }

  const showInlineFormValidationErrorDialog = (errorMessage = "") => {
    let errorBanner = getErrorBanner(`WARNING! There are errors in your form. ${errorMessage} Please review the details and ensure any required fields or special rules are met and try again.`);
    setInlineBanner(errorBanner);
  };

  const showFormValidationErrorDialog = (errorMessage = "") => {
    let id = generateUUID();
    let errorToast = getErrorToast(`WARNING! There are errors in your form. ${errorMessage} Please review the details and ensure any required fields or special rules are met and try again.`, id);
    addToast(errorToast, id);
  };

  const showLoadingErrorDialog = (error) => {
    let id = generateUUID();
    let errorBanner = getErrorBanner(error, id,`WARNING! An error has occurred loading:`, id);
    addBannerMessage(errorBanner, id);
  }

  const showServiceUnavailableDialog = (error) => {
    let id = generateUUID();
    let errorBanner = getErrorBanner(error, id, `Service Unavailable. Please try again or report this issue:`);
    addBannerMessage(errorBanner, id);
  }

  const showUpdateSuccessResultDialog = (type, autoCloseLengthInSeconds = 20) => {
    let id = generateUUID();
    let successToast = getSuccessToast(`${type} updated successfully!`, id, autoCloseLengthInSeconds);
    addToast(successToast, id);
  }

  const showDeleteSuccessResultDialog = (type, autoCloseLengthInSeconds = 20) => {
    let id = generateUUID();
    let successToast = getSuccessToast(`${type} deleted successfully!`, id, autoCloseLengthInSeconds);
    addToast(successToast, id);
  }

  const showInlineCreateSuccessResultDialog = (type, autoCloseLengthInSeconds = 20) => {
    let id = generateUUID();
    let successBanner = getSuccessBanner(`${type} created successfully!`, id);
    setInlineBanner(successBanner);
  }

  const showCreateSuccessResultDialog = (type, autoCloseLengthInSeconds = 20) => {
    let id = generateUUID();
    let successToast = getSuccessToast(`${type} created successfully!`, id, autoCloseLengthInSeconds);
    addToast(successToast, id);
  }

  const showCreateFailureResultDialog = (type, error) => {
    let id = generateUUID();
    let errorToast = getErrorToast(error, id, `WARNING! An error has occurred creating this ${type}:`);
    addToast(errorToast, id);
  }

  // TODO: Implement
  const showInlineCreateFailureResultDialog = (type, error) => {
    // addBannerMessage(getErrorDialog(error, `WARNING! An error has occurred creating this ${type}:`, id), id);
  }

  const showUpdateFailureResultDialog = (type, error) => {
    let id = generateUUID();
    let errorToast = getErrorToast(error, id, `WARNING! An error has occurred updating this ${type}:`);
    addToast(errorToast, id);
  }

  const showDeleteFailureResultDialog = (type, error) => {
    let id = generateUUID();
    let errorToast = getErrorToast(error, id,`WARNING! An error has occurred deleting this ${type}:`);
    addToast(errorToast, id);
  }

  const showInlineDeleteFailureResultDialog = (type, error) => {
    let id = generateUUID();
    setInlineBanner(getErrorBanner(error, id, `WARNING! An error has occurred deleting this ${type}:`), id);
  }

  const showEmailAlreadyExistsErrorDialog = () => {
    let id = generateUUID();
    let errorBanner = getErrorBanner( `WARNING! The email address given has already been registered to an Opsera account`, id);
    addBannerMessage(errorBanner, id);
  };

  const showDomainAlreadyRegisteredErrorDialog = () => {
    let id = generateUUID();
    let errorBanner = getErrorBanner( `WARNING! The domain given has already been registered to an Opsera account`, id);
    addBannerMessage(errorBanner, id);
  };

  const showIncompleteCreateSuccessResultDialog = () => {
    let id = generateUUID();
    let informationDialog = getInformationBanner( `WARNING! An incomplete configuration is being saved.  This step must be fully configured in order to use this feature.`, id);
    addToast(informationDialog, id);
  }

  const showMissingRequiredFieldsErrorDialog = () => {
    let id = generateUUID();
    let errorToast = getErrorToast(`Required Fields Missing!`, id);
    addToast(errorToast, id);
  };

  const getSuccessBanner = (message, id) => {
    return <SuccessBanner successMessage={message} removeBanner={removeBannerMessage} id={id} />
  };

  const getSuccessToast = (message, id, autoCloseLengthInSeconds = 20) => {
    return <SuccessToast successMessage={message} id={id} removeToast={removeToast} autoCloseLength={autoCloseLengthInSeconds}/>
  };

  const getErrorBanner = (error, id, prependMessage = "") => {
    return <ErrorBanner error={error} prependMessage={prependMessage} id={id} removeBanner={removeBannerMessage} />
  };

  const getErrorToast = (error, id, prependMessage = "", autoCloseLengthInSeconds) => {
    return <ErrorToast error={error} prependMessage={prependMessage} id={id} removeToast={removeToast} autoCloseLength={autoCloseLengthInSeconds} />
  };

  const getWarningBanner = (message, id) => {
    return <WarningBanner warningMessage={message} removeBanner={removeBannerMessage} id={id}/>
  };

  const getWarningToast = (message, id, autoCloseLengthInSeconds) => {
    return <WarningToast warningMessage={message} id={id} removeToast={removeToast} autoCloseLength={autoCloseLengthInSeconds}/>
  };

  const getInformationBanner = (message, id) => {
    return <InformationBanner informationMessage={message} removeBanner={removeBannerMessage} id={id}/>
  };

  const getInformationToast = (message, id, autoCloseLengthInSeconds) => {
    return <InformationToast informationMessage={message} id={id} removeToast={removeToast} autoCloseLength={autoCloseLengthInSeconds}/>
  };

  const getModalToast = () => {
    return <>{inlineBanner != null ? inlineBanner : null}</>;
  }

  const getInlineBanner = () => {
    return <>{inlineBanner != null ? inlineBanner : null}</>;
  }

  return (
      <DialogToastContext.Provider
        value={{
          // TODO: Rename to Toast instead of dialog for clarity
          showDeleteFailureResultDialog: showDeleteFailureResultDialog,
          showUpdateFailureResultDialog: showUpdateFailureResultDialog,
          showCreateFailureResultDialog: showCreateFailureResultDialog,
          showDeleteSuccessResultDialog: showDeleteSuccessResultDialog,
          showUpdateSuccessResultDialog: showUpdateSuccessResultDialog,
          showCreateSuccessResultDialog: showCreateSuccessResultDialog,
          showFormValidationErrorDialog: showFormValidationErrorDialog,
          showMissingRequiredFieldsErrorDialog: showMissingRequiredFieldsErrorDialog,
          showSuccessDialog: showSuccessToast,
          showSuccessToast: showSuccessToast,
          showWarningToast: showWarningToast,
          showInformationToast: showInformationToast,
          showErrorToast: showErrorToast,
          // TODO: Rename to Banner instead of dialog for clarity
          showEmailAlreadyExistsErrorDialog: showEmailAlreadyExistsErrorDialog,
          showDomainAlreadyRegisteredErrorDialog: showDomainAlreadyRegisteredErrorDialog,
          showServiceUnavailableDialog: showServiceUnavailableDialog,
          showLoadingErrorDialog: showLoadingErrorDialog,
          showIncompleteCreateSuccessResultDialog: showIncompleteCreateSuccessResultDialog,
          showSuccessBanner: showSuccessBanner,
          showInformationBanner: showInformationBanner,
          showWarningBanner: showWarningBanner,
          showErrorBanner: showErrorBanner,

          // TODO: Remove when everything is using the banner ones.
          showInformationDialog: showInformationBanner,
          showWarningDialog: showWarningBanner,
          showErrorDialog: showErrorBanner,
          getModalToast: getModalToast,

          getInlineBanner: getInlineBanner
        }}>
        <PersistentInformationMessage />
        <BannerMessageContainer bannerMessages={bannerMessages} />
        {children}
        <Toaster toasts={toasts} />
      </DialogToastContext.Provider>
    );
  }
;

ToastContextProvider.propTypes = {
  children: PropTypes.any
};

export const DialogToastContext = createContext(ToastContextProvider);
export default ToastContextProvider;
