import React from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faTrash} from "@fortawesome/pro-light-svg-icons";

// DON'T USE THIS
function DeleteCenterPanel(
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
      titleText={`Delete ${objectType}`}
      titleIcon={titleIcon}
      showToasts={true}
      showCloseButton={false}
      size={size}
    >
      {children}
    </CenterOverlayContainer>
  );
}

DeleteCenterPanel.propTypes = {
  children: PropTypes.any,
  objectType: PropTypes.string,
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func,
  size: PropTypes.string,
};

DeleteCenterPanel.defaultProps = {
  titleIcon: faTrash,
};

export default DeleteCenterPanel;


