import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import modelHelpers from "components/common/model/modelHelpers";
import {s3PipelineStepConfigurationMetadata} from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/s3/s3PipelineStepConfiguration.metadata";
import S3StepAwsAccountToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/s3/inputs/S3StepAwsAccountToolSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import PipelineStepSelectInput from "components/common/list_of_values_input/workflow/pipelines/PipelineStepSelectInput";
import AwsBucketAccessLevelSelectInput
  from "components/common/list_of_values_input/tools/aws/access/AwsBucketAccessLevelSelectInput";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";

function S3StepConfiguration(
  {
    stepTool,
    parentCallback,
    closeEditorPanel,
    plan,
  }) {
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
  }, [stepTool]);

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

  if (isLoading || s3Model == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={s3Model}
      persistRecord={saveS3StepConfiguration}
      isLoading={isLoading}
    >
      <S3StepAwsAccountToolSelectInput
        model={s3Model}
        setModel={setS3Model}
      />
      <TextInputBase
        fieldName={"bucketName"}
        dataObject={s3Model}
        setDataObject={setS3Model}
      />
      <AwsBucketAccessLevelSelectInput
        fieldName={"bucketAccess"}
        model={s3Model}
        setModel={setS3Model}
      />
      <PipelineStepSelectInput
        fieldName={"buildStepId"}
        plan={plan}
        stepId={stepTool?._id}
        model={s3Model}
        setModel={setS3Model}
      />
      <TextInputBase
        fieldName={"s3Url"}
        dataObject={s3Model}
        setDataObject={setS3Model}
      />
    </PipelineStepEditorPanelContainer>
  );
}

S3StepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  parentCallback: PropTypes.func,
  closeEditorPanel: PropTypes.func,
  plan: PropTypes.array,
};

export default S3StepConfiguration;
