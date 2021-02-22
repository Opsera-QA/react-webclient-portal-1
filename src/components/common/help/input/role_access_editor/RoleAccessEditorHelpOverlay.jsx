import React, {useState} from "react";
import PropTypes from "prop-types";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function RoleAccessEditorHelpOverlay({ isLoading}) {
  const [showPanel, setShowPanel] = useState(true);

  const closePanel = () => {
    setShowPanel(false);
  }

  return (
    <HelpOverlayBase handleClose={closePanel} showPanel={showPanel} isLoading={isLoading} closePanel={closePanel}>
      <div>This is a help document</div>
    </HelpOverlayBase>
  );
}

RoleAccessEditorHelpOverlay.propTypes = {
  isLoading: PropTypes.bool,
};

export default RoleAccessEditorHelpOverlay;


