import React, { useEffect, useState } from "react";
import { faBracketsCurly, faInfoCircle, faSync, faTimes, faHandshake} from "@fortawesome/pro-light-svg-icons";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "../../../../../../../common/inputs/text/TextInputBase";
import aksStepFormMetadata from "./aks-stepForm-metadata";
import AzureToolSelectInput from "./inputs/AzureToolSelectInput";
import AzureCredentialIdSelectInput
  from "./inputs/AzureCredentialIdSelectInput";
import AksClusterSelectInput from "./inputs/AksClusterSelectInput";
import DynamicNameToggleInput from "./inputs/DynamicNameToggleInput";
import DockerPushStepSelectInput from "./inputs/DockerPushStepSelectInput";

function AksServiceDeployStepConfiguration({ stepTool, closeEditorPanel, parentCallback, plan, stepId, pipelineId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [aksModel, setAksModel] = useState(undefined);
  const [threshold, setThreshold] = useState(undefined);
  const [azureConfig, setAzureConfig] = useState(null);
  const [applicationData, setApplicationData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let aksServiceConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      aksStepFormMetadata
    );
    setAksModel(aksServiceConfigurationData);
    setIsLoading(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: aksModel.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };
    parentCallback(item);
  };

  if (isLoading || aksModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={aksModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <AzureToolSelectInput
        dataObject={aksModel}
        setDataObject={setAksModel}
        setAzureConfig={setAzureConfig}
      />
      <AzureCredentialIdSelectInput
        dataObject={aksModel}
        setDataObject={setAksModel}
        azureConfig={azureConfig}
        setApplicationData={setApplicationData}
      />
      <AksClusterSelectInput
        dataObject={aksModel}
        setDataObject={setAksModel}
        azureToolConfigId={aksModel?.getData("azureToolConfigId")}
        azureApplication={aksModel?.getData("azureCredentialId")}
        azureConfig={azureConfig}
        applicationData={applicationData}
      />
      <DynamicNameToggleInput
        dataObject={aksModel}
        setDataObject={setAksModel}
        fieldName={"dynamicServiceName"}
        pipelineId={pipelineId}
      />
      {aksModel && !aksModel?.getData("dynamicServiceName") && (
        <TextInputBase
          dataObject={aksModel}
          setDataObject={setAksModel}
          fieldName={"aksServiceName"}
        />
      )}
      <TextInputBase
        dataObject={aksModel}
        setDataObject={setAksModel}
        fieldName={"aksHostURL"}
      />
      <TextInputBase
        dataObject={aksModel}
        setDataObject={setAksModel}
        fieldName={"aksServicePort"}
      />
      <DockerPushStepSelectInput
        dataObject={aksModel}
        setDataObject={setAksModel}
        plan={plan}
        stepId={stepId}
      />
    </PipelineStepEditorPanelContainer>
  );
}

AksServiceDeployStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  pipelineId: PropTypes.string,
};

export default AksServiceDeployStepConfiguration;
