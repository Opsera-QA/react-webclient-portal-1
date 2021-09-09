import React, { useEffect, useState } from "react";
import { faBracketsCurly, faInfoCircle, faSync, faTimes, faHandshake} from "@fortawesome/pro-light-svg-icons";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "../../../../../../../common/inputs/text/TextInputBase";
import azureFunctionsStepFormMetadata from "./azureFunctions-stepForm-metadata";
import AzureToolSelectInput from "./inputs/AzureToolSelectInput";
import AzureCredentialIdSelectInput
  from "./inputs/AzureCredentialIdSelectInput";
import DynamicNameToggleInput from "./inputs/DynamicNameToggleInput";
import AzureFunctionsRegionSelectInput from "./inputs/AzureFunctionsRegionSelectInput";
import DockerPushStepSelectInput from "./inputs/DockerPushStepSelectInput";
import AzureFunctionsApplicationTypeSelectInput from "./inputs/AzureFunctionsApplicationTypeSelectInput";

function AzureFunctionsStepConfiguration({ stepTool, closeEditorPanel, parentCallback, plan, stepId, pipelineId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [azureFunctionsModel, setAzureFunctionsModel] = useState(undefined);
  const [threshold, setThreshold] = useState(undefined);
  const [azureConfig, setAzureConfig] = useState(null);
  const [applicationData, setApplicationData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let azureFunctionsConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      azureFunctionsStepFormMetadata
    );
    setAzureFunctionsModel(azureFunctionsConfigurationData);
    setIsLoading(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: azureFunctionsModel.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };
    parentCallback(item);
  };

  if (isLoading || azureFunctionsModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={azureFunctionsModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <AzureToolSelectInput
        dataObject={azureFunctionsModel}
        setDataObject={setAzureFunctionsModel}
        setAzureConfig={setAzureConfig}
      />
      <AzureCredentialIdSelectInput
        dataObject={azureFunctionsModel}
        setDataObject={setAzureFunctionsModel}
        azureConfig={azureConfig}
        setApplicationData={setApplicationData}
      />
      <AzureFunctionsRegionSelectInput
        fieldName="azureRegion"
        dataObject={azureFunctionsModel}
        setDataObject={setAzureFunctionsModel}
        azureToolConfigId={azureFunctionsModel?.getData("azureToolConfigId")}
        azureConfig={azureConfig}
        azureApplication={azureFunctionsModel?.getData("azureCredentialId")}
        applicationData={applicationData}
      />
      <AzureFunctionsApplicationTypeSelectInput
        fieldName="applicationType"
        dataObject={azureFunctionsModel}
        setDataObject={setAzureFunctionsModel}
        azureToolConfigId={azureFunctionsModel?.getData("azureToolConfigId")}
        azureConfig={azureConfig}
        azureApplication={azureFunctionsModel?.getData("azureCredentialId")}
        applicationData={applicationData}
        region={azureFunctionsModel?.getData("azureRegion")}
      />
      <DynamicNameToggleInput
        dataObject={azureFunctionsModel}
        setDataObject={setAzureFunctionsModel}
        fieldName={"dynamicServiceName"}
        pipelineId={pipelineId}
      />
      {azureFunctionsModel && !azureFunctionsModel?.getData("dynamicServiceName") && (
        <TextInputBase
          dataObject={azureFunctionsModel}
          setDataObject={setAzureFunctionsModel}
          fieldName={"azureFunctionsServiceName"}
        />
      )}
      <DockerPushStepSelectInput
        dataObject={azureFunctionsModel}
        setDataObject={setAzureFunctionsModel}
        plan={plan}
        stepId={stepId}
      />
    </PipelineStepEditorPanelContainer>
  );
}

AzureFunctionsStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  pipelineId: PropTypes.string,
};

export default AzureFunctionsStepConfiguration;
