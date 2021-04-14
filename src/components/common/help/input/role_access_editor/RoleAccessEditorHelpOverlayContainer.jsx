import React, {useContext} from "react";
import PropTypes from "prop-types";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {DialogToastContext} from "contexts/DialogToastContext";

function RoleAccessEditorHelpOverlayContainer({ isLoading, children}) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  if (children == null) {
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
        <div className={"mb-2"}>
          Access Rules define who has privileges to interact with a resource.
          Individual users or groups can be used to grant the access.
        </div>
        {children}
      </div>
    </HelpOverlayBase>
  );
}

RoleAccessEditorHelpOverlayContainer.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node
};

export default RoleAccessEditorHelpOverlayContainer;


