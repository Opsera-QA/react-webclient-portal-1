import PropTypes from "prop-types";
import React from "react";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import { Col, Row } from "react-bootstrap";
import { getFormattedTimestamp } from "components/common/fields/date/DateFieldBase";
import { TASK_TYPE_CATEGORIES, taskTypeConstants } from "components/tasks/task.types";
import TaskCardFooter from "temp-library-components/cards/tasks/TaskCardFooter";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import OrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/OrchestrationStateFieldBase";
import TaskCardHeader from "temp-library-components/cards/tasks/TaskCardHeader";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

const getLastRunDetails = (taskModel) => {
  const runCount = DataParsingHelper.parseInteger(taskModel?.getData("run_count"), 0);
  const lastRun = taskModel?.getData("last_run");
  const lastRunCompletionDate = taskModel?.getData("last_run.completed");

  if (runCount === 0) {
    return (
      <div className={"d-flex"}>
        <div className={"text-muted m-auto"}>
          {`This pipeline has not been run yet`}
        </div>
      </div>
    );
  }

  if (lastRunCompletionDate != null) {
    return (
      <div className={"d-flex justify-content-between"}>
        {getFormattedTimestamp(lastRunCompletionDate)}
        <div>
          <OrchestrationStateFieldBase
            orchestrationState={lastRun?.status}
            type={"Pipeline"}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={"d-flex"}>
      <div className={"text-muted m-auto"}>
        {`No metrics captured for last run`}
      </div>
    </div>
  );
};

// TODO: Add when wired up in orchestrator
const getLastRunEntry = (taskModel) => {
  return (
    <Col xs={12}>
      <div className={"mt-2"}>
        <div className={"d-flex"}>
          <div className={"mx-auto"}>Last Run</div>
        </div>
        {getLastRunDetails(taskModel)}
      </div>
    </Col>
  );
};

export default function TaskCardBase(
  {
    taskModel,
    onClickFunction,
    tooltip,
    selectedOption,
    option,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getTitleBar = () => {
    const type = taskModel?.getData("type");
    const icon = taskTypeConstants.getIconForTaskType(type);
    const category = taskTypeConstants.getTaskCategoryForType(type);

    return (
      <IconTitleBar
        icon={icon}
        iconColor={category === TASK_TYPE_CATEGORIES.SALESFORCE ? themeConstants.COLOR_PALETTE.SALESFORCE_BLUE : undefined}
        title={`${taskModel?.getData("name")}`}
        className={"mx-1"}
        iconSize={"4x"}
      />
    );
  };

  if (taskModel == null) {
    return undefined;
  }

  return (
    <SelectionIconCardBase
      cardHeader={<TaskCardHeader taskModel={taskModel} />}
      cardFooter={<TaskCardFooter />}
      titleBar={getTitleBar()}
      contentBody={<div />}
      onClickFunction={onClickFunction}
      tooltip={tooltip}
      selectedOption={selectedOption}
      option={option}
      highlightedBorderColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
    />
  );
}

TaskCardBase.propTypes = {
  taskModel: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
  selectedOption: PropTypes.string,
  option: PropTypes.string,
};