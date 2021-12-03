import React, { useState } from "react";
import PropTypes from "prop-types";
import OctopusScriptTypeSelectInput from "../input/OctopusScriptTypeSelectInput";
import OctopusKubernetesScriptView from "./OctopusKubernetesScriptView";
import OctopusFeedSelectInput from "../input/OctopusFeedSelectInput";
import RollbackToggleInput from "../input/RollbackToggleInput";
import AzureRepoTagsSelectInput from "../input/AzureRepoTagsSelectInput";
import TextInputBase from "../../../../../../../../common/inputs/text/TextInputBase";
import OctopusSpecifyDepVarsToggle from "../input/OctopusSpecifyDepVarsToggle";
import OctopusCustomParametersInput from "../input/OctopusCustomParametersInput";
function OctopusKubernetesPlatform({ dataObject, setDataObject, isLoading, plan, stepId }) {

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
        <AzureRepoTagsSelectInput
          dataObject={dataObject}
          setDataObject={setDataObject}
          plan={plan}
          stepId={stepId}
        />
        <TextInputBase
          setDataObject={setDataObject}
          dataObject={dataObject}
          fieldName={"namespace"}
          disabled={dataObject && dataObject.getData("spaceName").length === 0}
        />
        <OctopusSpecifyDepVarsToggle
          dataObject={dataObject}
          setDataObject={setDataObject}
          fieldName={"specifyDepVariables"}
        />
        {dataObject && dataObject.getData("specifyDepVariables") && (          
          <OctopusCustomParametersInput
            fieldName={"customParameters"}
            dataObject={dataObject}
            setDataObject={setDataObject}
          />          
        )}
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
