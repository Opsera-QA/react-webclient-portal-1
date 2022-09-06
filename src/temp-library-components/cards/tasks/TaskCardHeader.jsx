import React from "react";
import CardHeaderBase from "temp-library-components/cards/CardHeaderBase";
import PropTypes from "prop-types";
import OrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/OrchestrationStateFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function TaskCardHeader(
  {
    taskModel,
  }) {
  const state = taskModel?.getData("status");
  const runCount = DataParsingHelper.parseInteger(taskModel?.getData("run_count"), 0);

  return (
    <CardHeaderBase>
      <div className={"w-100 d-flex justify-content-between pl-3 pr-2 pt-1 small"}>
        <div>
          <span>{runCount} Runs</span>
        </div>
        <div>
          <OrchestrationStateFieldBase
            orchestrationState={state}
            type={"Task"}
          />
        </div>
      </div>
    </CardHeaderBase>
  );
}

TaskCardHeader.propTypes = {
  taskModel: PropTypes.object,
};