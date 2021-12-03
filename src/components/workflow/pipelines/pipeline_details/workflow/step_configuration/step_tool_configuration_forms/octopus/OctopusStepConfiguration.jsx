import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import OctopusStepFormMetadata from "./octopus-stepForm-metadata";
import Model from "core/data_model/model";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import {DialogToastContext} from "contexts/DialogToastContext";
import octopusActions from "../../../../../../../inventory/tools/tool_details/tool_jobs/octopus/octopus-actions";
import OctopusToolSelectInput from "./input/OctopusToolSelectInput";
import OctopusSpaceNameSelectInput from "./input/OctopusSpaceNameSelectInput";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import OctopusProjectTypeSelectInput from "./input/OctopusProjectTypeSelectInput";
import OctopusCustomProjectForm from "./sub-forms/OctopusCustomProjectForm";
import OctopusOpseraManagedProjectForm from "./sub-forms/OctopusOpseraManagedProjectForm";
import OctopusStepOctopusEnvironmentMultiSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/input/OctopusStepOctopusEnvironmentMultiSelectInput";

// TODO: This needs a refactor. I plan on doing it soon.
function OctopusStepConfiguration({ stepTool, plan, stepId, parentCallback, callbackSaveToVault, closeEditorPanel, pipelineId }) {
  const { getAccessToken, featureFlagHideItemInProd } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [octopusStepConfigurationDto, setOctopusStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [listOfSteps, setListOfSteps] = useState([]);
  const [isFormUpdate, setIsFormUpdate] = useState(false);

  useEffect(() => {
    loadFormData(stepTool);
  }, []);

  const loadFormData = async (step) => {    
    setIsLoading(true);
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
      setIsFormUpdate(true);      
      setOctopusStepConfigurationDataDto(new Model(configuration, OctopusStepFormMetadata, false));
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      setOctopusStepConfigurationDataDto(
        new Model({ ...OctopusStepFormMetadata.newObjectFields }, OctopusStepFormMetadata, false)
      );
    }

    if (plan && stepId) {
      let pipelineSteps = pipelineHelpers.formatStepOptions(plan, stepId);
      setListOfSteps(pipelineSteps);
    }

    setIsLoading(false);
  };

  const saveToVault = async (pipelineId, stepId, key, name, value) => {
    
    let octopusConfig = {...octopusStepConfigurationDto};

    const keyName = `${pipelineId}-${stepId}-${key}`;
    const body = {
      "key": keyName,
      "value": value
    };
    const response = await callbackSaveToVault(body);    
    if (response.status === 200 ) {
      return { name: name, vaultKey: keyName };
    } else {
      octopusConfig.setData("applicationPoolIdentityPassword", {});
      setOctopusStepConfigurationDataDto({...octopusConfig});
      let errorMessage = "ERROR: Something has gone wrong saving secure data to your vault.  Please try again or report the issue to OpsERA.";
      toastContext.showErrorDialog(errorMessage);
      return "";
    }
  };

  const callbackFunction = async () => {
    let octopusConfig = {...octopusStepConfigurationDto};
    const item = {
      configuration: octopusStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    let validateDepVariables = await validateDeploymentVariables();
    let validateCondVariables = await validateConditionalVariables();

    if (octopusConfig.getData("applicationPoolIdentityType") &&
      octopusConfig.getData("applicationPoolIdentityType").toLowerCase() === "custom_user" &&
      octopusConfig.getData("applicationPoolIdentityUsername")?.length > 0 &&
      typeof (octopusConfig.getData("applicationPoolIdentityPassword")) === "string" &&
      octopusConfig.getData("applicationPoolIdentityPassword")?.length !== 0) {
      let poolIdentityPassword = await saveToVault(pipelineId, stepId, "applicationPoolIdentityPassword", "Vault Secured Key", octopusConfig.getData("applicationPoolIdentityPassword"));
      // console.log(poolIdentityPassword);
      octopusConfig.setData("applicationPoolIdentityPassword", poolIdentityPassword);
      setOctopusStepConfigurationDataDto({...octopusConfig});
    } else if (
      typeof (octopusConfig.getData("applicationPoolIdentityPassword")) === "string" &&
      octopusConfig.getData("applicationPoolIdentityPassword")?.length === 0) {
      octopusConfig.setData("applicationPoolIdentityUsername", "");
      octopusConfig.setData("applicationPoolIdentityPassword", {});
      setOctopusStepConfigurationDataDto({...octopusConfig});
    }

    if (validateDepVariables && validateCondVariables) {
      // await createDeploymentEnvironments();
      await parentCallback(item);
      if(!octopusStepConfigurationDto.getData("projectType") || octopusStepConfigurationDto.getData("projectType") !== "CUSTOM") {
        await createOctopusProject();
        await createOctopusDeploymentProcess();
      }      
      await createOctopusVariables();
    }
  };

  const createOctopusProject = async () => {
    await octopusActions
      .createOctopusProject({
        pipelineId: pipelineId,
        stepId: stepId,
        variableSet: octopusStepConfigurationDto.getData("specifyDepVariables") ? octopusStepConfigurationDto.getData("deploymentVariables") : []
      }, getAccessToken)
      .then(async (response) => {        
        return response;
      })
      .catch(function (error) {
        console.log(error);
        let errorMesage =
          error && error.error && error.error.response && error.error.response.data ? error.error.response.data : "";
        toastContext.showErrorDialog(`Error in octopus Project Creation:  ${errorMesage}`);
      });
  };

  const createOctopusDeploymentProcess = async () => {
    await octopusActions
      .createOctopusDeploymentProcess({
        pipelineId: pipelineId,
        stepId: stepId        
      }, getAccessToken)
      .then(async (response) => {        
        return response;
      })
      .catch(function (error) {
        console.log(error);
        let errorMesage =
          error && error.error && error.error.response && error.error.response.data ? error.error.response.data : "";
        toastContext.showErrorDialog(`Error in octopus Deployment Process Creation:  ${errorMesage}`);
      });
  };

  const createOctopusVariables = async () => {
    await octopusActions
      .createOctopusVariables({
        pipelineId: pipelineId,
        stepId: stepId,
        variableSet: octopusStepConfigurationDto.getData("specifyDepVariables") ? octopusStepConfigurationDto.getData("deploymentVariables") : []
      }, getAccessToken)
      .then(async (response) => {
        closeEditorPanel();
        return response;
      })
      .catch(function (error) {
        console.log(error);
        let errorMesage =
          error && error.error && error.error.response && error.error.response.data ? error.error.response.data : "";
        toastContext.showErrorDialog(`Error in octopus Variable Creation:  ${errorMesage}`);
      });
  };

  const createDeploymentEnvironments = async () => {
    if (octopusStepConfigurationDto.getData("specifyDepVariables")) {
      for (let item in octopusStepConfigurationDto.getData("deploymentVariables")) {
        octopusStepConfigurationDto.getData("deploymentVariables")[item]["scope"] = {
          environment: [octopusStepConfigurationDto.getData("environmentId")],
        };
      }
    }
  };

  const validateConditionalVariables = async () => {
    if (octopusStepConfigurationDto.getData("isRollback")) {
      if (!octopusStepConfigurationDto.getData("octopusVersion") || octopusStepConfigurationDto.getData("octopusVersion") && octopusStepConfigurationDto.getData("octopusVersion").length === 0) {
        let errorMesage =
          "Missing required fields for rollback, Please select a version to rollback a deployment";
        toastContext.showErrorDialog(`Error in octopus Project Creation:  ${errorMesage}`);
        return false;
      }
    }
    if (octopusStepConfigurationDto.getData("octopusPlatformType") && (octopusStepConfigurationDto.getData("octopusPlatformType") === "Azure" || octopusStepConfigurationDto.getData("octopusPlatformType") === "Package")) {
      if (!octopusStepConfigurationDto.getData("octopusDeploymentType") || octopusStepConfigurationDto.getData("octopusDeploymentType") && octopusStepConfigurationDto.getData("octopusDeploymentType").length === 0) {
        let errorMesage =
          "Missing required fields for selected platform type, Please select deployment type";
        toastContext.showErrorDialog(`Error in octopus Project Creation:  ${errorMesage}`);
        return false;
      }
      if (!octopusStepConfigurationDto.getData("octopusFeedId") || octopusStepConfigurationDto.getData("octopusFeedId") && octopusStepConfigurationDto.getData("octopusFeedId").length === 0) {
        let errorMesage =
          "Missing required fields for selected platform type, Please select a feed";
        toastContext.showErrorDialog(`Error in octopus Project Creation:  ${errorMesage}`);
        return false;
      }
    }
    return true;
  };

  const validateDeploymentVariables = async () => {
    if (octopusStepConfigurationDto.getData("specifyDepVariables")) {
      if (octopusStepConfigurationDto.getData("deploymentVariables").length === 0 && octopusStepConfigurationDto.getData("customParameters").length === 0 ) {
        let errorMesage = "Please specify deployment variables.";
        toastContext.showErrorDialog(`Error in octopus Project Creation:  ${errorMesage}`);
        return false;
      }
    }    
    return true;
  };

  const getFormFields = () => {
    if (octopusStepConfigurationDto &&
      octopusStepConfigurationDto.getData("projectType") &&
      octopusStepConfigurationDto.getData("projectType") === "CUSTOM") {
        return (
          <OctopusCustomProjectForm
            dataObject={octopusStepConfigurationDto}
            setDataObject={setOctopusStepConfigurationDataDto}
            disabled={false}          
            pipelineId={pipelineId}
            listOfSteps={listOfSteps}
          />
        );
      }
    
    return (
      <OctopusOpseraManagedProjectForm
        dataObject={octopusStepConfigurationDto}
        setDataObject={setOctopusStepConfigurationDataDto}
        disabled={false}          
        pipelineId={pipelineId}
        stepTool={stepTool}
        listOfSteps={listOfSteps}
        plan={plan}
        stepId={stepId}
      />
    );
  };

  if (isLoading || octopusStepConfigurationDto === undefined) {
    return <LoadingDialog size="sm"/>;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={octopusStepConfigurationDto}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <OctopusToolSelectInput
        model={octopusStepConfigurationDto}
        setModel={setOctopusStepConfigurationDataDto}
      />
      <OctopusSpaceNameSelectInput
        fieldName={"spaceName"}
        dataObject={octopusStepConfigurationDto}
        setDataObject={setOctopusStepConfigurationDataDto}
        disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusToolId").length === 0}
        tool_prop={octopusStepConfigurationDto ? octopusStepConfigurationDto.getData("octopusToolId") : ""}
      />
      <OctopusStepOctopusEnvironmentMultiSelectInput
        fieldName={"environmentList"}
        model={octopusStepConfigurationDto}
        setModel={setOctopusStepConfigurationDataDto}
      />
      <OctopusProjectTypeSelectInput 
        fieldName={"projectType"}
        dataObject={octopusStepConfigurationDto}
        setDataObject={setOctopusStepConfigurationDataDto}
        disabled={isFormUpdate || (octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName").length === 0)}
      />
      { getFormFields() }
    </PipelineStepEditorPanelContainer>
  );
}

OctopusStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  closeEditorPanel: PropTypes.func,
  pipelineId: PropTypes.string
};

export default OctopusStepConfiguration;
