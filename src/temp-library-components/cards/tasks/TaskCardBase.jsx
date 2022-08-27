import PropTypes from "prop-types";
import React from "react";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import { faTasks } from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import DescriptionField from "components/common/fields/text/DescriptionField";
import { mouseHelper } from "temp-library-components/helpers/mouse/mouse.helper";
import { Col, Row } from "react-bootstrap";
import { getFormattedTimestamp } from "components/common/fields/date/DateFieldBase";
import { getPipelineStateFieldBase } from "components/common/fields/pipelines/state/PipelineStateField";
import { TASK_TYPE_CATEGORIES, taskTypeConstants } from "components/tasks/task.types";
import CardFooterBase from "temp-library-components/cards/CardFooterBase";
import TaskCardFooter from "temp-library-components/cards/tasks/TaskCardFooter";

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
        <Col xs={12}>
          <DescriptionField dataObject={taskModel} className={"description-height"} />
        </Col>
          {getRunFields()}
      </Row>
    );
  };

  const getRunFields = () => {
    if (runCount === 0 || runCount == null) {
      return (
        <Col xs={12} className={"d-flex"}>
          <div className={"text-muted mx-auto"}>
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
    <IconCardContainerBase
      cardFooter={<TaskCardFooter />}
      titleBar={getTitleBar()}
      contentBody={getDescription()}
      onClickFunction={onClickFunction}
      className={"vertical-selection-card"}
      tooltip={tooltip}
    />
  );
}

TaskCardBase.propTypes = {
  taskModel: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
};