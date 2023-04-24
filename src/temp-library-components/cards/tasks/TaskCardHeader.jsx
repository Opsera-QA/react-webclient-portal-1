import React from "react";
import CardHeaderBase from "temp-library-components/cards/CardHeaderBase";
import PropTypes from "prop-types";
import OrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/OrchestrationStateFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";

export default function TaskCardHeader(
  {
    taskModel,
  }) {
  const state = taskModel?.getData("status");
  const runCount = DataParsingHelper.parseInteger(taskModel?.getData("run_count"), 0);
  const lastRunCompletionDate = taskModel?.getData("completion");

  const getOrchestrationStateFieldBase = () => {
    if (runCount > 0) {
      return (
        <div className={"d-flex justify-content-between"}>
          {DateFormatHelper.formatDateAsTimestampWithoutSeconds(lastRunCompletionDate)}
          <div>
            <OrchestrationStateFieldBase
              orchestrationState={state}
              type={"Task"}
              showStoppedState={false}
            />
          </div>
        </div>
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

TaskCardHeader.propTypes = {
  taskModel: PropTypes.object,
};