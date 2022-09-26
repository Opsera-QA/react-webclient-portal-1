import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import LineTo from "react-lineto";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorDialog from "components/common/status_notifications/error";
import {
  faSearchPlus,
  faCog,
  faClipboardCheck,
  faCode,
  faSearchMinus, faCodeBranch,
} from "@fortawesome/pro-light-svg-icons";
import ModalActivityLogs from "components/common/modal/modalActivityLogs";
import PipelineWorkflowItemList from "./PipelineWorkflowItemList";
import Modal from "components/common/modal/modal";
import IconBase from "components/common/icons/IconBase";
import LoadingIcon from "components/common/icons/LoadingIcon";
import PipelineSourceConfigurationDetailsOverviewOverlay
  from "components/workflow/pipelines/overview/source/PipelineSourceConfigurationDetailsOverviewOverlay";
import modelHelpers from "components/common/model/modelHelpers";
import sourceRepositoryConfigurationMetadata from "./step_configuration/repository/source-repository-configuration-metadata";
import PipelineActionControls from "components/workflow/pipelines/pipeline_details/PipelineActionControls";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PipelineWorkflowWorkflowEditingToggleButton
  from "components/workflow/pipelines/pipeline_details/workflow/buttons/PipelineWorkflowWorkflowEditingToggleButton";
import PipelineWorkflowViewConfigurationButton
  from "components/workflow/pipelines/pipeline_details/workflow/buttons/PipelineWorkflowViewConfigurationButton";
import PipelineWorkflowExportWorkflowButton
  from "components/workflow/pipelines/pipeline_details/workflow/buttons/PipelineWorkflowExportWorkflowButton";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: Clean up and refactor to make separate components. IE the source repository begin workflow box can be its own component
function PipelineWorkflow({
  pipeline,
  setPipeline,
  fetchPlan,
  customerAccessRules,
  editItemId,
  refreshCount,
  softLoading,
}) {
  const [modalHeader, setModalHeader] = useState("");
  const [lastStep, setLastStep] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [zoomValue, setZoomValue] = useState(2); //1,2, or 3 with 2 being default zoom
  const [modalMessage, setModalMessage] = useState({});
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [editWorkflow, setEditWorkflow] = useState(false);
  const [infoModal, setInfoModal] = useState({ show: false, header: "", message: "", button: "OK" });
  const gitExportEnabled = pipeline?.workflow?.source?.gitExportEnabled; 
  const sourceRepositoryModel = modelHelpers.parseObjectIntoModel(pipeline?.workflow?.source, sourceRepositoryConfigurationMetadata);
  const {
    userData,
    toastContext,
    getAccessToken
   } = useComponentStateReference();

  useEffect(() => {
    loadFormData(pipeline);
  }, [refreshCount, JSON.stringify(pipeline)]);


  const loadFormData = (pipeline) => {
    if (!pipeline.workflow) {
      return;
    }

    //setState({ items: pipeline.workflow.plan });
    setLastStep(pipeline.workflow.last_step);

    if (pipeline.workflow.last_step !== undefined) {
      let status = Object.prototype.hasOwnProperty.call(pipeline.workflow.last_step, "status") ? pipeline.workflow.last_step.status : false;

      if (status === "stopped" && pipeline.workflow.last_step.running && pipeline.workflow.last_step.running.paused) {
        setWorkflowStatus("paused");
      } else {
        setWorkflowStatus(status);
      }
    } else {
      setWorkflowStatus(false);
    }
  };

  const showWebhookConfigurationSummary = () => {
    toastContext.showOverlayPanel(
      <PipelineSourceConfigurationDetailsOverviewOverlay
        pipeline={pipeline}
      />
    );
  };

  // TODO: Break out into separate actions file, maybe call in a pipeline activity overlay rather than here?
  const fetchPipelineActivityByTool = async (pipelineId, tool, stepId, activityId) => {
    const accessToken = await getAccessToken();
    let apiUrl = `/pipelines/${pipelineId}/activity`;
    const params = {
      tool: tool,
      step_id: stepId,
      id: activityId,
    };

    try {
      const pipelineActivityLog = await axiosApiService(accessToken).get(apiUrl, { params });
      return pipelineActivityLog;
    } catch (err) {
      toastContext.showLoadingErrorDialog(err);
      return false;
    }
  };

  const callbackFunctionEditItem = async (item) => {
    window.scrollTo(0, 0);
    setEditWorkflow(false);
    item.id = pipeline._id;
    await fetchPlan(item);
  };

  const updatePipeline = async (pipeline) => {
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${pipeline._id}/update`;
    try {
      await axiosApiService(accessToken).post(apiUrl, pipeline);
    } catch (err) {
      toastContext.showLoadingErrorDialog(err);
    }
  };

  const handleSourceEditClick = () => {
    fetchPlan({ id: pipeline._id, type: "source", item_id: "" });
  };

  const quietSavePlan = async (steps) => {
    console.log("saving plan quietly: ", pipeline.workflow.plan);
    if (steps) {
      pipeline.workflow.plan = steps;
    }
    await updatePipeline(pipeline);
  };

  const handleViewSourceActivityLog = async (pipelineId, tool, stepId, activityId) => {
    if (tool) {
      const activityData = await fetchPipelineActivityByTool(pipelineId, tool, stepId, activityId);
      if (activityData && activityData.data) {
        setModalHeader("Step Activity Log");
        setModalMessage(activityData.data.pipelineData[0]);
        setShowModal(true);
      }
    }
  };

  const handleEditSourceSettingsClick = () => {
    if (PipelineRoleHelper.canUpdatePipelineStepDetails(userData, pipeline) !== true) {
      setInfoModal({
        show: true,
        header: "Permission Denied",
        // message: "Editing pipeline workflow settings allows users to change the behavior of a pipeline step.  This action requires elevated privileges.",
        message: "In the main Opsera offering, you can add add a source Git repository to trigger your Pipelines with webhooks and to export your Pipeline configuration on demand to your Git repository.",
        button: "OK",
      });
      return;
    }

    handleSourceEditClick();
  };

  const setZoomClass = (val) => {
    switch (val) {
    case 1:
      return "scale-80"; // .8x zoom
    case 2:
      return "scale-100"; //standard 100% zoom
    case 3:
      return "scale-120"; // 1.2x zoom
    }
  };

  const handleZoomClick = (val, direction) => {
    //take current value and increment up or down
    if (direction === "in") {
      setZoomValue(zoomValue => zoomValue + 1);
    } else {
      setZoomValue(zoomValue => zoomValue - 1);
    }
  };

  // TODO: Put in separate component and cleanup
  const getStartOfWorkflowItem = () => {
    return (
      <div className="source workflow-module-container workflow-module-container-width mt-2 mx-auto">
        {!softLoading ?
          <div className="pt-2 text-center mx-auto">Start of Workflow</div> :
          <div className="pt-2 text-center mx-auto green">
            <LoadingIcon className={"mr-1"} /> Processing Workflow...</div>
        }

        {/*{pipeline.workflow.source.service &&
          <div className="d-flex">
            <div className="upper-case-first pl-2">
            <span className="text-muted small">
            <IconBase icon={faCode} iconSize={"sm"} className={"mr-1"}/>
              Source Repository: {pipeline.workflow.source.service}</span>
            </div>
          </div>}*/}

        {pipeline?.workflow?.source?.repository &&
          <div className="d-flex">
            <div className={"pl-2"}>
                  <span className="text-muted small">
                    <IconBase icon={faCode} iconSize={"sm"} className={"mr-1"}/>
                    Repository: {pipeline.workflow.source.repository}
                  </span>
            </div>
          </div>
        }

        {pipeline?.workflow?.source?.branch &&
          <div className="d-flex">
            <div className={"pl-2"}>
                  <span className="text-muted small my-auto">
                    <IconBase icon={faCodeBranch} iconSize={"sm"} className={"mr-1"}/>
                    Primary Branch: {pipeline.workflow.source.branch}
                  </span>
            </div>
          </div>
        }

        {Array.isArray(pipeline?.workflow?.source?.secondary_branches) && pipeline?.workflow?.source?.secondary_branches?.length > 0 &&
          <div className="d-flex">
            <div className={"pl-2"}>
                  <span className="text-muted small my-auto">
                    <IconBase icon={faCodeBranch} iconSize={"sm"} className={"mr-1"}/>
                    Secondary Branches: {pipeline.workflow.source.secondary_branches?.join(", ")}
                  </span>
            </div>
          </div>
        }

        {pipeline.workflow.source.trigger_active &&
          <div className="d-flex">
            <div className="upper-case-first pl-2">
            <span className="text-muted small">
            <IconBase icon={faClipboardCheck} iconSize={"sm"} className={"mr-1 green"}/>
              Pipeline webhook {pipeline.workflow.source.trigger_active ? "Enabled" : "Disabled"}
            </span>
            </div>
          </div>}


        <div className="d-flex align-items-end flex-row m-2">
          <div className="ml-auto d-flex">
            {PipelineRoleHelper.canViewStepConfiguration(userData, pipeline) && <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip({ message: "View Settings" })}>
              <div>
                <IconBase icon={faSearchPlus}
                          className={"text-muted mr-2 pointer"}
                          onClickFunction={() => {
                            showWebhookConfigurationSummary();
                          }}/>
              </div>
            </OverlayTrigger>
            }

            {workflowStatus !== "running" && workflowStatus !== "paused" ?
              <>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Configure pipeline level settings such as source repository and webhook events" })}>
                  <div>
                    <IconBase icon={faCog}
                              className={"text-muted pointer"}
                              onClickFunction={() => {
                                handleEditSourceSettingsClick();
                              }}/>
                  </div>
                </OverlayTrigger>
              </>
              :
              <>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Cannot access settings while pipeline is running" })}>
                  <div>
                    <IconBase icon={faCog}
                              className={"text-muted mx-1"} />
                  </div>
                </OverlayTrigger>
              </>
            }
          </div>
        </div>
      </div>
    );
  };

  if (pipeline == null || pipeline.workflow == null || !Object.prototype.hasOwnProperty.call(pipeline.workflow, "source")) {
    return <ErrorDialog error={"Pipeline Workflow Details Not Found"} align={"top"}/>;
  }

  return (
    <>
      <div>
        <Row className={"my-1"}>
          <Col xs={12} sm={12} md={12} lg={6} className={"my-1 d-flex"}>
            <div>
              <PipelineWorkflowViewConfigurationButton
                pipeline={pipeline}
              />
            </div>
            <div>
              <PipelineWorkflowWorkflowEditingToggleButton
                pipeline={pipeline}
                editingWorkflow={editWorkflow}
                setEditingWorkflow={setEditWorkflow}
                workflowStatus={workflowStatus}
              />
            </div>
            <div>
              <PipelineWorkflowExportWorkflowButton
                pipeline={pipeline}
                editingWorkflow={editWorkflow}
                workflowStatus={workflowStatus}
                gitExportEnabled={gitExportEnabled}
                sourceRepositoryModel={sourceRepositoryModel}
              />
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} className={"my-1"}>
            {!editItemId &&
              <div className={"d-flex"}>
                <div className={"d-md-none d-lg-block ml-auto"} />
                <PipelineActionControls
                  pipeline={pipeline}
                  disabledActionState={false}
                  customerAccessRules={customerAccessRules}
                  fetchData={fetchPlan}
                  setPipeline={setPipeline}
                  setParentWorkflowStatus={setWorkflowStatus}
                />
              </div>}
          </Col>
        </Row>
      </div>

      <div
        className={"workflow-container p-2 dark-grey" + (zoomValue > 2 ? " scale-120-container" : "")}>
        <div className={setZoomClass(zoomValue)}>
          {getStartOfWorkflowItem()}

          <div style={{ height: "40px" }}>&nbsp;</div>

          <div className="step-items workflow-module-container-width mx-auto">
            <PipelineWorkflowItemList
              pipeline={pipeline}
              lastStep={lastStep}
              lastStepId={lastStep && lastStep.step_id}
              editWorkflow={editWorkflow}
              pipelineId={pipeline._id}
              fetchPlan={fetchPlan}
              refreshCount={refreshCount}
              customerAccessRules={customerAccessRules}
              parentCallbackEditItem={callbackFunctionEditItem}
              quietSavePlan={quietSavePlan}
              parentHandleViewSourceActivityLog={handleViewSourceActivityLog}
              parentWorkflowStatus={workflowStatus}
            />
          </div>

          <LineTo from="source" to="step-items" delay={100} orientation="v" zIndex={1}
                         borderColor="#0f3e84" borderWidth={2} fromAnchor="bottom" toAnchor="top"/>


          <div
            className="workflow-module-container workflow-module-container-width p-2 mb-4 text-center mx-auto">
            End of Workflow
          </div>
        </div>

        <div className="bottom-zoom-btns mb-1 mr-3">
          <Button variant="secondary"
                  className="mr-1"
                  size="sm"
                  disabled={zoomValue >= 2}
                  onClick={() => {
                    handleZoomClick(zoomValue, "in");
                  }}>
            <IconBase icon={faSearchPlus}/></Button>

          <Button variant="secondary"
                  className="mr-1"
                  size="sm"
                  disabled={zoomValue <= 1}
                  onClick={() => {
                    handleZoomClick(zoomValue, "out");
                  }}>
            <IconBase icon={faSearchMinus} /></Button>
        </div>
      </div>

      <ModalActivityLogs header={modalHeader} size="lg" jsonData={modalMessage} show={showModal}
                         setParentVisibility={setShowModal}/>

      {infoModal.show && <Modal header={infoModal.header} message={infoModal.message} button={infoModal.button}
                                handleCancelModal={() => setInfoModal({ ...infoModal, show: false })}/>}
    </>
  );

}


function renderTooltip(props) {
  const { message } = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );
}

PipelineWorkflow.propTypes = {
  pipeline: PropTypes.object,
  setPipeline: PropTypes.func,
  fetchPlan: PropTypes.func,
  customerAccessRules: PropTypes.object,
  editItemId: PropTypes.string,
  refreshCount: PropTypes.number,
  softLoading: PropTypes.bool,
};
export default PipelineWorkflow;