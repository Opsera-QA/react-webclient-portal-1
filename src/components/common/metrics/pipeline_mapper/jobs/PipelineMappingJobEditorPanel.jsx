import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import IconBase from "components/common/icons/IconBase";
import PipelineMappingJobTypeSelectInput
  from "components/common/metrics/pipeline_mapper/jobs/PipelineMappingJobTypeSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import PipelineMappingEnvironmentInput
  from "components/common/metrics/pipeline_mapper/environments/PipelineMappingEnvironmentInput";
import TagManager from "components/common/inputs/tags/TagManager";
import modelHelpers from "components/common/model/modelHelpers";
import {pipelineMappingJobMetadata} from "components/common/metrics/pipeline_mapper/jobs/pipelineMappingJob.metadata";

function PipelineMappingJobEditorPanel(
  { 
    disabled,
    updateJobFunction,
    job,
    deleteJobFunction,
  }) {
  const [jobModel, setJobModel] = useState(undefined);

  useEffect(() => {
    const parsedModel = modelHelpers.parseObjectIntoModel(job, pipelineMappingJobMetadata);

    if (parsedModel) {
      setJobModel(parsedModel);
    }
  }, [job]);

  // make standalone component
  const getDeletePropertyButton = () => {
    if (disabled !== true) {
      return (
        <Button variant="link" onClick={deleteJobFunction}>
          <span>
            <IconBase
              className={"danger-red"}
              icon={faTimes}
            />
          </span>
        </Button>
      );
    }
  };

  const setDataFunction = (newModel) => {
    setJobModel({...newModel});
    updateJobFunction(newModel);
  };

  if (jobModel == null) {
    return null;
  }

  return (
    <div className={"d-flex py-2"}>
      <Col sm={11}>
        <Row>
          <Col xs={12}>
            <TextInputBase
              fieldName={"name"}
              dataObject={jobModel}
              setDataObject={setDataFunction}
            />
          </Col>
          <Col xs={12}>
            <PipelineMappingJobTypeSelectInput
              fieldName={"type"}
              model={jobModel}
              setModel={setDataFunction}
            />
          </Col>
          <Col xs={12}>
            <PipelineMappingEnvironmentInput
              fieldName={"environments"}
              model={jobModel}
              setModel={setDataFunction}
            />
          </Col>
          <Col xs={12}>
            <TagManager
              fieldName={"tags"}
              model={jobModel}
              setModel={setDataFunction}
              type={"environment"}
            />
          </Col>
          <Col xs={12}>
            <TextInputBase
              fieldName={"description"}
              dataObject={jobModel}
              setDataObject={setDataFunction}
            />
          </Col>
        </Row>
      </Col>
      <Col sm={1} className={"px-0 mr-auto delete-button"}>
        {getDeletePropertyButton()}
      </Col>
    </div>
  );
}

PipelineMappingJobEditorPanel.propTypes = {
  disabled: PropTypes.bool,
  deleteJobFunction: PropTypes.func,
  updateJobFunction: PropTypes.func,
  job: PropTypes.object,
};

export default PipelineMappingJobEditorPanel;