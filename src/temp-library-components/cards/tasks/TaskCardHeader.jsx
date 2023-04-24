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

  const getOrchestrationStateFieldBase = () => {
    if (runCount > 0) {
      return (
        <OrchestrationStateFieldBase
          orchestrationState={state}
          type={"Task"}
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
        <div className={"my-auto"}>
          {getOrchestrationStateFieldBase()}
        </div>
      </div>
    </CardHeaderBase>
  );
}

TaskCardHeader.propTypes = {
  taskModel: PropTypes.object,
};