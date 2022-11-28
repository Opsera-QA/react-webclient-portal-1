import React from "react";
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import DeployPlatformPipelineOverlay from "components/workflow/catalog/platform/deploy/DeployPlatformPipelineOverlay";

export default function CreatePlatformPipelineButton(
  {
    disabled,
    className,
    platformPipelineTemplateModel,
    activeTemplates,
  }) {
  const template = platformPipelineTemplateModel?.getCurrentData();
  const {
    toastContext,
    isOpseraAdministrator,
  } = useComponentStateReference();

  const launchConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <DeployPlatformPipelineOverlay
        platformPipelineTemplateModel={platformPipelineTemplateModel}
      />
    );
  };

  if (isOpseraAdministrator !== true && (template?.readOnly === true || (template?.singleUse === true && activeTemplates.includes(template?._id)))) {
    return null;
  }

  return (
    <VanityButtonBase
      className={className}
      // icon={faPlus}
      disabled={disabled}
      onClickFunction={launchConfirmationOverlay}
      variant={"success"}
      buttonSize={"sm"}
      normalText={"Create Pipeline"}
      tooltip={"Create a new Pipeline from this Template"}
    />
  );
}

CreatePlatformPipelineButton.propTypes = {
  platformPipelineTemplateModel: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  activeTemplates: PropTypes.array,
};