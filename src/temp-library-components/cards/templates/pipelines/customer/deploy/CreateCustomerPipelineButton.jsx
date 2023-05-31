import React from "react";
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import DeployCustomerPipelineOverlay from "temp-library-components/cards/templates/pipelines/customer/deploy/DeployCustomerPipelineOverlay";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import {faUpload} from "@fortawesome/pro-light-svg-icons";

export default function CreateCustomerPipelineButton(
  {
    disabled,
    className,
    customerPipelineTemplateModel,
    activeTemplates,
    variant,
    buttonSize,
    showText,
    buttonClassName,
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
    customerPipelineTemplateModel == null ||
    PipelineRoleHelper.canCreatePipeline(userData) !== true ||
    (isOpseraAdministrator !== true && (template?.readOnly === true || (template?.singleUse === true && activeTemplates.includes(template?._id))))
  ) {
    return null;
  }

  return (
    <VanityButtonBase
      className={className}
<<<<<<< Updated upstream:src/components/workflow/catalog/private/deploy/CreateCustomerPipelineButton.jsx
      buttonClassName={"w-100"}
      // icon={faPlus}
=======
      buttonClassName={buttonClassName}
      icon={faUpload}
>>>>>>> Stashed changes:src/temp-library-components/cards/templates/pipelines/customer/deploy/CreateCustomerPipelineButton.jsx
      disabled={disabled}
      onClickFunction={launchConfirmationOverlay}
      variant={variant}
      buttonSize={buttonSize}
      normalText={showText !== false ? "Create Pipeline" : undefined}
      tooltip={"Create a new Pipeline from this Template"}
    />
  );
}

CreateCustomerPipelineButton.propTypes = {
  customerPipelineTemplateModel: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  activeTemplates: PropTypes.array,
  variant: PropTypes.string,
  buttonSize: PropTypes.string,
  showText: PropTypes.bool,
  buttonClassName: PropTypes.string,
};

CreateCustomerPipelineButton.defaultProps = {
  variant: "success",
};
