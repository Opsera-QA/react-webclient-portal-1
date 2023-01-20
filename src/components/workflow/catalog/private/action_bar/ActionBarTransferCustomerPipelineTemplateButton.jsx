import React from "react";
import PropTypes from "prop-types";
import {faShareAlt} from "@fortawesome/pro-light-svg-icons";
import ActionBarPopoverButton from "components/common/actions/buttons/ActionBarPopoverButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import CustomerPipelineTemplateOwnershipTransferOverlay
  from "components/workflow/catalog/private/action_bar/CustomerPipelineTemplateOwnershipTransferOverlay";
import CustomerPipelineTemplateRoleHelper
  from "@opsera/know-your-role/roles/pipelines/templates/customer/customerPipelineTemplateRole.helper";

export default function ActionBarTransferCustomerPipelineTemplateButton(
  {
    templateModel,
    loadTemplate,
    className,
  }) {
  const {
    isSassUser,
    userData,
    toastContext,
  } = useComponentStateReference();

  const launchOwnershipTransferOverlay = () => {
    toastContext.showOverlayPanel(
      <CustomerPipelineTemplateOwnershipTransferOverlay
        templateModel={templateModel}
        loadTemplate={loadTemplate}
      />,
    );
  };

  if (isSassUser !== false || CustomerPipelineTemplateRoleHelper.canTransferOwnership(userData, templateModel?.getOriginalData()) !== true) {
    return null;
  }

  return (
    <div className={className}>
      <ActionBarPopoverButton
        icon={faShareAlt}
        popoverText={`Transfer Pipeline Template to new Owner`}
        onClickFunction={launchOwnershipTransferOverlay}
      />
    </div>
  );
}

ActionBarTransferCustomerPipelineTemplateButton.propTypes = {
  templateModel: PropTypes.object,
  loadTemplate: PropTypes.func,
  className: PropTypes.string
};