import React, {useContext} from "react";
import PropTypes from "prop-types";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {DialogToastContext} from "contexts/DialogToastContext";

function RoleAccessEditorHelpOverlay({ isLoading, helpComponent}) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  if (helpComponent == null) {
    return null;
  }

  return (
    <HelpOverlayBase
      handleClose={closePanel}
      showPanel={true}
      isLoading={isLoading}
      closePanel={closePanel}
      titleText={"Rule Base Access"}
    >
      <div className={"mt-2"}>
        {helpComponent}
      </div>
    </HelpOverlayBase>
  );
}

RoleAccessEditorHelpOverlay.propTypes = {
  isLoading: PropTypes.bool,
  helpComponent: PropTypes.node
};

export default RoleAccessEditorHelpOverlay;


