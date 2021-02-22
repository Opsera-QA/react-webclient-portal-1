import React, {useContext} from "react";
import PropTypes from "prop-types";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {DialogToastContext} from "contexts/DialogToastContext";

function RoleAccessEditorHelpOverlay({ isLoading}) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  }

  return (
    <HelpOverlayBase handleClose={closePanel} showPanel={true} isLoading={isLoading} closePanel={closePanel}>
      <div>This is a help document</div>
    </HelpOverlayBase>
  );
}

RoleAccessEditorHelpOverlay.propTypes = {
  isLoading: PropTypes.bool,
};

export default RoleAccessEditorHelpOverlay;


