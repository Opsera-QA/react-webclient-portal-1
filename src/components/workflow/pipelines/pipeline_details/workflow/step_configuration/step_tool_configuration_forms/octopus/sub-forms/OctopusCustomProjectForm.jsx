import React, {useContext} from "react";
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
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import OctopusTenantInputBase from "components/common/inputs/object/pipelines/octopus/OctopusTenantInputBase";

// TODO: Refactor soon
function OctopusCustomProjectForm({ dataObject, setDataObject, isLoading, disabled, pipelineId, listOfSteps }) {
  const { featureFlagHideItemInProd } = useContext(AuthContext);
  const getTenantInput = () => {
    if (["tenanted", "tenantedoruntenanted"].includes(dataObject?.getData("tenantedDeploymentMode")?.toLowerCase())) {
      if (featureFlagHideItemInProd() !== false) {
        return (
          <OctopusTenantSelectInput
            fieldName={"tenantId"}
            dataObject={dataObject}
            setDataObject={setDataObject}
            disabled={dataObject && dataObject.getData("projectGroupId").length === 0}
          />
        );
      }

      return (
        <OctopusTenantInputBase
          fieldName={"tenantList"}
          model={dataObject}
          setModel={setDataObject}
          tenantList={dataObject?.getData("tenantList")}
          environmentList={dataObject?.getData("environmentList")}
        />
      );
    }
  };

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
      {getTenantInput()}
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
      {dataObject && dataObject.getData("octopusFeedId") && (
        <>
          <SelectInputBase
            setDataObject={setDataObject}
            textField={"name"}
            valueField={"_id"}
            dataObject={dataObject}
            filter={"contains"}
            selectOptions={listOfSteps ? listOfSteps : []}
            fieldName={"ecrPushStepId"}
            disabled={listOfSteps.length === 0}
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
        </>
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
  pipelineId: PropTypes.string,
  listOfSteps: PropTypes.array,
};

export default OctopusCustomProjectForm;
