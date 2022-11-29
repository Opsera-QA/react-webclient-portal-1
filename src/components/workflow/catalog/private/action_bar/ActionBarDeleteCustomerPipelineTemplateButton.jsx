import React from "react";
import PropTypes from "prop-types";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import {
  customerPipelineTemplateCatalogActions
} from "components/workflow/catalog/private/customerPipelineTemplateCatalog.actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import CustomerPipelineTemplateRoleHelper
  from "@opsera/know-your-role/roles/pipelines/templates/customer/customerPipelineTemplateRole.helper";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import {useHistory} from "react-router-dom";
import {pipelineCatalogHelper} from "components/workflow/catalog/pipelineCatalog.helper";

export default function ActionBarDeleteCustomerPipelineTemplateButton(
  {
    customerPipelineTemplateModel,
    className,
  }) {
  const history = useHistory();
  const {
    toastContext,
    getAccessToken,
    cancelTokenSource,
    userData,
  } = useComponentStateReference();

  const deletePipelineTemplate = async () => {
    return await customerPipelineTemplateCatalogActions.deleteCustomerPipelineTemplate(getAccessToken, cancelTokenSource, customerPipelineTemplateModel?.getMongoDbId());
  };

  const afterDeleteFunction = () => {
    history.push(pipelineCatalogHelper.getManagementScreenLink());
  };

  const showConfirmationOverlayFunction = async () => {
    toastContext.showOverlayPanel(
      <DeleteConfirmationOverlay
        type={"Pipeline Template"}
        afterDeleteFunction={afterDeleteFunction}
        handleDeleteFunction={deletePipelineTemplate}
      />
    );
  };

  if (CustomerPipelineTemplateRoleHelper.canDeleteCustomerPipelineTemplate(userData, customerPipelineTemplateModel?.getOriginalData()) !== true) {
    return null;
  }

  return (
    <ActionBarDeleteButtonBase
      handleDeleteFunction={showConfirmationOverlayFunction}
      type={"Pipeline Template"}
      className={className}
    />
  );
}

ActionBarDeleteCustomerPipelineTemplateButton.propTypes = {
  customerPipelineTemplateModel: PropTypes.object,
  className: PropTypes.string,
};
