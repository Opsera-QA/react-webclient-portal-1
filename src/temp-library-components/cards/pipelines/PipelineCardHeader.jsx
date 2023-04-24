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
  const lastRunState = pipelineModel?.getData("workflow.last_run.status");
  const orchestrationState = state === "paused" || state === "running" || lastRunState == null ? state : lastRunState;
  const runCount = DataParsingHelper.parseInteger(pipelineModel?.getData("workflow.run_count"), 0);

  const getOrchestrationStateFieldBase = () => {
    if (runCount > 0) {
      return (
        <OrchestrationStateFieldBase
          orchestrationState={orchestrationState}
          type={"Pipeline"}
          showStoppedState={false}
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