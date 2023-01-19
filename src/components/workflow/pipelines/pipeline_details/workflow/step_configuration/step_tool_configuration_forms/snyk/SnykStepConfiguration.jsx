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
import SnykPackagerSelectInput from "./inputs/SnykPackagerSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import SnykVulnerabilityThresholdInput from "./inputs/SnykVulnerabilityThresholdInput";
import SourceRepositoryToolIdentifierSelectInput from "components/common/list_of_values_input/workflow/pipelines/source_repository/SourceRepositoryToolIdentifierSelectInput";
import SnykScmToolSelectInput from "./inputs/SnykScmToolSelectInput";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";
import SnykScmRepositorySelectInput from "./inputs/SnykScmRepositorySelectInput";
import SnykBitbucketWorkspaceInput from "./inputs/SnykBitbucketWorkspaceInput";

function SnykStepConfiguration({ stepTool, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
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
        language={snykModel.getData("languageLevelId")}
      />
      <SnykPackagerSelectInput
        fieldName={"packagerNameOrBuildTool"}
        model={snykModel}
        setModel={setSnykModel}
        version={snykModel.getData("version")}
        language={snykModel.getData("languageLevelId")}
      />
      <BooleanToggleInput
        fieldName={"multiModuleProject"}
        dataObject={snykModel}
        setDataObject={setSnykModel}
      />
      <SnykVulnerabilityThresholdInput 
        fieldName={"thresholdVulnerability"}
        model={snykModel}
        setModel={setSnykModel}
      />
      <SourceRepositoryToolIdentifierSelectInput 
        fieldName={"service"}
        model={snykModel}
        setModel={setSnykModel}
      />
      <SnykScmToolSelectInput 
        model={snykModel}
        setModel={setSnykModel}
        service={snykModel.getData("service")}
      />
      <SnykBitbucketWorkspaceInput 
        dataObject={snykModel}
        setDataObject={setSnykModel}
      />
      <SnykScmRepositorySelectInput 
        dataObject={snykModel}
        setDataObject={setSnykModel}
      /> 
      <GitBranchInput 
        fieldName={"gitBranch"}
        service={snykModel.getData("service")}
        gitToolId={snykModel.getData("gitToolId")}
        workspace={snykModel.getData("workspace")}
        dataObject={snykModel}
        setDataObject={setSnykModel}
        repoId={snykModel.getData("repoId")}
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
