import React from "react";
import CardFooterBase from "temp-library-components/cards/CardFooterBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropTypes from "prop-types";

export default function PipelineCardFooter({ pipelineModel }) {
  const state = pipelineModel?.getData("state");
  const lastRun = pipelineModel?.getData("workflow.last_run");
  const lastRunState = lastRun?.status;
  const orchestrationState = state === "running" ? state : lastRunState;
  const { themeConstants } = useComponentStateReference();

  const getColor = () => {
    switch (orchestrationState) {
      case "paused":
        return themeConstants.COLOR_PALETTE.OPSERA_GOLD;
      case "running":
        return themeConstants.COLOR_PALETTE.GREEN;
      default:
        return themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE;
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
