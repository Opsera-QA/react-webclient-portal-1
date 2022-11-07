import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import toolsActions from "components/inventory/tools/tools-actions";
import RoleHelper from "@opsera/know-your-role/roles/role.helper";
import OwnershipTransferOverlayBase from "components/common/overlays/center/ownership/OwnershipTransferOverlayBase";
import { useHistory } from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";
import OwnershipTransferConfirmationOverlay
  from "components/common/overlays/center/ownership/OwnershipTransferConfirmationOverlay";

export default function ToolOwnershipTransferOverlay(
  {
    toolModel,
    loadTool,
  }) {
  const history = useHistory();
  const [toolCopy, setToolCopy] = useState(undefined);
  const {
    cancelTokenSource,
    isSassUser,
    getAccessToken,
    userData,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setToolCopy(toolModel?.clone());
  }, [toolModel]);

  const transferToolOwnership = async (willLoseAccess) => {
    const response = await toolsActions.transferToolOwnership(getAccessToken, cancelTokenSource, toolCopy);

    if (willLoseAccess !== true) {
      await loadTool();
    } else {
      history.push("/inventory");
    }

    return response;
  };

  const launchOwnershipTransferConfirmation = async () => {
    document.body.click();
    const willLoseAccess = RoleHelper.willLoseAccessIfOwnerChanged(
      userData,
      toolModel?.getOriginalData(),
      toolCopy?.getData("owner"),
    );

    toastContext.showOverlayPanel(
      <OwnershipTransferConfirmationOverlay
        ownershipTransferFunction={() => transferToolOwnership(willLoseAccess)}
        type={"Tool"}
        willLoseAccess={willLoseAccess}
        closePanelFunction={handleClosePanelFunction}
      />,
    );
  };

  const handleClosePanelFunction = () => {
    toastContext.clearOverlayPanel();
  };

  if (isSassUser !== false || toolModel?.canTransferRegistryToolOwnership() !== true) {
    return null;
  }

  return (
    <OwnershipTransferOverlayBase
      ownershipTransferFunction={launchOwnershipTransferConfirmation}
      type={"Tool"}
      model={toolCopy}
      setModel={setToolCopy}
    />
  );
}

ToolOwnershipTransferOverlay.propTypes = {
  toolModel: PropTypes.object,
  loadTool: PropTypes.func,
};

