import React, { useState } from "react";
import PropTypes from "prop-types";
import OctopusScriptTypeSelectInput from "../input/OctopusScriptTypeSelectInput";
import OctopusKubernetesScriptView from "./OctopusKubernetesScriptView";
import OctopusFeedSelectInput from "../input/OctopusFeedSelectInput";
import RollbackToggleInput from "../input/RollbackToggleInput";
import AzureToolSelectInput from "../input/AzureToolSelectInput";
import AzureCredentialIdSelectInput from "../input/AzureCredentialIdSelectInput";
import AcrPushStepSelectInput from "../input/AcrPushStepSelectInput";
import AzureRepoTagsSelectInput from "../input/AzureRepoTagsSelectInput";
import TextInputBase from "../../../../../../../../common/inputs/text/TextInputBase";

function OctopusKubernetesPlatform({ dataObject, setDataObject, isLoading, plan, stepId }) {
  const [azureConfig, setAzureConfig] = useState(null);
  const [applicationData, setApplicationData] = useState(null);

  return (
    <>
      <>
        <OctopusScriptTypeSelectInput
          dataObject={dataObject}
          fieldName={"scriptSource"}
          setDataObject={setDataObject}
          tool_prop={"Script"}
        />
        <OctopusKubernetesScriptView
          dataObject={dataObject}
          setDataObject={setDataObject}
          disabled={
            dataObject && dataObject.getData("scriptSource") ? dataObject.getData("scriptSource").length === 0 : true
          }
          tool_prop={"Script"}
        />
        <OctopusFeedSelectInput
          fieldName={"octopusFeedId"}
          dataObject={dataObject}
          setDataObject={setDataObject}
          disabled={dataObject && dataObject.getData("spaceName") ? dataObject.getData("spaceName").length === 0 : true}
          tool_prop={dataObject && dataObject.getData("spaceName") ? dataObject.getData("spaceName") : ""}
        />
        <RollbackToggleInput dataObject={dataObject} setDataObject={setDataObject} fieldName={"isRollback"} />
        <AzureToolSelectInput dataObject={dataObject} setDataObject={setDataObject} setAzureConfig={setAzureConfig} />
        <AzureCredentialIdSelectInput
          dataObject={dataObject}
          setDataObject={setDataObject}
          azureConfig={azureConfig}
          setApplicationData={setApplicationData}
        />
        <AcrPushStepSelectInput dataObject={dataObject} setDataObject={setDataObject} plan={plan} stepId={stepId} />
        <AzureRepoTagsSelectInput
          dataObject={dataObject}
          setDataObject={setDataObject}
          azureConfig={azureConfig}
          applicationData={applicationData}
          acrLoginUrl={dataObject?.getData("acrPushStepId")}
        />
        <TextInputBase
          setDataObject={setDataObject}
          dataObject={dataObject}
          fieldName={"namespace"}
          disabled={dataObject && dataObject.getData("spaceName").length === 0}
        />
      </>
    </>
  );
}

OctopusKubernetesPlatform.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  plan: PropTypes.array,
  stepId: PropTypes.string,
};

export default OctopusKubernetesPlatform;
