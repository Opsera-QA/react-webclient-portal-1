import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import OverlayTitleBar from "components/common/overlays/OverlayTitleBar";
import CloseButton from "components/common/buttons/CloseButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import Row from "react-bootstrap/Row";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import OverlayContainerBase from "components/common/overlays/OverlayContainerBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import {heightHelper} from "temp-library-components/helpers/height/height.helper";

export default function OverlayContainer(
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
    customLoadingMessage,
    externalHelpPageLink,
    backButtonFunction,
    minimumHeight,
    maximumHeight,
    getHelpComponentFunction,
    softLoading,
    titleActionBar,
  }) {
  const [helpIsShown, setHelpIsShown] = useState(false);
  const {
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    if (showToasts) {
      toastContext.removeInlineMessage();
    }
  }, []);

  const closePanelFunction = () => {
    if (closePanel) {
      closePanel();
    } else {
      toastContext.clearOverlayPanel();
    }
  };

  const getButtonContainer = () => {
    if (buttonContainer) {
      return (
        <div className={"mt-auto bg-white"}>
          {buttonContainer}
        </div>
      );
    }

    if (showCloseButton !== false) {
      return (
        <div className={"mt-auto bg-white p-3"}>
          <SaveButtonContainer
            extraButtons={
              <BackButtonBase
                backButtonFunction={backButtonFunction}
              />
            }
          >
            <CloseButton
              closeEditorCallback={closePanelFunction}
              showUnsavedChangesMessage={false}
            />
          </SaveButtonContainer>
        </div>
      );
    }
  };

  const getBody = () => {
    if (isLoading) {
      return (
        <CenteredContentWrapper>
          <CenterLoadingIndicator
            minHeight={heightHelper.subtractTitleBarHeightForCssHeight(minimumHeight)}
            customMessage={customLoadingMessage}
          />
        </CenteredContentWrapper>
      );
    }

    if (helpIsShown === true && getHelpComponentFunction && getHelpComponentFunction(setHelpIsShown)) {
      return (
        <div className={"p-2"}>
          {getHelpComponentFunction(setHelpIsShown)}
        </div>
      );
    }

    return children;
  };

  return (
    <OverlayContainerBase>
      <Row className={"m-auto d-flex"}>
        <div
          className={`bg-white overlay-wrapper overlay-container w-100`}
          style={{
            minHeight: minimumHeight,
            maxHeight: maximumHeight,
            minWidth: "calc(100vw - 140px)",
            marginLeft: "70px",
            marginRight: "70px",
          }}
        >
          <OverlayTitleBar
            handleClose={closePanelFunction}
            isLoading={isLoading}
            titleText={titleText}
            titleIcon={titleIcon}
            pageLink={pageLink}
            externalHelpPageLink={externalHelpPageLink}
            linkTooltipText={linkTooltipText}
            softLoading={softLoading}
            titleActionBar={titleActionBar}
          />
          {actionBar}
          <div className={`bg-white w-100`}>
            {showToasts && toastContext?.getInlineBanner()}
            {getBody()}
          </div>
          {getButtonContainer()}
        </div>
      </Row>
    </OverlayContainerBase>
  );
}

OverlayContainer.propTypes = {
  children: PropTypes.any,
  titleText: PropTypes.string,
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func,
  isLoading: PropTypes.bool,
  showToasts: PropTypes.bool,
  actionBar: PropTypes.object,
  showCloseButton: PropTypes.bool,
  softLoading: PropTypes.bool,
  buttonContainer: PropTypes.object,
  pageLink: PropTypes.string,
  linkTooltipText: PropTypes.string,
  size: PropTypes.string,
  customLoadingMessage: PropTypes.string,
  externalHelpPageLink: PropTypes.string,
  backButtonFunction: PropTypes.func,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
  getHelpComponentFunction: PropTypes.func,
  titleActionBar: PropTypes.any,
};
