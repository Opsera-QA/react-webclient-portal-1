import PropTypes from "prop-types";
import React from "react";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import IconBase from "components/common/icons/IconBase";
import { faDraftingCompass, faTasks } from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import DescriptionField from "components/common/fields/text/DescriptionField";
import { mouseHelper } from "temp-library-components/helpers/mouse/mouse.helper";
import { Col, Row } from "react-bootstrap";
import { getFormattedTimestamp } from "components/common/fields/date/DateFieldBase";
import { getPipelineStateFieldBase } from "components/common/fields/pipelines/state/PipelineStateField";
import { TASK_TYPE_CATEGORIES, taskTypeConstants } from "components/tasks/task.types";
import CardFooterBase from "temp-library-components/cards/CardFooterBase";

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
        icon={
          <div className={"d-flex w-100 h-100 mt-2 mb-4"}>
            <div className={"my-auto tool-title-text"}>
              <IconBase
                icon={icon}
                iconSize={"2x"}
                iconColor={category === TASK_TYPE_CATEGORIES.SALESFORCE ? themeConstants.COLOR_PALETTE.SALESFORCE_BLUE : undefined}
              />
            </div>
          </div>
        }
        title={`${taskModel?.getData("name")}`}
      />
    );
  };


  const getDescription = () => {
    return (
      <div>
        <div className={"small pl-1"}>
          <DescriptionField dataObject={taskModel} className={"description-height"} />
          {getRunFields()}
        </div>
      </div>
    );
  };

  const getTypeHeader = () => {
   return (

     <CardFooterBase
       backgroundColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
       color={themeConstants.COLOR_PALETTE.WHITE}
       icon={faTasks}
       text={"Task"}
     />
   );
  };

  const getRunFields = () => {
    if (runCount === 0 || runCount == null) {
      return (
        <Row>
          <Col xs={12} className={"mx-auto"}>
            <div className={"text-muted mx-auto"}>
              {"This task hasn't been run yet"}
            </div>
          </Col>
        </Row>
      );
    }

    return (
      <>
        <Row>
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
        </Row>
      </>
    );
  };

  if (taskModel == null) {
    return undefined;
  }

  return (
    <IconCardContainerBase
      header={getTypeHeader()}
      titleBar={getTitleBar()}
      contentBody={getDescription()}
      onClickFunction={onClickFunction}
      className={"vertical-selection-card"}
      tooltip={tooltip}
      style={{
        // boxShadow: "0 0 40px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        cursor: mouseHelper.getMouseCursor(onClickFunction),
      }}
    />
  );
}

TaskCardBase.propTypes = {
  taskModel: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
};