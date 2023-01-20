import React from "react";
import PropTypes from "prop-types";
import {faShareAlt} from "@fortawesome/pro-light-svg-icons";
import ActionBarPopoverButton from "components/common/actions/buttons/ActionBarPopoverButton";
import ToolOwnershipTransferOverlay from "components/inventory/tools/action_bar/ToolOwnershipTransferOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";

function ActionBarTransferToolButton(
  {
    toolModel,
    loadTool,
    className,
  }) {
  const {
    isSassUser,
    toastContext,
  } = useComponentStateReference();

  const launchOwnershipTransferOverlay = () => {
    toastContext.showOverlayPanel(
      <ToolOwnershipTransferOverlay
        toolModel={toolModel}
        loadTool={loadTool}
        type={"Tool"}
      />,
    );
  };

  if (isSassUser !== false || toolModel?.canTransferRegistryToolOwnership() !== true) {
    return null;
  }

  return (
    <div className={className}>
      <ActionBarPopoverButton
        icon={faShareAlt}
        popoverText={`Transfer Tool to new Owner`}
        onClickFunction={launchOwnershipTransferOverlay}
      />
    </div>
  );
}

ActionBarTransferToolButton.propTypes = {
  toolModel: PropTypes.object,
  loadTool: PropTypes.func,
  className: PropTypes.string
};

export default ActionBarTransferToolButton;