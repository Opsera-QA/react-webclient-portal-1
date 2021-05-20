import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import OverlayTitleBar from "components/common/overlays/OverlayTitleBar";
import CloseButton from "components/common/buttons/CloseButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";

function CenterOverlayContainer({ children, actionBar, titleText, titleIcon, showPanel, closePanel, isLoading, showToasts, showCloseButton, buttonContainer, fullWidth}) {
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
          <CloseButton className={"p-3"} size={"sm"} closeEditorCallback={closePanel} showUnsavedChangesMessage={false} />
        </SaveButtonContainer>
      );
    }
  };

  const getStyling = () => {
    if (fullWidth === true) {
      return ("full-width-center-overlay content-card-1 bg-white");
    }

    return ("center-overlay content-card-1 bg-white");
  };

  if (!showPanel) {
    return null;
  }

  return (
    <div className={`overlay-panel center-overlay-shadow-background`}>
      <div className={getStyling()}>
        <OverlayTitleBar handleClose={closePanel} isLoading={isLoading} titleText={titleText} titleIcon={titleIcon} />
        {actionBar}
        <div className={"overlay-panel-body bg-white"}>
          {showToasts && toastContext?.getInlineBanner()}
          {children}
        </div>
        <div className={"mt-auto"}>
          {getButtons()}
        </div>
      </div>
    </div>
  );
}

CenterOverlayContainer.propTypes = {
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
  fullWidth: PropTypes.bool
};

CenterOverlayContainer.defaultProps = {
  showCloseButton: true
};

export default CenterOverlayContainer;


