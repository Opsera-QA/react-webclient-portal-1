import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import OctopusFeedSelectInput from "../input/OctopusFeedSelectInput";
import RollbackToggleInput from "../input/RollbackToggleInput";
import OctopusVersionSelectInput from "../input/OctopusVersionSelectInput";
import OctopusSpecifyDepVarsToggle from "../input/OctopusSpecifyDepVarsToggle";
import OctopusMultiProtocolInput from "../input/OctopusMultiProtocolInput";
import IisAuthenticationSelectInput from "../input/IisAuthenticationSelectInput";
import IisDotNetClrVersionSelectInput from "../input/IisDotNetClrVersionSelectInput";
import IisPoolIdentityTypeSelectInput from "../input/IisPoolIdentityTypeSelectInput";
import OctopusCustomDeploymentDirectoryDetailsInput from "../input/OctopusCustomDeploymentDirectoryDetailsInput";
import OctopusCustomParametersInput from "../input/OctopusCustomParametersInput";

function OctopusDeployToIisView({dataObject, setDataObject, isLoading, disabled, platformType, pipelineId}) {

  return (
    <>
      <TextInputBase
        setDataObject={setDataObject}
        dataObject={dataObject}
        fieldName={"webSiteName"}                  
      />
      <TextInputBase
        setDataObject={setDataObject}
        dataObject={dataObject}
        fieldName={"applicationPoolName"}
      />
      <IisAuthenticationSelectInput
        dataObject={dataObject}
        setDataObject={setDataObject}
      />
      <OctopusMultiProtocolInput
        dataObject={dataObject}
        setDataObject={setDataObject}
        fieldName={"bindings"}
      />  
      <IisDotNetClrVersionSelectInput
        dataObject={dataObject}
        setDataObject={setDataObject}
      />
      <IisPoolIdentityTypeSelectInput
        dataObject={dataObject}
        setDataObject={setDataObject}
      />
      {dataObject.getData("applicationPoolIdentityType") &&
        dataObject.getData("applicationPoolIdentityType").toLowerCase() === "custom_user" && (
        <>
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"applicationPoolIdentityUsername"} />
          <VaultTextInput dataObject={dataObject} setDataObject={setDataObject} fieldName={"applicationPoolIdentityPassword"} />
        </>
      )}
       <BooleanToggleInput dataObject={dataObject} setDataObject={setDataObject} fieldName={"startApplicationPool"} />
       <OctopusCustomDeploymentDirectoryDetailsInput
        dataObject={dataObject}
        setDataObject={setDataObject}
        fieldName={"useCustomDeploymentDirectory"}
      /> 
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
      <TextInputBase
        dataObject={dataObject}
        setDataObject={setDataObject}
        fieldName={"octopusPhysicalPath"}
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
            fieldName={customVariableList}
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



OctopusDeployToIisView.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  platformType: PropTypes.string,
  pipelineId: PropTypes.string
};

export default OctopusDeployToIisView;
