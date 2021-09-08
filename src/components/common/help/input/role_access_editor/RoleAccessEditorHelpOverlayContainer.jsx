import React, {useContext} from "react";
import PropTypes from "prop-types";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {DialogToastContext} from "contexts/DialogToastContext";

function RoleAccessEditorHelpOverlayContainer({ isLoading, children}) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div>
          <div className={"mb-3"}>
            <b>Access Rules,</b> or <b>Rule Based Access Controls (RBAC) </b>define who has privileges to interact with a resource.
            Individual users or groups can be used to grant the access.
          </div>
          {children}
        </div>
      </div>
    );
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
      titleText={"Access Rules Help"}
      helpTopic={"Access Rules"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}

RoleAccessEditorHelpOverlayContainer.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node
};

export default RoleAccessEditorHelpOverlayContainer;


