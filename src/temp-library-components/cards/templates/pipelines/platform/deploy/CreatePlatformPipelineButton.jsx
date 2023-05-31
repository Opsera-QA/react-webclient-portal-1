import React from "react";
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import DeployPlatformPipelineOverlay from "temp-library-components/cards/templates/pipelines/platform/deploy/DeployPlatformPipelineOverlay";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import {faUpload} from "@fortawesome/pro-light-svg-icons";

export default function CreatePlatformPipelineButton(
  {
    disabled,
    className,
    platformPipelineTemplateModel,
    activeTemplates,
    variant,
    buttonSize,
    showText,
    buttonClassName,
  }) {
  const template = platformPipelineTemplateModel?.getCurrentData();
  const {
    toastContext,
    isOpseraAdministrator,
    userData,
  } = useComponentStateReference();

  const launchConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <DeployPlatformPipelineOverlay
        platformPipelineTemplateModel={platformPipelineTemplateModel}
      />
    );
  };

  if (
    platformPipelineTemplateModel == null ||
    PipelineRoleHelper.canCreatePipeline(userData) !== true ||
    (isOpseraAdministrator !== true && (template?.readOnly === true || (template?.singleUse === true && activeTemplates.includes(template?._id))))
  ) {
    return null;
  }

  return (
    <VanityButtonBase
      className={className}
      buttonClassName={buttonClassName}
      icon={faUpload}
      disabled={disabled}
      onClickFunction={launchConfirmationOverlay}
      variant={variant}
      buttonSize={buttonSize}
      normalText={showText !== false ? "Create Pipeline" : undefined}
      tooltip={"Create a new Pipeline from this Template"}
    />
  );
}

CreatePlatformPipelineButton.propTypes = {
  platformPipelineTemplateModel: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  activeTemplates: PropTypes.array,
  variant: PropTypes.string,
  buttonSize: PropTypes.string,
  showText: PropTypes.bool,
  buttonClassName: PropTypes.string,
};

CreatePlatformPipelineButton.defaultProps = {
  variant: "success",
};