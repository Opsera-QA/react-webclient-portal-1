import React from "react";
import PropTypes from "prop-types";
import { faFileAlt, } from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineDetailsOverviewOverlay from "components/workflow/pipelines/overview/PipelineDetailsOverviewOverlay";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";

export default function PipelineWorkflowViewConfigurationButton(
  {
    pipeline,
  }) {
  const {
    isOpseraAdministrator,
    userData,
    toastContext,
    isFreeTrial,
  } = useComponentStateReference();

  const launchPipelineConfigurationOverlay = () => {
    toastContext.showOverlayPanel(
      <PipelineDetailsOverviewOverlay
        pipeline={pipeline}
      />
    );
  };

  // TODO: Wire up role definitions from a model instead
  if (PipelineRoleHelper.canViewPipelineConfiguration(userData, pipeline) !== true) {
    return null;
  }

  if (isFreeTrial === true && isOpseraAdministrator !== true) {
    return (
      <VanityButtonBase
        className={"mr-1"}
        icon={faFileAlt}
        buttonSize={"sm"}
        tooltip={"In the main Opsera offering you can get an easy look at all of the configurations for an entire Pipeline."}
        variant={"outline-secondary"}
        normalText={"View Configuration"}
        disabled={true}
      />
    );
  }

  return (
    <VanityButtonBase
      className={"mr-1"}
      icon={faFileAlt}
      buttonSize={"sm"}
      tooltip={"View Pipeline Configuration"}
      variant={"outline-secondary"}
      normalText={"View Configuration"}
      onClickFunction={launchPipelineConfigurationOverlay}
    />
  );
}

PipelineWorkflowViewConfigurationButton.propTypes = {
  pipeline: PropTypes.object,
};