import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import modelHelpers from "components/common/model/modelHelpers";
import { pipelineMockWorkflowMetadata } from "components/common/metrics/mock_pipeline/workflow/pipelineMockWorkflowMetadata";
import PipelineMockPlanInput from "components/common/metrics/mock_pipeline/steps/PipelineMockPlanInput";

function PipelineMockWorkflowEditorPanel({ model, setModel }) {
  const [workflowModel, setWorkflowModel] = useState(undefined);

  useEffect(() => {
    const workflow = model?.getData("workflow");
    const parsedModel = modelHelpers.parseObjectIntoModel(workflow, pipelineMockWorkflowMetadata);

    if (parsedModel) {
      setWorkflowModel(parsedModel);
    }
  }, []);

  const setDataFunction = (newModel) => {
    setWorkflowModel({ ...newModel });
    const newWorkflow = newModel?.getPersistData();
    model.setData("workflow", newWorkflow);
    setModel({ ...model });
  };

  if (workflowModel == null) {
    return null;
  }

  return (
    <div className={"d-flex py-2"}>
      <Row>
        <Col xs={12}>
          {/*
          TODO: Add source input if necessary
          This will require another editor panel and metadata
          */}
        </Col>
        <Col xs={12}>
          <PipelineMockPlanInput model={workflowModel} setModel={setDataFunction} fieldName={"plan"} />
        </Col>
      </Row>
    </div>
  );
}

PipelineMockWorkflowEditorPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default PipelineMockWorkflowEditorPanel;
