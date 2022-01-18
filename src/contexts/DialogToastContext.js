import React, {createContext, useCallback, useState} from "react";
import PropTypes from "prop-types";
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
import InlineError from "components/common/status_notifications/inline/InlineError";
import {generateUUID} from "components/common/helpers/string-helpers";
import SiteNotificationDisplayer from "components/admin/site_notifications/displayer/SiteNotificationDisplayer";
import OverlayPanelContainer from "components/common/panels/OverlayPanelContainer";

const notificationTypes = {
  FORM: "form",
  SYSTEM: "system",
  // TODO: Unknown is a stopgap until all locations where generic toasts are created have been updated
  UNKNOWN: "unknown"
};

const SITE_LOCATION = {
  PIPELINES: "pipelines",
  TASKS: "tasks",
  DASHBOARDS: "dashboards",
  REGISTRY: "registry",
  NOTIFICATIONS: "notifications",
};

function ToastContextProvider({children, navBar}) {
  const [toasts, setToasts] = useState([]);
  // TODO: Wire up way to arrow through banners
  const [bannerMessages, setBannerMessages] = useState([]);
  const [inlineBanner, setInlineBanner] = useState(undefined);
  const [overlayPanel, setOverlayPanel] = useState(undefined);

  const removeAllBanners = useCallback(() => {
      setBannerMessages([]);
    }, [setBannerMessages]
  );

  const removeFormBanners = useCallback(() => {
      setBannerMessages(bannerMessages => [...bannerMessages.filter(banner => banner.type !== notificationTypes.FORM)]);
    }, [setBannerMessages]
  );

  const removeAllToasts = useCallback(() => {
      setToasts([]);
    }, [setToasts]
  );

  const removeFormToasts = useCallback(() => {
      setToasts(toasts => [...toasts.filter(toast => toast.type !== notificationTypes.FORM)]);
    }, [setToasts]
  );

  const addBannerMessage = useCallback((bannerMessage, id, notificationType) => {
      let newBannerMessage = {id: id, bannerMessage: bannerMessage, type: notificationType};
      setBannerMessages(bannerMessages => [...bannerMessages, newBannerMessage]);
    }, [setBannerMessages]
  );

  const addOverlayPanel = useCallback((overlayPanel) => {
      if (overlayPanel != null) {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
      }

      setOverlayPanel(overlayPanel);
    }, [setOverlayPanel]
  );

  const clearOverlayPanel = useCallback(() => {
      document.body.style.overflow = 'unset';
      setOverlayPanel(undefined);
    }, [setOverlayPanel]
  );

  const showModal = useCallback((modal) => {
      setOverlayPanel(modal);
    }, [setOverlayPanel]
  );

  const clearModal = useCallback(() => {
      setOverlayPanel(undefined);
    }, [setOverlayPanel]
  );

  const setInlineMessage = useCallback((bannerMessage, id, notificationType) => {
      let newBannerMessage = {id: id, bannerMessage: bannerMessage, type: notificationType};
      setInlineBanner(newBannerMessage);
    }, [setInlineBanner]
  );

  const removeInlineMessage = useCallback(() => {
      setInlineBanner(undefined);
    }, [setInlineBanner]
  );

  const removeBannerMessage = useCallback((id) => {
      setBannerMessages(bannerMessages => bannerMessages.filter((item) => { return item.id !== id; }));
    }, [setBannerMessages]
  );

  const addToast = useCallback((toast, id, notificationType) => {
      // TODO: For now, only show one toast. But, revisit in the future
      removeAllToasts();
      let newToast = {id: id, toast: toast, type: notificationType};
      setToasts(toasts => [...toasts, newToast]);
    }, [setToasts]
  );

  const removeToast = useCallback((id) => {
      setToasts(toasts => toasts.filter((item) => { return item.id !== id; }));
    }, [setToasts]
  );

  const showSystemErrorBanner = (error, prependMessage = "") => {
    showErrorBanner(error, prependMessage, notificationTypes.SYSTEM);
  };

  const showFormErrorBanner = (error, prependMessage = "") => {
    showErrorBanner(error, prependMessage, notificationTypes.FORM);
  };

  const showErrorBanner = (error, prependMessage, notificationType = notificationTypes.UNKNOWN) => {
    let id = generateUUID();
    let errorBanner = getErrorBanner(error, id, prependMessage);
    addBannerMessage(errorBanner, id, notificationType);
  };

  const showSystemErrorToast = (error, prependMessage = "", autoCloseLengthInSeconds) => {
    showErrorToast(error, prependMessage, autoCloseLengthInSeconds, notificationTypes.SYSTEM);
  };

  const showFormErrorToast = (error, prependMessage = "", autoCloseLengthInSeconds) => {
    showErrorToast(error, prependMessage, autoCloseLengthInSeconds, notificationTypes.FORM);
  };

  const showErrorToast = (error, prependMessage, autoCloseLengthInSeconds, notificationType = notificationTypes.UNKNOWN) => {
    let id = generateUUID();
    let errorToast = getErrorToast(error, id, prependMessage, autoCloseLengthInSeconds);
    addToast(errorToast, id, notificationType);
  };

  const showSystemWarningBanner = (warningMessage) => {
    showWarningBanner(warningMessage, notificationTypes.SYSTEM);
  };

  const showFormWarningBanner = (warningMessage) => {
    showWarningBanner(warningMessage, notificationTypes.FORM);
  };

  const showWarningBanner = (warningMessage, notificationType = notificationTypes.UNKNOWN) => {
    let id = generateUUID();
    let warningDialog = getWarningBanner(warningMessage, id);
    addBannerMessage(warningDialog, id, notificationType);
  };

  const showSystemWarningToast = (warningMessage, autoCloseLengthInSeconds) => {
    showWarningToast(warningMessage, autoCloseLengthInSeconds, notificationTypes.SYSTEM);
  };

  const showFormWarningToast = (warningMessage, autoCloseLengthInSeconds) => {
    showWarningToast(warningMessage, autoCloseLengthInSeconds, notificationTypes.FORM);
  };

  const showWarningToast = (warningMessage, autoCloseLengthInSeconds, notificationType = notificationTypes.UNKNOWN) => {
    let id = generateUUID();
    let warningToast = getWarningToast(warningMessage, id, autoCloseLengthInSeconds);
    addToast(warningToast, id, notificationType);
  };

  const showSystemSuccessToast = (successMessage, autoCloseLengthInSeconds) => {
    showSuccessToast(successMessage, autoCloseLengthInSeconds, notificationTypes.SYSTEM);
  };

  const showFormSuccessToast = (successMessage, autoCloseLengthInSeconds) => {
    removeFormToasts();
    showSuccessToast(successMessage, autoCloseLengthInSeconds, notificationTypes.FORM);
  };

  const showSuccessToast = (successMessage, autoCloseLengthInSeconds = 10, notificationType = notificationTypes.UNKNOWN) => {
    let id = generateUUID();
    let successToast = getSuccessToast(successMessage, id, autoCloseLengthInSeconds);
    addToast(successToast, id, notificationType);
  };

  const showSystemSuccessBanner = (successMessage) => {
    showSuccessBanner(successMessage, notificationTypes.SYSTEM);
  };

  const showFormSuccessBanner = (successMessage) => {
    removeFormBanners();
    showSuccessBanner(successMessage, notificationTypes.FORM);
  };

  const showSuccessBanner = (successMessage, notificationType = notificationTypes.UNKNOWN) => {
    let id = generateUUID();
    let successBanner = getSuccessBanner(successMessage, id);
    addBannerMessage(successBanner, id, notificationType);
  };

  const showSystemInformationBanner = (informationMessage) => {
    showInformationBanner(informationMessage, notificationTypes.SYSTEM);
  };

  const showFormInformationBanner = (informationMessage) => {
    showInformationBanner(informationMessage, notificationTypes.FORM);
  };

  const showInformationBanner = (informationMessage, notificationType = notificationTypes.UNKNOWN) => {
    let id = generateUUID();
    let informationBanner = getInformationBanner(informationMessage, id);
    addBannerMessage(informationBanner, id, notificationType);
  };

  const showSystemInformationToast = (informationMessage, autoCloseLengthInSeconds) => {
    showInformationToast(informationMessage, autoCloseLengthInSeconds, notificationTypes.SYSTEM);
  };

  const showFormInformationToast = (informationMessage, autoCloseLengthInSeconds) => {
    showInformationToast(informationMessage, autoCloseLengthInSeconds, notificationTypes.FORM);
  };

  const showInformationToast = (informationMessage, autoCloseLengthInSeconds, notificationType = notificationTypes.UNKNOWN) => {
    let id = generateUUID();
    let informationToast = getInformationToast(informationMessage, id, autoCloseLengthInSeconds);
    addToast(informationToast, id, notificationType);
  };

  const showFormValidationErrorDialog = (errorMessage = "") => {
    let id = generateUUID();
    let errorToast = getErrorToast(undefined, id, `WARNING! There are errors in your form. ${errorMessage} Please review the details and ensure any required fields or special rules are met and try again.`);
    addToast(errorToast, id, notificationTypes.FORM);
  };

  const showFormValidationErrorBanner = (errorMessage = "") => {
    let id = generateUUID();
    let errorToast = getErrorToast(undefined, id, `WARNING! There are errors in your form. ${errorMessage} Please review the details and ensure any required fields or special rules are met and try again.`);
    addToast(errorToast, id, notificationTypes.FORM);
  };

  const showFormValidationErrorToast = (errorMessage = "") => {
    let id = generateUUID();
    let errorToast = getErrorToast(undefined, id, `WARNING! There are errors in your form. ${errorMessage} Please review the details and ensure any required fields or special rules are met and try again.`);
    addToast(errorToast, id, notificationTypes.FORM);
  };

  const showInlineFormValidationError = (errorMessage = "") => {
    let id = generateUUID();
    let inlineErrorBanner = getInlineErrorBanner(`WARNING! There are errors in your form. ${errorMessage} Please review the details and ensure any required fields or special rules are met and try again.`, id);
    setInlineMessage(inlineErrorBanner, id, notificationTypes.FORM);
  };

  // TODO: Phase this out on many screens. Instead of showing loading error, find way to make it look better (like the data not found container) where relevant
  const showLoadingErrorDialog = (error) => {
    const id = generateUUID();
    const errorToast = getErrorToast(error, id, `WARNING! An error has occurred loading:`);
    addToast(errorToast, id, notificationTypes.SYSTEM);
  };

  const showServiceUnavailableDialog = (error) => {
    let id = generateUUID();
    let errorBanner = getErrorBanner(error, id, `Service Unavailable. Please try again or report this issue:`);
    addBannerMessage(errorBanner, id, notificationTypes.SYSTEM);
  };

  const showPipelineDropdownOptionsUnavailableBanner = (field, error) => {
    const customMessage = "Please review the settings for the tool associated with this step in order to resolve the issue. ";
    showDropdownOptionsUnavailableBanner(field, error, customMessage);
  };

  const showDropdownOptionsUnavailableBanner = (field, error, customMessage) => {
    let id = generateUUID();
    console.error(error);
    let errorBanner = getErrorBanner(undefined, id,
      `There was an issue pulling select options for the field ${field.label}. 
      ${customMessage}
      You can check the error logs for details on the specific error.
      `);
    addBannerMessage(errorBanner, id, notificationTypes.SYSTEM);
  };

  const showUpdateSuccessResultDialog = (type, autoCloseLengthInSeconds = 10) => {
    let id = generateUUID();
    let successToast = getSuccessToast(`${type} updated successfully!`, id, autoCloseLengthInSeconds);
    removeFormToasts();
    addToast(successToast, id, notificationTypes.FORM);
  };

  const showResetSuccessToast = (type, autoCloseLengthInSeconds = 10) => {
    let id = generateUUID();
    let successToast = getSuccessToast(`${type} reset successfully!`, id, autoCloseLengthInSeconds);
    removeFormToasts();
    addToast(successToast, id, notificationTypes.FORM);
  };

  const showResetFailureToast = (type, error) => {
    let id = generateUUID();
    let errorToast = getErrorToast(error, id, `WARNING! An error has occurred resetting this ${type}:`);
    addToast(errorToast, id, notificationTypes.FORM);
  };

  const showDeleteSuccessResultDialog = (type, autoCloseLengthInSeconds = 10) => {
    let id = generateUUID();
    let successToast = getSuccessToast(`${type} deleted successfully!`, id, autoCloseLengthInSeconds);
    removeFormToasts();
    addToast(successToast, id, notificationTypes.FORM);
  };

  const showSaveSuccessToast = (type, autoCloseLengthInSeconds = 10) => {
    let id = generateUUID();
    let successToast = getSuccessToast(`${type} saved successfully!`, id, autoCloseLengthInSeconds);
    removeFormToasts();
    addToast(successToast, id, notificationTypes.FORM);
  };

  const showSaveFailureToast = (type, error) => {
    let id = generateUUID();
    let errorToast = getErrorToast(error, id, `WARNING! An error has occurred saving this ${type}:`);
    addToast(errorToast, id, notificationTypes.FORM);
  };

  const showCreateSuccessResultDialog = (type, autoCloseLengthInSeconds = 10) => {
    let id = generateUUID();
    let successToast = getSuccessToast(`${type} created successfully!`, id, autoCloseLengthInSeconds);
    removeFormToasts();
    addToast(successToast, id, notificationTypes.FORM);
  };

  const showCreateFailureResultDialog = (type, error) => {
    let id = generateUUID();
    let errorToast = getErrorToast(error, id, `WARNING! An error has occurred creating this ${type}:`);
    addToast(errorToast, id, notificationTypes.FORM);
  };

  const showInlineCreateFailureResultDialog = (type, error) => {
    let id = generateUUID();
    let inlineErrorBanner = getInlineErrorBanner(error, id, `WARNING! An error has occurred creating this ${type}:`);
    setInlineMessage(inlineErrorBanner, id, notificationTypes.FORM);
  };
  const showUpdateFailureResultDialog = (type, error) => {
    let id = generateUUID();
    let errorToast = getErrorToast(error, id, `WARNING! An error has occurred updating this ${type}:`);
    addToast(errorToast, id, notificationTypes.FORM);
  };

  const showInlineUpdateFailureMessage = (type, error) => {
    let id = generateUUID();
    let inlineErrorBanner = getInlineErrorBanner(error, id, `WARNING! An error has occurred updating this ${type}:`);
    setInlineMessage(inlineErrorBanner, id, notificationTypes.FORM);
  };

  const showDeleteFailureResultDialog = (type, error) => {
    let id = generateUUID();
    let errorToast = getErrorToast(error, id, `WARNING! An error has occurred deleting this ${type}:`);
    addToast(errorToast, id, notificationTypes.FORM);
  };

  const showEmailAlreadyExistsErrorDialog = () => {
    let id = generateUUID();
    let errorBanner = getErrorBanner(`WARNING! The email address given has already been registered to an Opsera account`, id);
    addBannerMessage(errorBanner, id, notificationTypes.FORM);
  };

  const showDomainAlreadyRegisteredErrorDialog = () => {
    let id = generateUUID();
    let errorBanner = getErrorBanner(`WARNING! The domain given has already been registered to an Opsera account`, id);
    addBannerMessage(errorBanner, id, notificationTypes.FORM);
  };

  const showSavingIncompleteObjectSuccessResultToast = () => {
    let id = generateUUID();
    let informationToast = getInformationToast(`WARNING! An incomplete configuration is being saved.  This step must be fully configured in order to use this feature.`, id);
    addToast(informationToast, id, notificationTypes.FORM);
  };

  const showMissingRequiredFieldsErrorDialog = () => {
    let id = generateUUID();
    let errorToast = getErrorToast(`Required Fields Missing!`, id);
    addToast(errorToast, id, notificationTypes.FORM);
  };

  const showOverlayPanel = (overlayPanel) => {
    addOverlayPanel(overlayPanel);
  };

  const showInlineErrorMessage = (error, prependMessage) => {
    let id = generateUUID();
    let inlineErrorBanner = getInlineErrorBanner(error, id, prependMessage);
    setInlineMessage(inlineErrorBanner, id, notificationTypes.FORM);
  };

  const getSuccessBanner = (message, id) => {
    return (
      <SuccessBanner
        successMessage={message}
        removeBanner={removeBannerMessage}
        id={id}
      />
    );
  };

  const getSuccessToast = (message, id, autoCloseLengthInSeconds = 10) => {
    return (
      <SuccessToast
        successMessage={message}
        id={id}
        removeToast={removeToast}
        autoCloseLength={autoCloseLengthInSeconds}
      />
    );
  };

  const getErrorBanner = (error, id, prependMessage = "") => {
    return (
      <ErrorBanner
        error={error}
        prependMessage={prependMessage}
        id={id} removeBanner={removeBannerMessage}
      />
    );
  };

  const getInlineErrorBanner = (error, id, prependMessage = "") => {
    return (
      <InlineError
        error={error}
        prependMessage={prependMessage}
        id={id}
        removeInlineMessage={removeInlineMessage}
      />
    );
  };

  const getErrorToast = (error, id, prependMessage = "", autoCloseLengthInSeconds) => {
    return (
      <ErrorToast
        error={error}
        prependMessage={prependMessage}
        id={id}
        removeToast={removeToast}
        autoCloseLength={autoCloseLengthInSeconds}
      />
    );
  };

  const getWarningBanner = (message, id) => {
    return (
      <WarningBanner
        warningMessage={message}
        removeBanner={removeBannerMessage}
        id={id}
      />
    );
  };

  const getWarningToast = (message, id, autoCloseLengthInSeconds) => {
    return (
      <WarningToast
        warningMessage={message}
        id={id}
        removeToast={removeToast}
        autoCloseLength={autoCloseLengthInSeconds}
      />
    );
  };

  const getInformationBanner = (message, id) => {
    return (
      <InformationBanner
        informationMessage={message}
        removeBanner={removeBannerMessage}
        id={id}
      />
    );
  };

  const getInformationToast = (message, id, autoCloseLengthInSeconds) => {
    return (
      <InformationToast
        informationMessage={message}
        id={id}
        removeToast={removeToast}
        autoCloseLength={autoCloseLengthInSeconds}
      />
    );
  };

  const getInlineBanner = () => {
    return <>{inlineBanner ? inlineBanner.bannerMessage : null}</>;
  };

  //TMP Solution to bypass array
  //Currently used in PipelineActionControls around puased useeffect, so update there.
  const clearToastsArray = () => {
    setToasts([]);
  };

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

        showInlineCreateFailureResultDialog: showInlineCreateFailureResultDialog,
        showInlineFormValidationError: showInlineFormValidationError,

        // TODO: Remove instances
        showInformationToast: showInformationToast,

        // TODO: Rename to Banner instead of dialog for clarity
        showEmailAlreadyExistsErrorDialog: showEmailAlreadyExistsErrorDialog,
        showDomainAlreadyRegisteredErrorDialog: showDomainAlreadyRegisteredErrorDialog,
        showServiceUnavailableDialog: showServiceUnavailableDialog,
        showDropdownOptionsUnavailableBanner: showDropdownOptionsUnavailableBanner,
        showPipelineDropdownOptionsUnavailableBanner: showPipelineDropdownOptionsUnavailableBanner,
        showLoadingErrorDialog: showLoadingErrorDialog,

        // Success Banners
        showFormSuccessBanner: showFormSuccessBanner,
        showSystemSuccessBanner: showSystemSuccessBanner,

        // Success Toasts
        showFormSuccessToast: showFormSuccessToast,
        showSystemSuccessToast: showSystemSuccessToast,
        showSaveSuccessToast: showSaveSuccessToast,
        showSaveFailureToast: showSaveFailureToast,
        showResetSuccessToast: showResetSuccessToast,

        // Information Banners
        showSystemInformationBanner: showSystemInformationBanner,
        showFormInformationBanner: showFormInformationBanner,

        // Information Toasts
        showSystemInformationToast: showSystemInformationToast,
        showFormInformationToast: showFormInformationToast,
        showSavingIncompleteObjectSuccessResultToast: showSavingIncompleteObjectSuccessResultToast,

        // Warning Banners
        showSystemWarningBanner: showSystemWarningBanner,
        showFormWarningBanner: showFormWarningBanner,

        // Warning Toasts
        showSystemWarningToast: showSystemWarningToast,
        showFormWarningToast: showFormWarningToast,

        // Error Banners
        showSystemErrorBanner: showSystemErrorBanner,
        showFormErrorBanner: showFormErrorBanner,
        showFormValidationErrorBanner: showFormValidationErrorBanner,

        // Error Toasts
        showSystemErrorToast: showSystemErrorToast,
        showFormErrorToast: showFormErrorToast,
        showFormValidationErrorToast: showFormValidationErrorToast,
        showResetFailureToast: showResetFailureToast,

        //Inline Errors
        showInlineErrorMessage: showInlineErrorMessage,
        showInlineUpdateFailureMessage: showInlineUpdateFailureMessage,

        // TODO: Remove when everything is using the banner ones.
        showWarningDialog: showWarningBanner,
        showErrorDialog: showErrorBanner,

        removeAllBanners: removeAllBanners,
        removeFormBanners: removeFormBanners,
        removeAllToasts: removeAllToasts,
        removeFormToasts: removeFormToasts,
        getInlineBanner: getInlineBanner,
        removeInlineMessage: removeInlineMessage,

        clearToastsArray: clearToastsArray, //tmp solution till next version of toasts

        showOverlayPanel: showOverlayPanel,
        clearOverlayPanel: clearOverlayPanel,
        showModal: showModal,
        clearModal: clearModal
      }}>
      <OverlayPanelContainer overlayPanel={overlayPanel}/>
      {navBar}
      <SiteNotificationDisplayer/>
      <BannerMessageContainer bannerMessages={bannerMessages}/>
      {children}
      <Toaster toasts={toasts}/>
    </DialogToastContext.Provider>
  );
}

ToastContextProvider.propTypes = {
  children: PropTypes.any,
  navBar: PropTypes.object
};

export const DialogToastContext = createContext(ToastContextProvider);
export default ToastContextProvider;
