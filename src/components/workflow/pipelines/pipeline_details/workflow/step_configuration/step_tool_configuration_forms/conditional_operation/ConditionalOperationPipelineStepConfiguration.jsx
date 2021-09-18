import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import conditionalOperationStepConfigurationMetadata from "./conditional-operation-step-configuration-metadata";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import thresholdMetadata from "components/common/metadata/pipelines/thresholdMetadata";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PipelineConditionMultiSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/conditional_operation/PipelineConditionMultiSelectInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PipelineSelectInput from "components/common/list_of_values_input/workflow/pipelines/PipelineSelectInput";

function ConditionalOperationPipelineStepConfiguration({ stepTool, pipelineId, parentCallback, closeEditorPanel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [conditionalOperationPipelineStepConfigurationDto, setConditionalOperationPipelineStepConfigurationDataDto] = useState(undefined);
  const [thresholdDto, setThresholdDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await loadFormData();
    setIsLoading(false);
  };

  const loadFormData = async () => {
    let { configuration, threshold } = stepTool;
    if (typeof configuration !== "undefined") {
      setConditionalOperationPipelineStepConfigurationDataDto(new Model(configuration, conditionalOperationStepConfigurationMetadata, false));
    } else {
      setConditionalOperationPipelineStepConfigurationDataDto(
        new Model({ ...conditionalOperationStepConfigurationMetadata.newObjectFields }, conditionalOperationStepConfigurationMetadata, false)
      );
    }
    if (typeof threshold !== "undefined") {
      setThresholdDto(new Model({...threshold}, thresholdMetadata, false));
    } else {
      setThresholdDto(new Model({...thresholdMetadata.newObjectFields}, thresholdMetadata, true)
      );
    }
  };

  const callbackFunction = async () => {
    const item = {
      configuration: {...conditionalOperationPipelineStepConfigurationDto.getPersistData()},
      threshold: {
        ...thresholdDto.getPersistData()
      },
    };
    parentCallback(item);
  };

  if (isLoading || conditionalOperationPipelineStepConfigurationDto == null || thresholdDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={conditionalOperationPipelineStepConfigurationDto}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <div className="mx-1">
        Opsera orchestration allows users to define a conditional step which will run based on the selected condition in relation to the prior step.
        In the case of “Prior Step Failure” this step will ONLY run if the prior step failed.
      </div>

      <div className="mt-4 title-text-7" style={{paddingBottom: "0"}}>Settings</div>
      <Row>
        <Col>
          <PipelineConditionMultiSelectInput
            setDataObject={setConditionalOperationPipelineStepConfigurationDataDto}
            dataObject={conditionalOperationPipelineStepConfigurationDto}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <PipelineSelectInput
            dataObject={conditionalOperationPipelineStepConfigurationDto}
            setDataObject={setConditionalOperationPipelineStepConfigurationDataDto}
            currentPipelineId={pipelineId}
            fieldName={"pipelineId"}
          />
        </Col>
      </Row>
      {/*TODO: Make threshold editor panel component*/}
      <div className="mt-5">
        <div className="ml-2 title-text-7">Threshold</div>
        <BooleanToggleInput disabled={true} dataObject={thresholdDto} setDataObject={setThresholdDto} fieldName={"ensureSuccess"}/>
        <BooleanToggleInput disabled={true} dataObject={thresholdDto} setDataObject={setThresholdDto} fieldName={"completeFirst"}/>
      </div>
    </PipelineStepEditorPanelContainer>
  );
}

ConditionalOperationPipelineStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func
};

export default ConditionalOperationPipelineStepConfiguration;
