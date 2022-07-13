import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import azureCliStepFormMetadata from "./azureCli-stepForm-metadata";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import AzureCliStepAzureToolSelectInput from "./inputs/AzureCliStepAzureToolSelectInput";
import AzureCliStepApplicationSelectInput from "./inputs/AzureCliStepApplicationSelectInput";
import AzureCliScriptTypeSelectInput from "./inputs/AzureCliScriptTypeSelectInput";
import AzureCliInputParametersInput from "./inputs/AzureCliInputParametersInput";
import AzureCliEnvironmentVariablesInput from "./inputs/AzureCliEnvironmentVariablesInput";
import ScriptLibrarySelectInput from "components/common/list_of_values_input/inventory/scripts/ScriptLibrarySelectInput";
import AzureCliScmToolTypeSelectInput from "./inputs/AzureCliScmToolTypeSelectInput";
import AzureCliScmToolSelectInput from "./inputs/AzureCliScmToolSelectInput";
import AzureCliBitbucketWorkspaceSelectInput from "./inputs/AzureCliBitbucketWorkspaceSelectInput";
import AzureCliGitRepositorySelectInput from "./inputs/AzureCliGitRepositorySelectInput";
import AzureCliGitBranchSelectInput from "./inputs/AzureCliGitBranchSelectInput";

function AzureCliStepConfiguration({ stepTool, closeEditorPanel, parentCallback, plan, stepId, pipelineId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [azureCliModel, setAzureCliModel] = useState(undefined);
  const [threshold, setThreshold] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let azureFunctionsConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      azureCliStepFormMetadata
    );
    setAzureCliModel(azureFunctionsConfigurationData);
    setIsLoading(false);
  };

  const saveAzureCliStepConfiguration = async () => {
    const item = {
      configuration: azureCliModel.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };
    await parentCallback(item);
    return closeEditorPanel();
  };

  if (isLoading || azureCliModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  const getScriptFields = () => {
    if (azureCliModel?.getData("scriptType") == undefined || azureCliModel?.getData("scriptType") === "") {
      return null;
    }

    if (azureCliModel?.getData("scriptType") === "inline") {
      return (
        <TextAreaInput dataObject={azureCliModel} setDataObject={setAzureCliModel} fieldName={"commands"} />
      );
    } else if (azureCliModel?.getData("scriptType") === "script") {
      return (
        <ScriptLibrarySelectInput
          fieldName={"scriptId"}
          model={azureCliModel}
          setModel={setAzureCliModel}
        />
      );
    } else if (azureCliModel?.getData("scriptType") === "package") {
      return (
        <>
          <AzureCliScmToolTypeSelectInput model={azureCliModel} setModel={setAzureCliModel} />
          <AzureCliScmToolSelectInput model={azureCliModel} setModel={setAzureCliModel} />
          <AzureCliBitbucketWorkspaceSelectInput model={azureCliModel} setModel={setAzureCliModel} />
          <AzureCliGitRepositorySelectInput model={azureCliModel} setModel={setAzureCliModel} />
          <AzureCliGitBranchSelectInput model={azureCliModel} setModel={setAzureCliModel} />
          <TextAreaInput dataObject={azureCliModel} setDataObject={setAzureCliModel} fieldName={"commands"} />
        </>
      );
    }
  };

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={azureCliModel}
      persistRecord={saveAzureCliStepConfiguration}
      isLoading={isLoading}
    >
      <AzureCliStepAzureToolSelectInput
        model={azureCliModel}
        setModel={setAzureCliModel}
      />
      <AzureCliStepApplicationSelectInput
        model={azureCliModel}
        setModel={setAzureCliModel}
        azureToolId={azureCliModel?.getData("azureToolConfigId")}
      />
      <AzureCliScriptTypeSelectInput
        model={azureCliModel}
        setModel={setAzureCliModel}
      />
      {getScriptFields()}
      <AzureCliInputParametersInput
        model={azureCliModel}
        setModel={setAzureCliModel}
      />
      <AzureCliEnvironmentVariablesInput
        model={azureCliModel}
        setModel={setAzureCliModel}
      />
    </PipelineStepEditorPanelContainer>
  );
}

AzureCliStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  pipelineId: PropTypes.string,
};

export default AzureCliStepConfiguration;
