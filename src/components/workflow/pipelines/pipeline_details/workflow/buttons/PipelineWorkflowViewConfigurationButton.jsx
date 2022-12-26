import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faFileAlt, } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import PipelineDetailsOverviewOverlay from "components/workflow/pipelines/overview/PipelineDetailsOverviewOverlay";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";

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
      <TooltipWrapper
        innerText={"In the main Opsera offering you can get an easy look at all of the configurations for an entire Pipeline."}
        wrapInDiv={true}
      >
        <Button
          variant={"outline-secondary"}
          className={"mr-1"}
          size={"sm"}
          disabled={true}
        >
          <IconBase icon={faFileAlt} className={"mr-1"} />
          View Configuration
        </Button>
      </TooltipWrapper>
    );
  }

  return (
    <TooltipWrapper
      innerText={"View pipeline configuration"}
      wrapInDiv={true}
    >
      <Button
        variant={"outline-secondary"}
        className={"mr-1"}
        size={"sm"}
        onClick={launchPipelineConfigurationOverlay}
      >
        <IconBase icon={faFileAlt} className={"mr-1"} />
        View Configuration
      </Button>
    </TooltipWrapper>
  );
}

PipelineWorkflowViewConfigurationButton.propTypes = {
  pipeline: PropTypes.object,
};