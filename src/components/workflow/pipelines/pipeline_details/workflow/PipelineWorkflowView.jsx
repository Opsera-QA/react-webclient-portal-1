import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import ErrorDialog from "../../../../common/status_notifications/error";
import InfoDialog from "../../../../common/status_notifications/info";
import PipelineWorkflow from "./PipelineWorkflow";
import PipelineWorkflowEditor from "./PipelineWorkflowItemEditor";
import "../../../workflows.css";
import PipelineActionControls from "../PipelineActionControls";

function PipelineWorkflowView({ pipeline, customerAccessRules, editItem, setEditItem, fetchPlan, setWorkflowStatus, getActivityLogs, refreshCount, parentWorkflowStatus }) {
  const [error, setErrors] = useState();
  //const [runningStepId, setRunningStepId] = useState(false);

  const closeEditorPanel = () => {
    setEditItem(false);
  };
/*
  useEffect(() => {
    console.log("parentWorkflowStatus:", parentWorkflowStatus)

    if (parentWorkflowStatus === "running") {
      if (pipeline.workflow.last_step.step_id && runningStepId !== pipeline.workflow.last_step.step_id && pipeline.workflow.last_step.step_id.length > 0) {
        console.log("Calling Refresh")
        fetchPlan();
      } else {
        setRunningStepId(pipeline.workflow.last_step.step_id)
      }
    } else {
      setRunningStepId(false)
    }

  }, [refreshCount, parentWorkflowStatus]);*/

  const getPipelineWorkflowEditor = (editingItem) => {
    if (editingItem) {
      return (
        <Col xs lg="4" className="pl-2">
          <div className="content-card-1 table-content-block h-100">
            <PipelineWorkflowEditor editItem={editItem} pipeline={pipeline} closeEditorPanel={closeEditorPanel}
                                    fetchPlan={fetchPlan}/>
          </div>
          <div className="content-block-footer" />
        </Col>
      );
    }
  }

  if (error) {
    return (<ErrorDialog error={error}/>);
  } else if (pipeline == null) {
    return (<InfoDialog message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."/>);
  }
  else {
    return (
      <>
        <div className="pl-3 workflow-view h-100">
            <Row className="w-100">
              <Col className="max-content-width content-block-collapse pt-3">
                <div className="w-100 d-flex mb-1 pr-1">
                  <div className="flex-fill">
                    <div className="title-text-5">{pipeline.name}</div>
                  </div>
                  <div className="align-content-end">
                    <PipelineActionControls pipeline={pipeline} disabledActionState={false}
                                            customerAccessRules={customerAccessRules}
                                            fetchData={fetchPlan}
                                            fetchActivityLogs={getActivityLogs}
                                            setParentWorkflowStatus={setWorkflowStatus}/>
                  </div>
                </div>
                <PipelineWorkflow pipeline={pipeline} editItemId={editItem.step_id} fetchPlan={fetchPlan} customerAccessRules={customerAccessRules} refreshCount={refreshCount}/>
              </Col>
              {getPipelineWorkflowEditor(editItem)}
            </Row>
        </div>
      </>
    );
  }
}


PipelineWorkflowView.propTypes = {
  pipeline: PropTypes.object,
  customerAccessRules: PropTypes.object,
  editItem: PropTypes.bool,
  setEditItem: PropTypes.func,
  setActiveTab: PropTypes.func,
  fetchPlan: PropTypes.func,
  setWorkflowStatus: PropTypes.func,
  refreshCount: PropTypes.number,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default PipelineWorkflowView;