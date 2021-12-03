import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import CustomDeploymentScriptToggleInput from "../input/CustomDeploymentScriptToggleInput";
import ScriptLibrarySelectInput from "components/common/list_of_values_input/inventory/scripts/ScriptLibrarySelectInput";
import OctopusTomcatSelectInput from "../input/OctopusTomcatSelectInput";
import OctopusFeedSelectInput from "../input/OctopusFeedSelectInput";
import RollbackToggleInput from "../input/RollbackToggleInput";
import OctopusVersionSelectInput from "../input/OctopusVersionSelectInput";
import OctopusSpecifyDepVarsToggle from "../input/OctopusSpecifyDepVarsToggle";
import OctopusCustomParametersInput from "../input/OctopusCustomParametersInput";

function OctopusDeployToTomcatDetailsView({dataObject, setDataObject, isLoading, disabled, platformType, pipelineId}) {

  if (!platformType || platformType.toLowerCase() !== "deploy to tomcat via manager") {
    return null;
  }

  const getCustomScriptsInput = () => {
      if(!dataObject.getData("customDeploymentScriptsEnabled")){
          return null;
      }
      return (
        <>
          <ScriptLibrarySelectInput
            fieldName={"preDeploymentScriptId"}
            dataObject={dataObject}
            setDataObject={setDataObject}
            busy={isLoading}
            disabled={disabled || isLoading}
          />
          <ScriptLibrarySelectInput
            fieldName={"deploymentScriptId"}
            dataObject={dataObject}
            setDataObject={setDataObject}
            busy={isLoading}
            disabled={disabled || isLoading}
          />
          <ScriptLibrarySelectInput
            fieldName={"postDeploymentScriptId"}
            dataObject={dataObject}
            setDataObject={setDataObject}
            busy={isLoading}
            disabled={disabled || isLoading}
          />
        </>
      );
  };

  return (
    <>
      <OctopusTomcatSelectInput
        fieldName={"tomcatManagerId"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        disabled={false}
        platformType={
          dataObject && dataObject.getData("octopusPlatformType")
            ? dataObject.getData("octopusPlatformType")
            : ""
        }        
      />
      <TextInputBase
        dataObject={dataObject}
        setDataObject={setDataObject}
        fieldName={"contextPath"}
      />
      <CustomDeploymentScriptToggleInput
        dataObject={dataObject}
        setDataObject={setDataObject}
        fieldName={"customDeploymentScriptsEnabled"}
      />
      {getCustomScriptsInput()}
      <OctopusFeedSelectInput
        fieldName={"octopusFeedId"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        disabled={
          dataObject && dataObject.getData("spaceName")
            ? dataObject.getData("spaceName").length === 0
            : true
        }
        tool_prop={
          dataObject && dataObject.getData("spaceName")
            ? dataObject.getData("spaceName")
            : ""
        }
      />
      <RollbackToggleInput
        dataObject={dataObject}
        setDataObject={setDataObject}
        fieldName={"isRollback"}
      />
      {dataObject && dataObject.getData("isRollback") && (
        <OctopusVersionSelectInput
          fieldName={"octopusVersion"}
          dataObject={dataObject}
          setDataObject={setDataObject}
          pipelineId={pipelineId}
          disabled={
            dataObject && dataObject.getData("octopusFeedId")
              ? dataObject.getData("octopusFeedId").length === 0
              : true
          }
          tool_prop={
            dataObject && dataObject.getData("octopusFeedId")
              ? dataObject.getData("octopusFeedId")
              : ""
          }
        />
      )}
      <OctopusSpecifyDepVarsToggle
        dataObject={dataObject}
        setDataObject={setDataObject}
        fieldName={"specifyDepVariables"}
      />
      {dataObject && dataObject.getData("specifyDepVariables") && (
        <>
          <OctopusCustomParametersInput
            fieldName={"customParameters"}
            dataObject={dataObject}
            setDataObject={setDataObject}
          />
          <TextInputBase
            setDataObject={setDataObject}
            dataObject={dataObject}
            fieldName={"structuredConfigVariablesPath"}
            disabled={
              dataObject && dataObject.getData("spaceName").length === 0
            }
          />
          <TextInputBase
            setDataObject={setDataObject}
            dataObject={dataObject}
            fieldName={"xmlConfigTransformVariableValue"}
            disabled={
              dataObject && dataObject.getData("spaceName").length === 0
            }
          />
        </>
      )}      
    </>
  );
}



OctopusDeployToTomcatDetailsView.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  platformType: PropTypes.string,
  pipelineId: PropTypes.string
};

export default OctopusDeployToTomcatDetailsView;