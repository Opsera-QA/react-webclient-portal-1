import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import OverlayTitleBar from "components/common/overlays/OverlayTitleBar";
import CloseButton from "components/common/buttons/CloseButton";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";

function FullScreenCenterOverlayContainer(
  {
    children,
    actionBar,
    titleText,
    titleIcon,
    closePanel,
    isLoading,
    showToasts,
    showCloseButton,
    showCloseBackButton,
    buttonContainer,
    pageLink,
    linkTooltipText,
  }) {
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    if (showToasts) {
      toastContext.removeInlineMessage();
    }
  }, [showToasts]);

  const getCloseBackButton = () => {
    if (showCloseBackButton === true) {
      return (
        <BackButtonBase
          size={"sm"}
          backButtonFunction={closePanel}
        />
      );
    }
  };

  const getButtons = () => {
    if (buttonContainer) {
      return buttonContainer;
    }

    if (showCloseButton === true) {
      return (
        <ButtonContainerBase
          className={"p-3"}
          leftSideButtons={getCloseBackButton()}
        >
          <CloseButton size={"sm"} closeEditorCallback={closePanel} showUnsavedChangesMessage={false}/>
        </ButtonContainerBase>
      );
    }
  };

  const getBody = () => {
    if (isLoading) {
      return (<LoadingDialog message={"Loading Data"} size={"sm"} />);
    }

    return children;
  };

  return (
    <div className={`overlay-panel center-overlay-shadow-background`}>
      <div className={"overlay-margin bg-white"}>
        <div className={
          showCloseButton === true || buttonContainer != null
            ? "full-screen-center-overlay-with-buttons content-card-1"
            : "full-screen-center-overlay content-card-1"
        }>
          <OverlayTitleBar
            handleClose={closePanel}
            isLoading={isLoading}
            titleText={titleText}
            titleIcon={titleIcon}
            pageLink={pageLink}
            linkTooltipText={linkTooltipText}
          />
          <div>
            {actionBar}
            <div className={showCloseButton === true || buttonContainer != null ? "full-screen-overlay-panel-body-with-buttons" : "full-screen-overlay-panel-body"}>
              {showToasts && toastContext?.getInlineBanner()}
              <div className={"bg-white"}>
                {getBody()}
              </div>
            </div>
          </div>
        </div>
        <div className={"mt-auto bg-white"}>
          {getButtons()}
        </div>
      </div>
    </div>
  );
}

FullScreenCenterOverlayContainer.propTypes = {
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
  showCloseBackButton: PropTypes.bool,
};

FullScreenCenterOverlayContainer.defaultProps = {
  showCloseButton: true
};

export default FullScreenCenterOverlayContainer;


