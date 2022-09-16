import React from "react";
import CardHeaderBase from "temp-library-components/cards/CardHeaderBase";
import PropTypes from "prop-types";
import OrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/OrchestrationStateFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function PipelineCardHeader(
  {
    pipelineModel,
  }) {
  const state = pipelineModel?.getData("state");
  const lastRun = pipelineModel?.getData("workflow.last_run");
  const lastRunState = lastRun?.status;
  const runCount = DataParsingHelper.parseInteger(pipelineModel?.getData("workflow.run_count"), 0);
  const orchestrationState = state === "running" ? state : lastRunState;

  const getOrchestrationStateFieldBase = () => {
    if (runCount > 0 && orchestrationState !== "stopped") {
      return (
        <OrchestrationStateFieldBase
          orchestrationState={orchestrationState}
          type={"Pipeline"}
        />
      );
    }
  };

  return (
    <CardHeaderBase>
      <div className={"w-100 d-flex justify-content-between px-2 pt-1 small"}>
        <div>
          <span>{runCount} Runs</span>
        </div>
        <div>
          {getOrchestrationStateFieldBase()}
        </div>
      </div>
    </CardHeaderBase>
  );
}

PipelineCardHeader.propTypes = {
  pipelineModel: PropTypes.object,
};