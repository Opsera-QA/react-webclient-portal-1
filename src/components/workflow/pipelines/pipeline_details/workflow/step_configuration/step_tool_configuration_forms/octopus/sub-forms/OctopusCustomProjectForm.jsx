import React from "react";
import PropTypes from "prop-types";
import OctopusProjectGroupSelectInput from "../input/OctopusProjectGroupSelectInput";
import OctopusProjectSelectInput from "../input/OctopusProjectSelectInput";
import OctopusChannelSelectInput from "../input/OctopusChannelSelectInput";
import OctopusFeedSelectInput from "../input/OctopusFeedSelectInput";
import OctopusTenantSelectInput from "../input/OctopusTenantSelectInput";
import RollbackToggleInput from "../input/RollbackToggleInput";
import OctopusVersionSelectInput from "../input/OctopusVersionSelectInput";
import OctopusSpecifyDepVarsToggle from "../input/OctopusSpecifyDepVarsToggle";
import OctopusDeploymentVariables from "../input/OctopusDeploymentVariables";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function OctopusCustomProjectForm({ dataObject, setDataObject, isLoading, disabled, pipelineId }) {
  return (
    <>
      <OctopusProjectGroupSelectInput
        fieldName={"projectGroupId"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        disabled={dataObject && dataObject.getData("spaceName").length === 0}
      />
      <OctopusProjectSelectInput
        fieldName={"projectId"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        disabled={dataObject && dataObject.getData("projectGroupId").length === 0}
      />
      <OctopusChannelSelectInput
        fieldName={"channelId"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        disabled={dataObject && dataObject.getData("projectId").length === 0}
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
      {dataObject && dataObject.getData("tenantedDeploymentMode") && dataObject.getData("tenantedDeploymentMode").toLowerCase() === "tenanted" && (
        <OctopusTenantSelectInput
          fieldName={"tenantId"}
          dataObject={dataObject}
          setDataObject={setDataObject}
          disabled={dataObject && dataObject.getData("projectGroupId").length === 0}
        />
      )}      
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
          <OctopusDeploymentVariables
            fieldName={"deploymentVariables"}
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



OctopusCustomProjectForm.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  pipelineId: PropTypes.string
};

export default OctopusCustomProjectForm;
