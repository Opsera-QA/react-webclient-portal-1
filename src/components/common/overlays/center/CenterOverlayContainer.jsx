import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import OverlayTitleBar from "components/common/overlays/OverlayTitleBar";
import CloseButton from "components/common/buttons/CloseButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import LoadingDialog from "components/common/status_notifications/loading";

export const CENTER_OVERLAY_SIZES = {
  FULL_WIDTH: "full_width", // TODO: Remove?
  STANDARD: "standard",
  SMALL: "small",
};

const CENTER_OVERLAY_PANEL_HEIGHTS = {
  CONTAINER: "calc(100% - 20px)",
  BODY: "calc(100% - 48px)",
};

function CenterOverlayContainer(
  {
    children,
    actionBar,
    titleText,
    titleIcon,
    showPanel,
    closePanel,
    isLoading,
    showToasts,
    showCloseButton,
    buttonContainer,
    pageLink,
    linkTooltipText,
    size,
  }) {
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

    if (showCloseButton !== false) {
      return (
        <SaveButtonContainer>
          <CloseButton className={"p-3"} size={"sm"} closeEditorCallback={closePanel} showUnsavedChangesMessage={false} />
        </SaveButtonContainer>
      );
    }
  };

  const getContainerStyling = () => {
    switch (size) {
      case (CENTER_OVERLAY_SIZES.FULL_WIDTH):
        return ("full-width-center-overlay");
      case (CENTER_OVERLAY_SIZES.SMALL):
        return ("small-center-overlay");
      case (CENTER_OVERLAY_SIZES.STANDARD):
      default:
        return ("center-overlay");
    }
  };

  const getStyling = () => {
    const containerStyle = getContainerStyling();
    return (`${containerStyle} content-card-1 bg-white`);
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
      <div className={getStyling()}>
        <OverlayTitleBar
          handleClose={closePanel}
          isLoading={isLoading}
          titleText={titleText}
          titleIcon={titleIcon}
          pageLink={pageLink}
          linkTooltipText={linkTooltipText}
        />
        {actionBar}
        <div className={"overlay-panel-body bg-white"}>
          {showToasts && toastContext?.getInlineBanner()}
          {getBody()}
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
  pageLink: PropTypes.string,
  linkTooltipText: PropTypes.string,
  size: PropTypes.string,
};

export default CenterOverlayContainer;


