import React, {useState, useEffect, useRef, useContext} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import taskActions from "components/tasks/task.actions";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskTypeField from "components/common/fields/tasks/TaskTypeField";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import TagsInlineInputBase from "components/common/inline_inputs/tags/TagsInlineInputBase";
import TaskRoleAccessInput from "components/tasks/details/TaskRoleAccessInput";
import ECSActionButtons from "components/tasks/ECSActionButtons";
import AKSActionButtons from "components/tasks/AKSActionButtons";
import TaskConfigurationSummaryPanel from "components/tasks/details/TaskConfigurationSummaryPanel";
import RunTaskButton from "components/tasks/buttons/RunTaskButton";

function TaskSummaryPanel({ gitTasksData, setGitTasksData, setActiveTab, loadData, accessRoleData }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(accessRoleData)]);

  const updateRecord = async (newDataModel) => {
    const response = await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, newDataModel);
    loadData();
    return response;
  };

  const actionAllowed = (action) => {
    return workflowAuthorizedActions.gitItems(accessRoleData, action, gitTasksData?.getData("owner"), gitTasksData?.getData("roles"));
  };

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab} editingAllowed={actionAllowed("edit_settings")}>
      <Row>
        <Col md={6}>
          <TextFieldBase dataObject={gitTasksData} fieldName={"name"} />
        </Col>
        <Col md={6}>
          <TaskTypeField fieldName={"type"} model={gitTasksData} />
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={gitTasksData} fieldName={"owner_name"} />
        </Col>
        <Col md={6}>
          <SmartIdField model={gitTasksData} fieldName={"_id"} />
        </Col>
        <Col md={6}>
          <DateFieldBase dataObject={gitTasksData} fieldName={"createdAt"} />
        </Col>
        {gitTasksData.getData("type") !== "ecs_cluster_creation" ||
        (gitTasksData.getData("type") === "ecs_service_creation" && (
          <Col md={6}>
            <TextFieldBase
              className={"upper-case-first my-2"}
              dataObject={gitTasksData}
              fieldName={"tool_identifier"}
            />
          </Col>
        ))}

        <Col md={12} className={"pt-1"}>
          <TagsInlineInputBase
            type={"task"}
            dataObject={gitTasksData}
            fieldName={"tags"}
            saveData={updateRecord}
            disabled={!actionAllowed("edit_settings")}
          />
        </Col>
        <Col md={12} className={"pt-1"}>
          <TextFieldBase dataObject={gitTasksData} fieldName={"description"} />
        </Col>
        <Col lg={12}>
          <TaskRoleAccessInput
            dataObject={gitTasksData}
            setDataObject={setGitTasksData}
            disabled={!actionAllowed("edit_access_roles")}
          />
        </Col>
      </Row>
      <Row className={"mx-0 w-100 my-2"}>
        <div className={"mx-auto"}>
          <div className={"mx-auto"}>
            <RunTaskButton
              taskModel={gitTasksData}
              setTaskModel={setGitTasksData}
              loadData={loadData}
              actionAllowed={actionAllowed("run_task")}
              taskType={gitTasksData?.getData("type")}
            />
          </div>
        </div>
      </Row>
      <Row className={"mx-0 w-100 my-2"}>
        <div className={"mx-auto"}>
          <div className={"mx-auto"}>
            <ECSActionButtons gitTasksData={gitTasksData} loadData={loadData} />
            <AKSActionButtons gitTasksData={gitTasksData} loadData={loadData} />
          </div>
        </div>
      </Row>
      <div className="px-3 mt-3">
        <TaskConfigurationSummaryPanel taskModel={gitTasksData} />
      </div>
    </SummaryPanelContainer>
  );
}

TaskSummaryPanel.propTypes = {
  gitTasksData: PropTypes.object,
  setActiveTab: PropTypes.func,
  setGitTasksData: PropTypes.func,
  loadData: PropTypes.func,
  accessRoleData: PropTypes.object
};

export default TaskSummaryPanel;