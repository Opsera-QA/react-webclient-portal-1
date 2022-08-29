import PropTypes from "prop-types";
import React from "react";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import { Col, Row } from "react-bootstrap";
import { getFormattedTimestamp } from "components/common/fields/date/DateFieldBase";
import { getPipelineStateFieldBase } from "components/common/fields/pipelines/state/PipelineStateField";
import { TASK_TYPE_CATEGORIES, taskTypeConstants } from "components/tasks/task.types";
import TaskCardFooter from "temp-library-components/cards/tasks/TaskCardFooter";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import { taskTemplateIdentifierConstants } from "components/admin/task_templates/taskTemplateIdentifier.constants";

const getLastRunEntry = (taskModel) => {
  const lastRun = taskModel?.getData("last_run");
  const lastRunCompletionDate = taskModel?.getData("last_run.completed");

  if (lastRunCompletionDate != null) {
    return (
      <div className={"d-flex justify-content-between"}>
        {getFormattedTimestamp(lastRunCompletionDate)}
        <div>{getPipelineStateFieldBase(lastRun?.status)}</div>
      </div>
    );
  }
};

const getTaskStatusField = (taskModel) => {
  const pipelineState = taskModel?.getData("state");

  return (getPipelineStateFieldBase(pipelineState));
};

// TODO: Rewrite
export default function TaskCardBase(
  {
    taskModel,
    onClickFunction,
    tooltip,
    selectedOption,
    option,
  }) {
  const runCount = taskModel?.getData("run_count");
  const formattedLastRun = getLastRunEntry(taskModel);
  const pipelineStatusField = getTaskStatusField(taskModel);
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
      />
    );
  };


  const getDescription = () => {
    return (
      <Row className={"small"}>
        {getTemplateIdentifierField()}
        <Col xs={12}>
          {/*<DescriptionField dataObject={taskModel} className={"description-height"} />*/}
        </Col>
          {getRunFields()}
      </Row>
    );
  };

  const getTemplateIdentifierField = () => {
    return (
      <Col xs={12}>
        {taskTemplateIdentifierConstants.getLabelForTaskTemplateIdentifier(taskModel?.getData("templateIdentifier"))}
      </Col>
    );
  };

  const getRunFields = () => {
    if (runCount === 0 || runCount == null) {
      return (
        <Col xs={12} className={"d-flex"}>
          <div className={"text-muted m-auto"}>
            {"This task hasn't been run yet"}
          </div>
        </Col>
      );
    }

    return (
      <>
        <Col xs={6}>
          {pipelineStatusField}
        </Col>
        <Col xs={6}>
          <span className="mr-2">Runs:</span> {runCount}
        </Col>
        {/*<Col xs={12} className={"mt-2 mb-1"}>*/}
        {/*  <div className={"mx-auto"}>*/}
        {/*    <span>Last Run</span>*/}
        {/*    <span>{formattedLastRun}</span>*/}
        {/*  </div>*/}
        {/*</Col>*/}
      </>
    );
  };

  if (taskModel == null) {
    return undefined;
  }

  return (
    <SelectionIconCardBase
      cardFooter={<TaskCardFooter />}
      titleBar={getTitleBar()}
      contentBody={getDescription()}
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