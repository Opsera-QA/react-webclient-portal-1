import React, {useContext} from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {DialogToastContext} from "contexts/DialogToastContext";

function CreateCenterPanel(
  {
    children,
    titleIcon,
    objectType,
    closePanel,
    size,
    isMounted,
    loadData,
    backButtonFunction,
    buttonContainer,
  }) {
  const toastContext = useContext(DialogToastContext);

  // TODO: Remove this and wire up handleClose directly,
  //  if we update every instance to just pass in what's necessary on close
  const handleClosingPanel = () => {
    if (closePanel == null) {
      handleClose();
    }
    else {
      closePanel();
    }
  };

  const handleClose = () => {
    if (isMounted?.current === true && loadData != null) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CenterOverlayContainer
      closePanel={handleClosingPanel}
      titleText={`Create New ${objectType}`}
      titleIcon={titleIcon}
      showToasts={true}
      showCloseButton={backButtonFunction != null}
      size={size}
      backButtonFunction={backButtonFunction}
      buttonContainer={buttonContainer}
    >
      <div className={"bg-white h-100 w-100"}>
        {children}
      </div>
    </CenterOverlayContainer>
  );
}

CreateCenterPanel.propTypes = {
  children: PropTypes.any,
  objectType: PropTypes.string,
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func,
  size: PropTypes.string,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  backButtonFunction: PropTypes.func,
  buttonContainer: PropTypes.any,
};

export default CreateCenterPanel;


