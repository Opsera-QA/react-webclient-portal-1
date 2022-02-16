import React from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faTrash} from "@fortawesome/pro-light-svg-icons";

function DeleteOverlay(
  {
    children,
    titleIcon,
    objectType,
    closePanel,
    size,
  }) {
  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Confirm ${objectType} Delete`}
      titleIcon={titleIcon}
      showToasts={true}
      showCloseButton={false}
      size={size}
    >
      {children}
    </CenterOverlayContainer>
  );
}

DeleteOverlay.propTypes = {
  children: PropTypes.any,
  objectType: PropTypes.string,
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func,
  size: PropTypes.string,
};

DeleteOverlay.defaultProps = {
  titleIcon: faTrash,
};

export default DeleteOverlay;


