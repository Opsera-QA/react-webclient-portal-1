import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import OverlayTitleBar from "components/common/overlays/OverlayTitleBar";
import CloseButton from "components/common/buttons/CloseButton";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";

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

  const getButtons = () => {
    if (buttonContainer) {
      return buttonContainer;
    }

    if (showCloseButton === true) {
      return (
        <div className={"p-3"}>
          <Row className="mx-0 mt-auto d-flex">
            <div className="ml-auto d-flex">
              <CloseButton size={"sm"} closeEditorCallback={closePanel} showUnsavedChangesMessage={false}/>
            </div>
          </Row>
        </div>
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
        <div className={"full-screen-center-overlay content-card-1"}>
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
              {getBody()}
            </div>
          </div>
        </div>
        {getButtons()}
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
  linkTooltipText: PropTypes.string
};

FullScreenCenterOverlayContainer.defaultProps = {
  showCloseButton: true
};

export default FullScreenCenterOverlayContainer;


