import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import SnykToolSelectInput from "./inputs/SnykToolSelectInput";
import snykStepFormMetadata from "./snyk-stepForm-metadata";
import SnykProductsMultiSelectInput from "components/common/list_of_values_input/tools/snyk/products/SnykProductsMultiSelectInput";
import SnykLanguageVersionSelectInput from "components/common/list_of_values_input/tools/snyk/languages/version/SnykLanguageVersionSelectInput";
import SnykPackageManagerSelectInput from "components/common/list_of_values_input/tools/snyk/package_manager/SnykPackageManagerSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import SnykVulnerabilityThresholdInput from "./inputs/SnykVulnerabilityThresholdInput";
import SourceRepositoryToolIdentifierSelectInput from "components/common/list_of_values_input/workflow/pipelines/source_repository/SourceRepositoryToolIdentifierSelectInput";
import SnykScmToolSelectInput from "./inputs/SnykScmToolSelectInput";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";
import SnykScmRepositorySelectInput from "./inputs/SnykScmRepositorySelectInput";
import SnykBitbucketWorkspaceInput from "./inputs/SnykBitbucketWorkspaceInput";
import SnykPipelineStepLanguageSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/snyk/inputs/SnykPipelineStepLanguageSelectInput";

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
      <SnykPipelineStepLanguageSelectInput
          fieldName={"languageLevelId"}
          model={snykModel}
          setModel={setSnykModel}
      />
      <SnykLanguageVersionSelectInput
          fieldName={"version"}
          model={snykModel}
          setModel={setSnykModel}
          language={snykModel.getData("languageLevelId")}
      />
      <SnykPackageManagerSelectInput
          fieldName={"packagerNameOrBuildTool"}
          model={snykModel}
          setModel={setSnykModel}
          language={snykModel.getData("languageLevelId")}
          version={snykModel?.getData("version")}
      />
      <BooleanToggleInput
        fieldName={"multiModuleProject"}
        dataObject={snykModel}
        setDataObject={setSnykModel}
      />
      <BooleanToggleInput
          dataObject={snykModel}
          setDataObject={setSnykModel}
          fieldName={"clientSideThreshold"}
      />
      <SnykVulnerabilityThresholdInput 
        fieldName={"thresholdVulnerability"}
        model={snykModel}
        setModel={setSnykModel}
        visible={snykModel?.getData("clientSideThreshold")}
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
