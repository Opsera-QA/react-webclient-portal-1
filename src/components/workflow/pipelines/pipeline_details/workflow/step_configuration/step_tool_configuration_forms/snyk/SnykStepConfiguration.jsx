import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import SnykToolSelectInput from "./inputs/SnykToolSelectInput";
import snykStepFormMetadata from "./snyk-stepForm-metadata";
import SnykProductsMultiSelectInput from "./inputs/SnykProductsMultiSelectInput";
import SnykLanguageSelectInput from "./inputs/SnykLanguageSelectInput";
import SnykLanguageVersionSelectInput from "./inputs/SnykLanguageVersionSelectInput";

function SnykStepConfiguration({ stepTool, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [azureDevopsModel, setAzureDevopsModel] = useState(undefined);
  const [snykModel, setSnykModel] = useState(undefined);
  const [threshold, setThreshold] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);

    let snykConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, snykStepFormMetadata);
    setSnykModel(snykConfigurationData);

    setIsLoading(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: snykModel.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };
    parentCallback(item);
  };

  if (isLoading || snykModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={snykModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <SnykToolSelectInput
        fieldName={"toolConfigId"}
        model={snykModel}
        setModel={setSnykModel}
      />
      <SnykProductsMultiSelectInput 
        fieldName={"snykProducts"}
        model={snykModel}
        setModel={setSnykModel}
        toolConfigId={snykModel.getData("toolConfigId")}
      />
      <SnykLanguageSelectInput 
        fieldName={"languageLevelId"}
        model={snykModel}
        setModel={setSnykModel}
        toolConfigId={snykModel.getData("toolConfigId")}
      />
      <SnykLanguageVersionSelectInput 
        fieldName={"version"}
        model={snykModel}
        setModel={setSnykModel}
        toolConfigId={snykModel.getData("toolConfigId")}
      />
    </PipelineStepEditorPanelContainer>
  );
}

SnykStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func
};

export default SnykStepConfiguration;
