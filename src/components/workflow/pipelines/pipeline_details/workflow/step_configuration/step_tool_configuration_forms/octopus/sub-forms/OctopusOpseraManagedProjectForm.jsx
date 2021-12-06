import React from "react";
import PropTypes from "prop-types";
import OctopusTargetRolesSelectInput from "../input/OctopusTargetRolesSelect";
import OctopusPlatformTypeSelectInput from "../input/OctopusPlatformTypeSelectInput";
import OctopusDeploymentTypeInputSelect from "../input/OctopusDeploymentTypeInputSelect";
import OctopusFeedSelectInput from "../input/OctopusFeedSelectInput";
import OctopusVersionSelectInput from "../input/OctopusVersionSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import RollbackToggleInput from "../input/RollbackToggleInput";
import OctopusSpecifyDepVarsToggle from "../input/OctopusSpecifyDepVarsToggle";
import OctopusLifecycleSelectInput from "../input/OctopusLifecycleSelectInput";
import OctopusScriptTypeSelectInput from "../input/OctopusScriptTypeSelectInput";
import OctopusScriptTypeDetailsView from "../input/OctopusScriptTypeDetailsView";
import OctopusProjectNameInput from "../input/OctopusProjectNameInput";
import OctopusProjectGroupSelectInput from "../input/OctopusProjectGroupSelectInput";
import OctopusChannelSelectInput from "../input/OctopusChannelSelectInput";
import OctopusDeployToTomcatDetailsView from "./OctopusDeployToTomcatDetailsView";
import OctopusDeployToIisView from "./OctopusDeployToIisView";
import OctopusDeployToJavaArchiveView from "./OctopusDeployToJavaArchiveView";
import OctopusKubernetesPlatform from "./OctopusKubernetesPlatform";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusCustomParametersInput from "../input/OctopusCustomParametersInput";

function OctopusOpseraManagedProjectForm({
    dataObject, 
    setDataObject, 
    isLoading, 
    disabled, 
    pipelineId, 
    stepTool, 
    listOfSteps,  
    plan,
    stepId        
}) {

  return (
    <>
      <OctopusProjectGroupSelectInput 
        fieldName={"projectGroupId"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        disabled={dataObject && dataObject.getData("spaceName").length === 0}
      />
      <OctopusProjectNameInput
        dataObject={dataObject}
        setDataObject={setDataObject}
        stepTool={stepTool}
      />
      <TextInputBase
        setDataObject={setDataObject}
        dataObject={dataObject}
        fieldName={"projectDescription"}
        disabled={dataObject && dataObject.getData("spaceName").length === 0}
      />
      <OctopusChannelSelectInput 
        fieldName={"channelId"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        disabled={dataObject && dataObject.getData("projectId").length === 0}
      />      
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
      <OctopusTargetRolesSelectInput
        fieldName={"octopusTargetRoles"}
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
      <OctopusLifecycleSelectInput
        fieldName={"lifecycleId"}
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
      <OctopusPlatformTypeSelectInput
        fieldName={"octopusPlatformType"}
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
      {dataObject &&
      dataObject.getData("octopusPlatformType") &&
      dataObject.getData("octopusPlatformType") === "Kubernetes" && (
        <OctopusKubernetesPlatform
          dataObject={dataObject}
          setDataObject={setDataObject}
          isLoading={isLoading}
          plan={plan}
          stepId={stepId}
        />
      )}
      {dataObject &&
      dataObject.getData("octopusPlatformType") &&
      (dataObject.getData("octopusPlatformType") === "Azure" ||
        dataObject.getData("octopusPlatformType") === "Script") && (
        <>
          <OctopusDeploymentTypeInputSelect
            fieldName={"octopusDeploymentType"}
            dataObject={dataObject}
            setDataObject={setDataObject}
            disabled={
              dataObject && dataObject.getData("octopusPlatformType")
                ? dataObject.getData("octopusPlatformType").length === 0
                : true
            }
            tool_prop={
              dataObject && dataObject.getData("octopusPlatformType")
                ? dataObject.getData("octopusPlatformType")
                : ""
            }
          />
          <OctopusScriptTypeSelectInput
            dataObject={dataObject}
            setDataObject={setDataObject}
            disabled={
              dataObject && dataObject.getData("octopusPlatformType")
                ? dataObject.getData("octopusPlatformType").length === 0
                : true
            }
            tool_prop={
              dataObject && dataObject.getData("octopusPlatformType")
                ? dataObject.getData("octopusPlatformType")
                : ""
            }
          />
          <OctopusScriptTypeDetailsView
            dataObject={dataObject}
            setDataObject={setDataObject}
            disabled={
              dataObject && dataObject.getData("scriptSource")
                ? dataObject.getData("scriptSource").length === 0
                : true
            }
            tool_prop={
              dataObject && dataObject.getData("octopusPlatformType")
                ? dataObject.getData("octopusPlatformType")
                : ""
            }
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
          {dataObject &&
          dataObject.getData("octopusPlatformType") &&
          dataObject.getData("octopusPlatformType") !== "Script" && (
            <TextInputBase
              dataObject={dataObject}
              setDataObject={setDataObject}
              fieldName={"octopusPhysicalPath"}
            />
          )
          }
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
                fieldName={"customVariableList"}
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
      )}
      {dataObject &&
      dataObject.getData("octopusPlatformType") &&
      dataObject.getData("octopusPlatformType").toLowerCase() === "deploy to tomcat via manager" && (
        <OctopusDeployToTomcatDetailsView
          dataObject={dataObject}
          setDataObject={setDataObject}
          disabled={false}
          platformType={
            dataObject && dataObject.getData("octopusPlatformType")
              ? dataObject.getData("octopusPlatformType")
              : ""
          }
          pipelineId={pipelineId}
        />
      )}
      {dataObject &&
      dataObject.getData("octopusPlatformType") &&
      dataObject.getData("octopusPlatformType") === "Package" && (
        <>
          <OctopusDeploymentTypeInputSelect
            fieldName={"octopusDeploymentType"}
            dataObject={dataObject}
            setDataObject={setDataObject}
            disabled={
              dataObject && dataObject.getData("octopusPlatformType")
                ? dataObject.getData("octopusPlatformType").length === 0
                : true
            }
            tool_prop={
              dataObject && dataObject.getData("octopusPlatformType")
                ? dataObject.getData("octopusPlatformType")
                : ""
            }
          />
          {dataObject.getData("octopusDeploymentType") &&
          dataObject.getData("octopusDeploymentType").toLowerCase() === "octopus.iis" && (
            <OctopusDeployToIisView
              dataObject={dataObject}
              setDataObject={setDataObject}
              disabled={false}
              platformType={
                dataObject && dataObject.getData("octopusPlatformType")
                  ? dataObject.getData("octopusPlatformType")
                  : ""
              }
              pipelineId={pipelineId}
            />
          )}
          {dataObject.getData("octopusDeploymentType") &&
          dataObject.getData("octopusDeploymentType").toLowerCase() === "octopus.javaarchive" && (
            <OctopusDeployToJavaArchiveView
              dataObject={dataObject}
              setDataObject={setDataObject}
              disabled={false}
              platformType={
                dataObject && dataObject.getData("octopusPlatformType")
                  ? dataObject.getData("octopusPlatformType")
                  : ""
              }
              pipelineId={pipelineId}
            />
          )}
        </>
      )}
    </>
  );
}



OctopusOpseraManagedProjectForm.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  pipelineId: PropTypes.string,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  stepTool: PropTypes.object,
  listOfSteps: PropTypes.array,  
};

export default OctopusOpseraManagedProjectForm;
