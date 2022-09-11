import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import OverlayTitleBar from "components/common/overlays/OverlayTitleBar";
import CloseButton from "components/common/buttons/CloseButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import Row from "react-bootstrap/Row";
import CenterOverlayContainerWrapper from "components/common/overlays/center/CenterOverlayContainerWrapper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

export const CENTER_OVERLAY_SIZES = {
  FULL_WIDTH: "full_width", // TODO: Remove?
  STANDARD: "standard",
  SMALL: "small",
  CUSTOM: "custom",
};

// TODO: Make new base that can handle this better, for now hardcoding these things here
const titleHeight = "48px";
const topAndBottomMarginsPlusFooter = `${10 + 10 + 40}px`;
const buttonContainerHeightWithPadding = "70px";
export const OVERLAY_PANEL_MIN_HEIGHT = `500px`;
export const OVERLAY_PANEL_MIN_HEIGHT_MINUS_TITLE = `calc(${OVERLAY_PANEL_MIN_HEIGHT} - ${titleHeight})`;
export const FULL_CENTER_OVERLAY_PANEL_BODY_HEIGHT = `calc(100vh - ${titleHeight} - ${topAndBottomMarginsPlusFooter})`;
export const FULL_CENTER_OVERLAY_PANEL_BODY_HEIGHT_MINUS_BUTTONS = `calc(${FULL_CENTER_OVERLAY_PANEL_BODY_HEIGHT} - ${buttonContainerHeightWithPadding})`;

// TODO: Refactor
function CenterOverlayContainer(
  {
    children,
    actionBar,
    titleText,
    titleIcon,
    bodyClassName,
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
  }, []);

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

  const getBody = () => {
    if (isLoading) {
      return (
        <CenterLoadingIndicator
          minHeight={OVERLAY_PANEL_MIN_HEIGHT}
          customMessage={"Initializing Workflow Options"}
        />
      );
    }

    return children;
  };

  return (
    <div className={`overlay-panel center-overlay-shadow-background`}>
      <Row
        style={{
          margin: "10px",
        }}
      >
        <CenterOverlayContainerWrapper
          size={size}
        >
          <div
            className={`content-card-1 bg-white`}
          >
            <OverlayTitleBar
              handleClose={closePanel}
              isLoading={isLoading}
              titleText={titleText}
              titleIcon={titleIcon}
              pageLink={pageLink}
              linkTooltipText={linkTooltipText}
            />
            {actionBar}
            <div className={`bg-white ${bodyClassName}`}>
              {showToasts && toastContext?.getInlineBanner()}
              {getBody()}
            </div>
            <div className={"mt-auto bg-white"}>
              {getButtons()}
            </div>
          </div>
        </CenterOverlayContainerWrapper>
      </Row>
    </div>
  );
}

CenterOverlayContainer.propTypes = {
  children: PropTypes.any,
  titleText: PropTypes.string,
  bodyClassName: PropTypes.string,
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

CenterOverlayContainer.defaultProps = {
  bodyClassName: "overlay-panel-body",
};

export default CenterOverlayContainer;


