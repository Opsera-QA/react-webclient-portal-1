import React, {useContext} from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {DialogToastContext} from "contexts/DialogToastContext";

function UpdateCenterPanelOverlayBase(
  {
    children,
    titleIcon,
    objectType,
    size,
    isMounted,
    loadData,
  }) {
  const toastContext = useContext(DialogToastContext);

  const handleClose = () => {
    if (isMounted?.current === true && loadData != null) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CenterOverlayContainer
      closePanel={handleClose}
      showPanel={true}
      titleText={`Update ${objectType}`}
      titleIcon={titleIcon}
      showToasts={true}
      showCloseButton={false}
      size={size}
    >
      {children}
    </CenterOverlayContainer>
  );
}

UpdateCenterPanelOverlayBase.propTypes = {
  children: PropTypes.any,
  objectType: PropTypes.string,
  titleIcon: PropTypes.object,
  size: PropTypes.string,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
};

export default UpdateCenterPanelOverlayBase;


