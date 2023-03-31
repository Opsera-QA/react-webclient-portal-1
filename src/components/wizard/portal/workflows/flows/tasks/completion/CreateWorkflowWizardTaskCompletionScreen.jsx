import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { apiRequestHelper } from "temp-library-components/helpers/api/apiRequest.helper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import taskActions from "components/tasks/task.actions";
import modelHelpers from "components/common/model/modelHelpers";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import { workspaceConstants } from "components/workspace/workspace.constants";
import OpseraInfinityLogoLarge from "components/logo/OpseraInfinityLogoLarge";
import DoneOverlayButton from "components/common/buttons/done/overlay/DoneOverlayButton";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";
import PortalRouteToWorkflowButton from "./PortalRouteToWorkflowButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RunTaskButton from "../../../../../../tasks/buttons/RunTaskButton";
import TaskRoleHelper from "@opsera/know-your-role/roles/tasks/taskRole.helper";
import TooltipWrapper from "../../../../../../common/tooltip/TooltipWrapper";

const HEIGHT = "700px";

export default function CreateWorkflowWizardTaskCompletionScreen({
  task,
  workflowType,
  setButtonContainer,
  handleClose,
  connectionFailure,
}) {
  const [initializationState, setInitializationState] = useState(
    apiRequestHelper.API_REQUEST_STATES.READY,
  );
  const { getAccessToken, cancelTokenSource, isMounted, toastContext, userData } =
    useComponentStateReference();
  const [taskData, setTaskData] = useState(
    modelHelpers.parseObjectIntoModel(task, tasksMetadata),
  );

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(undefined);
    }

    if (task) {
      updateTask().catch(() => {});
    }
  }, [task]);

  const updateTask = async () => {
    try {
      setInitializationState(apiRequestHelper.API_REQUEST_STATES.BUSY);
      const newTaskTemplateModel = modelHelpers.parseObjectIntoModel(
        task,
        tasksMetadata,
      );
      await taskActions.updateGitTaskV2(
        getAccessToken,
        cancelTokenSource,
        newTaskTemplateModel,
      );
      setInitializationState(apiRequestHelper.API_REQUEST_STATES.SUCCESS);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(
          error,
          "Error Finishing Workflow Initialization",
        );
        setInitializationState(apiRequestHelper.API_REQUEST_STATES.ERROR);
      }
    }
  };

  const getBody = () => {
    switch (initializationState) {
      case apiRequestHelper.API_REQUEST_STATES.BUSY:
        return (
          <CenterLoadingIndicator
            customMessage={`Finishing up initialization for your ${workflowType} Workflow`}
          />
        );
      case apiRequestHelper.API_REQUEST_STATES.ERROR:
        return (
          <div>
            There was an issue finalizing the initialization for this{" "}
            {workflowType} Workflow. Please try once more.
          </div>
        );
      case apiRequestHelper.API_REQUEST_STATES.SUCCESS:
        return (
          <CenteredContentWrapper minHeight={HEIGHT}>
            <Row>
              <Col
                lg={12}
                className={
                  "d-flex align-items-center justify-content-center mt-3 mb-5"
                }
              >
                <OpseraInfinityLogoLarge scale={0.4} />
              </Col>
              <br />
              <Col
                lg={12}
                className={"d-flex align-items-center justify-content-center"}
              >
                <H5FieldSubHeader
                  subheaderText={`Congratulations! You have successfully created a new Opsera ${workflowType} Task!`}
                />
              </Col>
              <Col
                lg={12}
                className={
                  "d-flex align-items-center justify-content-center mb-3"
                }
              >
                <H5FieldSubHeader
                  subheaderText={`You can start using your task right away or come back to it later.`}
                />
              </Col>
              <Col
                lg={12}
                className={"d-flex align-items-center justify-content-center"}
              >
                <div className={"focusText"}>
                  Your new task will also be available to view and run via the
                  tasks page.
                </div>
              </Col>
              <Col
                lg={12}
                className={"d-flex align-items-center justify-content-center"}
              >
                <div className={"d-flex"}>
                  <ButtonContainerBase className={"mt-5 ml-auto"}>
                    <DoneOverlayButton
                      className={"mr-2"}
                      style={{ width: "160px" }}
                    />
                    <PortalRouteToWorkflowButton
                      workspaceItem={task}
                      workspaceType={
                        workspaceConstants.WORKSPACE_ITEM_TYPES.TASK
                      }
                      handleClose={handleClose}
                      style={{ width: "160px" }}
                      className={"mr-2"}
                    />
                    <RunTaskButton
                        taskModel={taskData}
                        setTaskModel={setTaskData}
                        status={status}
                        disable={connectionFailure > 0}
                        connectionFailure={connectionFailure > 0}
                        actionAllowed={TaskRoleHelper.canRunTask(userData, taskData?.getPersistData())}
                        taskType={taskData?.getData("type")}
                        style={{width: "160px"}}
                    />
                  </ButtonContainerBase>
                </div>
              </Col>
            </Row>
          </CenteredContentWrapper>
        );
    }
  };

  return (
    <div
      style={{
        minHeight: HEIGHT,
        // height: "600px",
      }}
    >
      {getBody()}
    </div>
  );
}

CreateWorkflowWizardTaskCompletionScreen.propTypes = {
  task: PropTypes.object,
  workflowType: PropTypes.string,
  setButtonContainer: PropTypes.func,
  handleClose: PropTypes.func,
  connectionFailure: PropTypes.number,
};
