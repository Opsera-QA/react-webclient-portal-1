import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {
  Form,
} from "react-bootstrap";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import modelHelpers from "components/common/model/modelHelpers";
import {s3PipelineStepConfigurationMetadata} from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/s3/s3PipelineStepConfiguration.metadata";
import {AuthContext} from "contexts/AuthContext";

const BUCKET_ACCESS = [
  {name: "Public", value: "public"},
  {name: "Private", value: "private"}
];

function S3StepConfiguration(
  {
    stepTool,
    parentCallback,
    closeEditorPanel,
  }) {
  const contextType = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [s3Model, setS3Model] = useState(undefined);

  const [threshold, setThreshold] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    const s3Data = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      s3PipelineStepConfigurationMetadata
    );
    setS3Model(s3Data);
    setIsLoading(false);
  };

  const saveS3StepConfiguration = async () => {
    const item = {
      configuration: s3Model.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };

    return await parentCallback(item);
  };

  const handleBuildStepChange = (selectedOption) => {
    setFormData({ ...formData, buildStepId: selectedOption._id });
  };

  const handleBucketAccessChange = (selectedOption) => {
    setFormData({...formData, bucketAccess: selectedOption.value});
  };

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={s3Model}
      persistRecord={saveS3StepConfiguration}
      isLoading={isLoading}
    >
      <Form>
            <Form.Group controlId="branchField">
              <Form.Label>Bucket Name*</Form.Label>
                <Form.Control
                  maxLength="150"
                  disabled={false}
                  type="text"
                  placeholder=""
                  value={formData.bucketName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, bucketName: e.target.value })
                  }
                />
          </Form.Group>
          <Form.Group controlId="s3bucketStep">
            <Form.Label>Bucket Access*</Form.Label>
            {BUCKET_ACCESS ? (
              <StandaloneSelectInput
                data={BUCKET_ACCESS}
                value={
                  formData.bucketAccess ? formData.bucketAccess : "private"
                }
                valueField="value"
                textField="name"
                setDataFunction={handleBucketAccessChange}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="text-muted ml-2"
                fixedWidth
              />
            )}
          </Form.Group>

            <Form.Group controlId="s3Step">
            <Form.Label>Build Step Info*</Form.Label>
            {listOfSteps ? (
              <StandaloneSelectInput
                data={listOfSteps}
                value={
                  formData.buildStepId
                    ? listOfSteps[
                        listOfSteps.findIndex(
                          (x) => x._id === formData.buildStepId
                        )
                      ]
                    : listOfSteps[0]
                }
                valueField="_id"
                textField="name"
                defaultValue={
                  formData.buildStepId
                    ? listOfSteps[
                        listOfSteps.findIndex(
                          (x) => x._id === formData.buildStepId
                        )
                      ]
                    : listOfSteps[0]
                }
                setDataFunction={handleBuildStepChange}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="text-muted ml-2"
                fixedWidth
              />
            )}
          </Form.Group>
          
          <Form.Group controlId="projectKey">
            <Form.Label>S3 Url</Form.Label>
            <Form.Control maxLength="150" type="text" placeholder="" disabled value={formData.s3Url || ""} onChange={e => setFormData({ ...formData, s3Url: e.target.value })} />
          </Form.Group>
      </Form>
    </PipelineStepEditorPanelContainer>
  );
}

S3StepConfiguration.propTypes = {
  stepTool: PropTypes.string,
  parentCallback: PropTypes.func,
  closeEditorPanel: PropTypes.func,
};

export default S3StepConfiguration;
