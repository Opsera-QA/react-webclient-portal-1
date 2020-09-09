import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import ErrorDialog from "../../../../common/status_notifications/error";
import InfoDialog from "../../../../common/status_notifications/info";
import PipelineWorkflow from "./PipelineWorkflow";
import PipelineWorkflowEditor from "./PipelineWorkflowItemEditor";
import "../../../workflows.css";
import PipelineActionControls from "../PipelineActionControls";

function PipelineWorkflowView({
  pipeline,
  customerAccessRules,
  editItem,
  setEditItem,
  fetchPlan,
  setWorkflowStatus,
  getActivityLogs,
  refreshCount,
  setRefreshCount,
  setPipeline,
  softLoading
}) {

  const closeEditorPanel = () => {
    setEditItem(false);
  };

  const getPipelineWorkflowEditor = (editingItem) => {
    if (editingItem) {
      return (
        <Col xs lg="4" className="pl-2">
          <div className="content-card-1 table-content-block h-100">
            <PipelineWorkflowEditor editItem={editItem} pipeline={pipeline} closeEditorPanel={closeEditorPanel}
                                    fetchPlan={fetchPlan}/>
          </div>
          <div className="content-block-footer"/>
        </Col>
      );
    }
  };

  if (!pipeline) {
    return (<InfoDialog
      message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."/>);
  } else {
    return (
      <>
        <div className="workflow-view h-100">
          <Row className="w-100" style={{margin:"0"}}>
            <Col className="max-content-width content-block-collapse pt-3">
              <div className="w-100 mb-1 pr-1 text-right">

                  <PipelineActionControls pipeline={pipeline} disabledActionState={false}
                                          customerAccessRules={customerAccessRules}
                                          fetchData={fetchPlan}
                                          setPipeline={setPipeline}
                                          setRefreshCount={setRefreshCount}
                                          refreshCount={refreshCount}
                                          fetchActivityLogs={getActivityLogs}
                                          setParentWorkflowStatus={setWorkflowStatus}/>

              </div>
              <PipelineWorkflow pipeline={pipeline}
                                editItemId={editItem.step_id}
                                fetchPlan={fetchPlan}
                                customerAccessRules={customerAccessRules}
                                refreshCount={refreshCount}
                                softLoading={softLoading}/>
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
  editItem: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  setEditItem: PropTypes.func,
  setActiveTab: PropTypes.func,
  fetchPlan: PropTypes.func,
  setWorkflowStatus: PropTypes.func,
  setPipeline: PropTypes.func,
  refreshCount: PropTypes.number,
  setRefreshCount: PropTypes.func,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  softLoading: PropTypes.bool
};

export default PipelineWorkflowView;