import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import OverlayTitleBar from "components/common/overlays/OverlayTitleBar";
import CloseButton from "components/common/buttons/CloseButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import LoadingDialog from "components/common/status_notifications/loading";

function ConfirmationOverlay({ children, actionBar, titleText, titleIcon, showPanel, closePanel, isLoading, showToasts, showCloseButton, buttonContainer, pageLink, linkTooltipText }) {
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    if (showToasts) {
      toastContext.removeInlineMessage();
    }
  }, [showPanel]);

  const getButtons = () => {
    if (buttonContainer) {
      return buttonContainer;
    }

    if (showCloseButton === true) {
      return (
        <SaveButtonContainer>
          <CloseButton
            className={"p-3"}
            size={"sm"}
            closeEditorCallback={closePanel}
            showUnsavedChangesMessage={false}
          />
        </SaveButtonContainer>
      );
    }
  };

  const getBody = () => {
    if (isLoading) {
      return (<LoadingDialog message={"Loading Data"} size={"sm"} />);
    }

    return children;
  };

  if (!showPanel) {
    return null;
  }

  return (
    <div className={`overlay-panel center-overlay-shadow-background`}>
      <div className={"confirmation-overlay-panel"}>
        <div className={"confirmation-overlay content-card-1 bg-white"}>
          <OverlayTitleBar
            handleClose={closePanel}
            isLoading={isLoading}
            titleText={titleText}
            titleIcon={titleIcon}
            pageLink={pageLink}
            linkTooltipText={linkTooltipText}
          />
          {actionBar}
          <div className={"confirmation-overlay-panel-body bg-white"}>
            {showToasts && toastContext?.getInlineBanner()}
            <div className={"d-flex p-3 confirmation-overlay-panel-body-text"}>
              {getBody()}
            </div>
          </div>
          <div className={"mt-auto bg-white"}>
            {getButtons()}
          </div>
        </div>
      </div>
    </div>
  );
}

ConfirmationOverlay.propTypes = {
  children: PropTypes.any,
  titleText: PropTypes.string,
  showPanel: PropTypes.bool,
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  showToasts: PropTypes.bool,
  actionBar: PropTypes.object,
  showCloseButton: PropTypes.bool,
  buttonContainer: PropTypes.object,
  pageLink: PropTypes.string,
  linkTooltipText: PropTypes.string,
};

ConfirmationOverlay.defaultProps = {
  showCloseButton: true,
};

export default ConfirmationOverlay;


