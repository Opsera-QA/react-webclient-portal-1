import React from "react";
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import DeployCustomerPipelineOverlay from "components/workflow/catalog/private/deploy/DeployCustomerPipelineOverlay";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";

export default function CreateCustomerPipelineButton(
  {
    disabled,
    className,
    customerPipelineTemplateModel,
    activeTemplates,
  }) {
  const template = customerPipelineTemplateModel?.getCurrentData();
  const {
    toastContext,
    isOpseraAdministrator,
    userData,
  } = useComponentStateReference();

  const launchConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <DeployCustomerPipelineOverlay
        customerPipelineTemplateModel={customerPipelineTemplateModel}
      />
    );
  };

  if (
    PipelineRoleHelper.canCreatePipeline(userData) !== true ||
    (isOpseraAdministrator !== true && (template?.readOnly === true || (template?.singleUse === true && activeTemplates.includes(template?._id))))
  ) {
    return null;
  }

  return (
    <VanityButtonBase
      className={className}
      // icon={faPlus}
      disabled={disabled}
      onClickFunction={launchConfirmationOverlay}
      variant={"success"}
      normalText={"Create Pipeline"}
      tooltip={"Create a new Pipeline from this Template"}
    />
  );
}

CreateCustomerPipelineButton.propTypes = {
  customerPipelineTemplateModel: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  activeTemplates: PropTypes.array,
};