import React from "react";
import CardFooterBase from "temp-library-components/cards/CardFooterBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropTypes from "prop-types";

export default function PipelineCardFooter({ pipelineModel }) {
  const state = pipelineModel?.getData("state");
  const lastRunState = pipelineModel?.getData("workflow.last_run.status");
  const orchestrationState = state === "paused" || state === "running" || lastRunState == null ? state : lastRunState;
  const { themeConstants } = useComponentStateReference();

  const getColor = () => {
    switch (orchestrationState) {
      case "paused":
        return themeConstants.COLOR_PALETTE.OPSERA_GOLD;
      case "running":
        return themeConstants.COLOR_PALETTE.GREEN;
      case "failed":
        return themeConstants.COLOR_PALETTE.DANGER_SECONDARY;
      default:
        return themeConstants.RESOURCE_COLORS.PIPELINES;
    }
  };

  return (
    <CardFooterBase
      backgroundColor={getColor()}
      color={themeConstants.COLOR_PALETTE.WHITE}
      text={"Pipeline"}
    />
  );
}

PipelineCardFooter.propTypes = {
  pipelineModel: PropTypes.object,
};
