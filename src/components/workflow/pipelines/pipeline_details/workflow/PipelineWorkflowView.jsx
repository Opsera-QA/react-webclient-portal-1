import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { Row, Col } from "react-bootstrap";
import ErrorDialog from "../../../../common/status_notifications/error";
import InfoDialog from "../../../../common/status_notifications/info";
import PipelineWorkflow from "./PipelineWorkflow";
import PipelineWorkflowEditor from "./PipelineWorkflowItemEditor";
import "../../../workflows.css";

function PipelineWorkflowView({ pipeline, customerAccessRules, editItem, setEditItem, fetchPlan }) {
  const [error, setErrors] = useState();

  const closeEditorPanel = () => {
    setEditItem(false);
  };

  const getPipelineWorkflowEditor = (editingItem) => {
    if (editingItem) {
      return (
        <Col xs lg="4" className="pl-0">
          <div className="content-container content-card-1">
            <PipelineWorkflowEditor editItem={editItem} pipeline={pipeline} closeEditorPanel={closeEditorPanel}
                                    fetchPlan={fetchPlan}/>
            <div className="content-block-footer" />
          </div>
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
        <div className="workflow-view w-100">
            <Row>
              <Col>
                <PipelineWorkflow pipeline={pipeline} editItemId={editItem.step_id} fetchPlan={fetchPlan} customerAccessRules={customerAccessRules}/>
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
  fetchPlan: PropTypes.func
};

export default PipelineWorkflowView;