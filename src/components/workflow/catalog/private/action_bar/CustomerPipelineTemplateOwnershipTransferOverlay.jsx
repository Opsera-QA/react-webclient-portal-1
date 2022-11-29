import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RoleHelper from "@opsera/know-your-role/roles/role.helper";
import OwnershipTransferOverlayBase from "components/common/overlays/center/ownership/OwnershipTransferOverlayBase";
import { useHistory } from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";
import OwnershipTransferConfirmationOverlay
  from "components/common/overlays/center/ownership/OwnershipTransferConfirmationOverlay";
import {
  customerPipelineTemplateCatalogActions
} from "components/workflow/catalog/private/customerPipelineTemplateCatalog.actions";
import {pipelineCatalogHelper} from "components/workflow/catalog/pipelineCatalog.helper";

export default function CustomerPipelineTemplateOwnershipTransferOverlay(
  {
    templateModel,
    loadTemplate,
  }) {
  const history = useHistory();
  const [pipelineTemplateCopy, setPipelineTemplateCopy] = useState(undefined);
  const {
    cancelTokenSource,
    isSassUser,
    getAccessToken,
    userData,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setPipelineTemplateCopy(templateModel?.clone());
  }, [templateModel]);

  const transferToolOwnership = async (willLoseAccess) => {
    const response = await customerPipelineTemplateCatalogActions.transferCustomerPipelineTemplateOwnership(
      getAccessToken,
      cancelTokenSource,
      templateModel?.getMongoDbId(),
      pipelineTemplateCopy?.getData("owner"),
      );

    if (willLoseAccess !== true) {
      await loadTemplate();
    } else {
      history.push(pipelineCatalogHelper.getManagementScreenLink());
    }

    return response;
  };

  const launchOwnershipTransferConfirmation = async () => {
    document.body.click();
    const willLoseAccess = RoleHelper.willLoseAccessIfOwnerChanged(
      userData,
      templateModel?.getOriginalData(),
      pipelineTemplateCopy?.getData("owner"),
    );

    toastContext.showOverlayPanel(
      <OwnershipTransferConfirmationOverlay
        ownershipTransferFunction={() => transferToolOwnership(willLoseAccess)}
        type={"Template"}
        willLoseAccess={willLoseAccess}
        closePanelFunction={handleClosePanelFunction}
      />,
    );
  };

  const handleClosePanelFunction = () => {
    toastContext.clearOverlayPanel();
  };

  if (isSassUser !== false) {
    return null;
  }

  return (
    <OwnershipTransferOverlayBase
      ownershipTransferFunction={launchOwnershipTransferConfirmation}
      type={"Template"}
      model={pipelineTemplateCopy}
      setModel={setPipelineTemplateCopy}
    />
  );
}

CustomerPipelineTemplateOwnershipTransferOverlay.propTypes = {
  templateModel: PropTypes.object,
  loadTemplate: PropTypes.func,
};

