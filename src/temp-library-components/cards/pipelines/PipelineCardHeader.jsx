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
  const runCount = DataParsingHelper.parseInteger(pipelineModel?.getData("workflow.run_count"), 0);

  return (
    <CardHeaderBase>
      <div className={"w-100 d-flex justify-content-between px-2 pt-1 small"}>
        <div>
          <span>{runCount} Runs</span>
        </div>
        <div>
          <OrchestrationStateFieldBase
            orchestrationState={state}
            type={"Pipeline"}
          />
        </div>
      </div>
    </CardHeaderBase>
  );
}

PipelineCardHeader.propTypes = {
  pipelineModel: PropTypes.object,
};