import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import IconBase from "components/common/icons/IconBase";
import PipelineMockStepTypeSelectInput from "components/common/metrics/mock_pipeline/steps/PipelineMockStepTypeSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import PipelineMappingEnvironmentInput from "components/common/metrics/mock_pipeline/environments/PipelineMappingEnvironmentInput";
import TagManager from "components/common/inputs/tags/TagManager";
import modelHelpers from "components/common/model/modelHelpers";
import { pipelineMockStepMetadata } from "components/common/metrics/mock_pipeline/steps/pipelineMockStepMetadata";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";

function PipelineMockStepEditorPanel({ disabled, updateStepFunction, pipelineStep, deleteStepFunction }) {
  const [stepModel, setStepModel] = useState(undefined);

  useEffect(() => {
    const parsedModel = modelHelpers.parseObjectIntoModel(pipelineStep, pipelineMockStepMetadata);

    if (parsedModel) {
      setStepModel(parsedModel);
    }
  }, [pipelineStep]);

  // make standalone component
  const getDeletePropertyButton = () => {
    if (disabled !== true) {
      return (
        <Button variant="link" onClick={deleteStepFunction}>
          <span>
            <IconBase className={"danger-red"} icon={faTimes} />
          </span>
        </Button>
      );
    }
  };

  const setDataFunction = (newModel) => {
    setStepModel({ ...newModel });
    updateStepFunction(newModel);
  };

  if (stepModel == null) {
    return null;
  }

  // TODO: Make sure all required inputs are captured. Once that is done we may need to update the actual schema in Node if it does not match.
  return (
    <div className={"d-flex py-2"}>
      <Col sm={11}>
        <Row>
          <Col xs={12}>
            <TextInputBase fieldName={"name"} dataObject={stepModel} setDataObject={setDataFunction} />
          </Col>
          <Col xs={12}>
            <PipelineMockStepTypeSelectInput fieldName={"type"} model={stepModel} setModel={setDataFunction} />
          </Col>
          <Col xs={12}>
            <PipelineMappingEnvironmentInput fieldName={"environments"} model={stepModel} setModel={setDataFunction} />
          </Col>
          <Col xs={12}>
            {/* <TagManager fieldName={"tags"} model={stepModel} setModel={setDataFunction} type={"environment"} /> */}
            <TagMultiSelectInput fieldName={"tags"} dataObject={stepModel} setDataObject={setDataFunction} />
          </Col>
          <Col xs={12}>
            <TextInputBase fieldName={"description"} dataObject={stepModel} setDataObject={setDataFunction} />
          </Col>
        </Row>
      </Col>
      <Col sm={1} className={"px-0 mr-auto delete-button"}>
        {getDeletePropertyButton()}
      </Col>
    </div>
  );
}

PipelineMockStepEditorPanel.propTypes = {
  disabled: PropTypes.bool,
  deleteStepFunction: PropTypes.func,
  updateStepFunction: PropTypes.func,
  pipelineStep: PropTypes.object,
};

export default PipelineMockStepEditorPanel;
