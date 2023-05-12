import React from 'react';
import PropTypes from 'prop-types';
import {faTasks} from "@fortawesome/pro-light-svg-icons";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import ErrorMessageFieldBase from "components/common/fields/text/message/ErrorMessageFieldBase";
import {errorHelpers} from "components/common/helpers/error-helpers";
import useGetPollingTaskModelById from "hooks/workflow/tasks/useGetPollingTaskModelById";
import OverlayContainer from "components/common/overlays/OverlayContainer";
import {orchestrationHelper} from "temp-library-components/helpers/orchestration/orchestration.helper";
import TaskOrchestrationProgressBarBase
  from "temp-library-components/fields/orchestration/progress/TaskOrchestrationProgressBarBase";
import ViewTaskButton from "temp-library-components/button/task/ViewTaskButton";
import ViewTaskLogsButton from "temp-library-components/button/task/ViewTaskLogsButton";
import {PlacementHelperDiv} from "@opsera/react-vanity-set";
import useComponentStateReference from "hooks/useComponentStateReference";
import TaskFooter from "components/landing/v2/widgets/workspace/TaskFooter";
import {
  getLargeVendorIconComponentFromTaskType
} from "components/common/helpers/icon-helpers";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import OrchestrationLastRunDurationDataBlock
  from "temp-library-components/fields/orchestration/metrics/OrchestrationLastRunDurationDataBlock";
import OrchestrationAverageRunDurationDataBlock
  from "temp-library-components/fields/orchestration/metrics/OrchestrationAverageRunDurationDataBlock";
import useGetTaskRunMetricsById from "hooks/workflow/tasks/orchestration/metrics/useGetTaskRunMetricsById";

// TODO: Should this be two separate panels?
export default function TaskWorkflowSummaryOverlay({ taskId }) {
  const {
    isLoading,
    taskModel,
    error,
    taskStartTime,
  } = useGetPollingTaskModelById(taskId);
  const {
    lastRunDurationText,
    totalAverageDurationText,
    isLoading: isLoadingMetrics,
  } = useGetTaskRunMetricsById(taskId, taskModel?.getRunCount());
  const {
    toastContext,
  } = useComponentStateReference();
  const icon = getLargeVendorIconComponentFromTaskType(taskModel?.getData("type"), .75);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getCloseButton = () => {
    return (
      <CloseButton
        closeEditorCallback={closePanel}
        size={"sm"}
      />
    );
  };

  const getBody = () => {
    if ((isLoading === true && taskModel == null) || isLoadingMetrics === true) {
      return (
        <>
          <CenterLoadingIndicator
            type={"Task"}
          />
          <ButtonContainerBase className={"p-2"}>
            {getCloseButton()}
          </ButtonContainerBase>
        </>
      );
    }

    if (error) {
      return (
        <CenteredContentWrapper>
          <ErrorMessageFieldBase
            message={errorHelpers.parseApiErrorForInfoText("Task", error)}
          />
          <ButtonContainerBase className={"p-2"}>
            {getCloseButton()}
          </ButtonContainerBase>
        </CenteredContentWrapper>
      );
    }

    return (
      <>
        <div className={"px-2"}>
          <Row>
            <Col xs={12}>
              <div className={"d-flex px-3 pt-3"}>
                <div className={"standard-border-radius mr-3"}>
                  {icon}
                </div>
                <div className={"font-larger my-auto"}>
                  {orchestrationHelper.getLastRunCardSummary(taskModel?.getData("completion"), taskModel?.getData("status"))}
                </div>
              </div>
            </Col>
            <Col xs={12}>
              <div className={"py-3 px-4"}>
                <TextFieldBase
                  dataObject={taskModel}
                  fieldName={"description"}
                />
              </div>
            </Col>
            <Col xs={12}>
              <div className={"d-flex w-100 justify-content-between my-3"}>
                <OrchestrationLastRunDurationDataBlock
                  lastRunDurationText={lastRunDurationText}
                  width={"340px"}
                  className={"mx-3"}
                />
                <OrchestrationAverageRunDurationDataBlock
                  averageRunDurationText={totalAverageDurationText}
                  width={"340px"}
                  className={"mx-3"}
                />
              </div>
            </Col>
            <Col xs={12}>
              <div className={"d-flex justify-content-between w-100 my-3"}>
                <PlacementHelperDiv
                  width={"150px"}
                />
                {/*<TaskActionControls*/}
                {/*  task={taskModel?.getCurrentData()}*/}
                {/*  isLoading={isLoading}*/}
                {/*  workflowStatus={status}*/}
                {/*  runCount={runCount}*/}
                {/*  isQueued={isQueued}*/}
                {/*  fetchData={loadData}*/}
                {/*/>*/}
                {/*
                <PlacementHelperDiv
                  width={"190px"}
                />*/}
                <ViewTaskButton
                  taskId={taskId}
                />
                <PlacementHelperDiv
                  width={"150px"}
                />

                <PlacementHelperDiv
                  width={"150px"}
                >
                  <ViewTaskLogsButton
                    taskId={taskId}
                  />
                </PlacementHelperDiv>
                <PlacementHelperDiv
                  width={"150px"}
                />
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  const getTitleText = () => {
    if (taskModel) {
      const name = taskModel?.getData("name");
      const runCount = taskModel?.getRunCount();

      if (runCount === 0) {
        return `${name}: No Runs`;
      }

      return `${taskModel?.getData("name")}: Run ${taskModel?.getRunCount()}`;
    }

    return "";
  };

  return (
    <OverlayContainer
      closePanel={closePanel}
      titleText={getTitleText()}
      titleIcon={faTasks}
      showToasts={true}
      showCloseButton={false}
      isLoading={(isLoading && taskModel == null) || isLoadingMetrics}
      softLoading={isLoading}
      minimumWidth={"800px"}
      maximumWidth={"800px"}
      footer={<TaskFooter taskModel={taskModel} />}
    >
      <div>
        {getBody()}
        <TaskOrchestrationProgressBarBase
          taskModel={taskModel}
          taskStartTime={taskStartTime}
          className={"mt-2 flat-progress-bar"}
        />
      </div>
    </OverlayContainer>
  );
}

TaskWorkflowSummaryOverlay.propTypes = {
  taskId: PropTypes.string,
};
