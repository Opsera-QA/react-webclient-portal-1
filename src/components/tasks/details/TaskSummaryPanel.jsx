import React from "react";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskTypeField from "components/common/fields/tasks/TaskTypeField";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import TaskRoleAccessInput from "components/tasks/details/TaskRoleAccessInput";
import TasksEcsActionButtons from "components/tasks/buttons/ecs/TasksEcsActionButtons";
import TaskAksActionButtons from "components/tasks/buttons/aks/TaskAksActionButtons";
import RunTaskButton from "components/tasks/buttons/RunTaskButton";
import TaskOrchestrationNotificationInlineInput
  from "components/common/fields/notifications/orchestration/tasks/TaskOrchestrationNotificationInlineInput";
import { TASK_TYPES } from "components/tasks/task.types";
import TaskSchedulerField, { SCHEDULER_SUPPORTED_TASK_TYPES } from "components/tasks/scheduler/TaskSchedulerField";
import GitScraperActionButton from "../buttons/gitscraper/GitScraperActionButton";
import TaskRoleHelper from "@opsera/know-your-role/roles/tasks/taskRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import TaskStateField from "temp-library-components/fields/orchestration/state/task/TaskStateField";
import SsoUserField from "components/common/list_of_values_input/users/sso/user/SsoUserField";
import TaskOrchestrationSummaryField
  from "temp-library-components/fields/orchestration/task/TaskOrchestrationSummaryField";
import TaskRunDurationMetricsStandaloneField
  from "temp-library-components/fields/orchestration/task/metrics/TaskRunDurationMetricsStandaloneField";
import TaskTagManagerInput from "components/tasks/details/inputs/TaskTagManagerInput";
import TaskActivityPanel from "components/tasks/activity_logs/TaskActivityPanel";
import DateTimeField from "components/common/fields/date/DateTimeField";

function TaskSummaryPanel(
  {
    gitTasksData,
    setGitTasksData,
    setActiveTab,
    loadData,
    status,
    runCount,
    taskStartTime,
  }) {
  const {
    userData,
  } = useComponentStateReference();

  const getDynamicField = () => {
    if (gitTasksData.getData("type") !== TASK_TYPES.AWS_CREATE_ECS_CLUSTER) {
      return (
        <Col md={6}>
          <TextFieldBase
            className={"upper-case-first my-2"}
            dataObject={gitTasksData}
            fieldName={"tool_identifier"}
          />
        </Col>
      );
    }
  };

  const getButtonForTaskType = () => {
    switch (gitTasksData?.getData("type")) {
      case TASK_TYPES.AZURE_CLUSTER_CREATION:
        return (
          <TaskAksActionButtons
            gitTasksData={gitTasksData}
            status={status}
            runCount={runCount}
          />
        );
      case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
        return (
          <TasksEcsActionButtons
            gitTasksData={gitTasksData}
            status={status}
            runCount={runCount}
          />
        );
      case TASK_TYPES.GITSCRAPER:
        return (
          <GitScraperActionButton
            gitTasksData={gitTasksData}
            status={status}
            runCount={runCount}
          />
        );
      default:
        return (
          <RunTaskButton
            taskModel={gitTasksData}
            setTaskModel={setGitTasksData}
            loadData={loadData}
            status={status}
            actionAllowed={TaskRoleHelper.canRunTask(userData, gitTasksData?.getPersistData())}
            taskType={gitTasksData?.getData("type")}
            runCount={runCount}
          />
        );
    }
  };

  const getSchedulerField = () => {
    if (SCHEDULER_SUPPORTED_TASK_TYPES.includes(gitTasksData?.getData("type")) === true) {
      return (
        <Col sm={12} md={6}>
          <TaskSchedulerField
            taskModel={gitTasksData}
            canEditTaskSchedule={TaskRoleHelper.canUpdateTask(userData, gitTasksData?.getPersistData())}
          />
        </Col>
      );
    }
  };

  const getNotificationsInput = () => {
    if ([TASK_TYPES.AWS_CREATE_ECS_SERVICE, TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION].includes(gitTasksData?.getData("type")) === false) {
      return (
        <Col md={6}>
          <TaskOrchestrationNotificationInlineInput
            model={gitTasksData}
            fieldName={"notifications"}
            loadDataFunction={loadData}
          />
        </Col>
      );
    }
  };

  if (gitTasksData == null) {
    return null;
  }

  return (
    <SummaryPanelContainer
      setActiveTab={setActiveTab}
      editingAllowed={TaskRoleHelper.canUpdateTask(userData, gitTasksData?.getPersistData())}
    >
      <Row>
        <TaskRoleAccessInput
          dataObject={gitTasksData}
          setDataObject={setGitTasksData}
          disabled={TaskRoleHelper.canEditAccessRoles(userData, gitTasksData?.getPersistData()) !== true}
        />
        <Col sm={12} md={6}>
          <SsoUserField
            fieldName={"owner"}
            model={gitTasksData}
          />
        </Col>
        <Col sm={12} md={6}>
          <SmartIdField
            model={gitTasksData}
          />
        </Col>
        <Col sm={12} md={6}>
          <TextFieldBase
            dataObject={gitTasksData}
            fieldName={"run_count"}
          />
        </Col>
        <Col sm={12} md={6}>
          <DateTimeField
            fieldName={"createdAt"}
            dataObject={gitTasksData}
          />
        </Col>
        <Col sm={12} md={6}>
          <TaskStateField
            model={gitTasksData}
          />
        </Col>
        <Col sm={12} md={6}>
          <TextFieldBase
            dataObject={gitTasksData}
            fieldName={"account"}
          />
        </Col>
        <Col sm={12} md={6}>
          <TaskTypeField
            fieldName={"type"}
            model={gitTasksData}
          />
        </Col>
        {getNotificationsInput()}
        {getSchedulerField()}
        {getDynamicField()}
        <Col md={12} className={"pt-1"}>
          <TaskTagManagerInput
            taskModel={gitTasksData}
            setTaskModel={setGitTasksData}
            workflowStatus={status}
          />
        </Col>
        <Col md={12} className={"pt-1"}>
          <TextFieldBase dataObject={gitTasksData} fieldName={"description"} />
        </Col>
        <Col xs={12}>
          <TaskOrchestrationSummaryField
            taskModel={gitTasksData}
          />
        </Col>
        <Col xs={12}>
          <TaskRunDurationMetricsStandaloneField
            taskRunCount={gitTasksData?.getRunCount()}
            taskId={gitTasksData?.getMongoDbId()}
          />
        </Col>
      </Row>
      <Row className={"mx-0 w-100 my-2"}>
        <div className={"mx-auto"}>
          <div className={"mx-auto"}>
            {getButtonForTaskType()}
          </div>
        </div>
      </Row>
      {/*<Col xs={12}>*/}
      {/*  <TaskOrchestrationProgressBarBase*/}
      {/*    taskModel={gitTasksData}*/}
      {/*    taskStartTime={taskStartTime}*/}
      {/*  />*/}
      {/*</Col>*/}
      <TaskActivityPanel
        taskModel={gitTasksData}
        taskId={gitTasksData?.getMongoDbId()}
        taskRunCount={runCount}
        status={status}
      />
    </SummaryPanelContainer>
  );
}

TaskSummaryPanel.propTypes = {
  gitTasksData: PropTypes.object,
  setActiveTab: PropTypes.func,
  setGitTasksData: PropTypes.func,
  loadData: PropTypes.func,
  status: PropTypes.string,
  runCount: PropTypes.number,
  taskStartTime: PropTypes.number,
};

export default TaskSummaryPanel;