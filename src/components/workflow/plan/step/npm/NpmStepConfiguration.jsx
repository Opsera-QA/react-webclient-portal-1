import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import {npmStepMetadata}
  from "components/workflow/plan/step/npm/npmStep.metadata";

function NpmStepConfiguration(
  {
    pipelineStep,
    parentCallback,
    closeEditorPanel,
  }) {
  const [isLoading, setIsLoading] = useState(false);
  const [npmStepModel, setNpmStepModel] = useState(undefined);
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
  }, [pipelineStep]);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(pipelineStep?.threshold);
    const s3Data = modelHelpers.getPipelineStepConfigurationModel(
      pipelineStep,
      npmStepMetadata
    );
    setNpmStepModel(s3Data);
    setIsLoading(false);
  };

  const saveS3StepConfiguration = async () => {
    const item = {
      configuration: npmStepModel.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };

    return await parentCallback(item);
  };

  if (isLoading || npmStepModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={npmStepModel}
      persistRecord={saveS3StepConfiguration}
      isLoading={isLoading}
      isStrict={true}
    >
      <TextAreaInput
        fieldName={"commands"}
        dataObject={npmStepModel}
        setDataObject={setNpmStepModel}
      />
      <TextInputBase
        fieldName={"path"}
        dataObject={npmStepModel}
        setDataObject={setNpmStepModel}
      />
    </PipelineStepEditorPanelContainer>
  );
}

NpmStepConfiguration.propTypes = {
  pipelineStep: PropTypes.object,
  parentCallback: PropTypes.func,
  closeEditorPanel: PropTypes.func,
};

export default NpmStepConfiguration;
