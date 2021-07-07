import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, OverlayTrigger, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import OctopusStepFormMetadata from "./octopus-stepForm-metadata";
import Model from "core/data_model/model";
import DtoSelectInput from "components/common/input/dto_input/dto-select-input";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import { DialogToastContext } from "contexts/DialogToastContext";
import CloseButton from "../../../../../../../common/buttons/CloseButton";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";
import octopusActions from "../../../../../../../inventory/tools/tool_details/tool_jobs/octopus/octopus-actions";
import OctopusToolSelectInput from "./input/OctopusToolSelectInput";
import OctopusSpaceNameSelectInput from "./input/OctopusSpaceNameSelectInput";
import OctopusEnvironmentNameSelectInput from "./input/OctopusEnvironmentSelectInput";
import OctopusTargetRolesSelectInput from "./input/OctopusTargetRolesSelect";
import OctopusPlatformTypeSelectInput from "./input/OctopusPlatformTypeSelectInput";
import OctopusDeploymentTypeInputSelect from "./input/OctopusDeploymentTypeInputSelect";
import OctopusFeedSelectInput from "./input/OctopusFeedSelectInput";
import OctopusVersionSelectInput from "./input/OctopusVersionSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import RollbackToggleInput from "./input/RollbackToggleInput";
import OctopusDeploymentVariables from "./input/OctopusDeploymentVariables";
import OctopusSpecifyDepVarsToggle from "./input/OctopusSpecifyDepVarsToggle";
import OctopusLifecycleSelectInput from "./input/OctopusLifecycleSelectInput";
import OctopusScriptTypeSelectInput from "./input/OctopusScriptTypeSelectInput";
import OctopusScriptTypeDetailsView from "./input/OctopusScriptTypeDetailsView";
import OctopusDeployToTomcatDetailsView from "./sub-forms/OctopusDeployToTomcatDetailsView";
import OctopusDeployToIisView from "./sub-forms/OctopusDeployToIisView";
import OctopusDeployToJavaArchiveView from "./sub-forms/OctopusDeployToJavaArchiveView";
import OctopusProjectNameInput from "./input/OctopusProjectNameInput";

function OctopusStepConfiguration({ stepTool, plan, stepId, parentCallback, getToolsList, closeEditorPanel, pipelineId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [octopusStepConfigurationDto, setOctopusStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [octopusSearching, isOctopusSearching] = useState(false);
  const [octopusList, setOctopusList] = useState([]);
  const [listOfSteps, setListOfSteps] = useState([]);

  useEffect(() => {
    loadFormData(stepTool);
  }, []);

  const loadFormData = async (step) => {
    setIsLoading(true);
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
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

    await fetchOctopusDetails();
    setIsLoading(false);
  };

  const fetchOctopusDetails = async () => {
    isOctopusSearching(true);

    let results = await getToolsList("octopus");

    if(results && Array.isArray(results)) {
      const filteredList = results.filter((el) => el.configuration !== undefined);
      if (filteredList) {
        setOctopusList(filteredList);
      }
    }    
    isOctopusSearching(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: octopusStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    let validateDepVariables = await validateDeploymentVariables();
    let validateCondVariables = await validateConditionalVariables();
    if (validateDepVariables && validateCondVariables) {
      await createDeploymentEnvironments();
      parentCallback(item);
      await createOctopusProject();
    }
  };

  const createOctopusProject = async () => {
    await octopusActions
      .createOctopusProject({ pipelineId: pipelineId, stepId: stepId, variableSet: octopusStepConfigurationDto.getData("specifyDepVariables") ?  octopusStepConfigurationDto.getData("deploymentVariables") : [] }, getAccessToken)
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
      if (octopusStepConfigurationDto.getData("deploymentVariables").length === 0) {
        let errorMesage = "Please specify deployment variables.";
        toastContext.showErrorDialog(`Error in octopus Project Creation:  ${errorMesage}`);
        return false;
      }
      for (let item in octopusStepConfigurationDto.getData("deploymentVariables")) {
        if (octopusStepConfigurationDto.getData("deploymentVariables")[item]?.scope && octopusStepConfigurationDto.getData("deploymentVariables")[item]?.scope?.environment) {
          let errorMesage =
            "The scope and environment are auto filled. Please do not specify scope and environment in deployment variables.";
          toastContext.showErrorDialog(`Error in octopus Project Creation:  ${errorMesage}`);
          return false;
        }
        if (Object.keys(octopusStepConfigurationDto.getData("deploymentVariables")[item]).length > 4) {
          let errorMesage = "Validate deployment Variables, Please refer to specified deployment variables format";
          toastContext.showErrorDialog(`Error in octopus Project Creation:  ${errorMesage}`);
          return false;
        }
        if (
          !octopusStepConfigurationDto.getData("deploymentVariables")[item]["description"] ||
          !octopusStepConfigurationDto.getData("deploymentVariables")[item]["name"] ||
          !octopusStepConfigurationDto.getData("deploymentVariables")[item]["value"]
        ) {
          let errorMesage =
            "Missing required fields for deployment variables, Please refer to specified deployment variables format";
          toastContext.showErrorDialog(`Error in octopus Project Creation:  ${errorMesage}`);
          return false;
        }
      }
    }
    return true;
  };

  if (isLoading || octopusStepConfigurationDto === undefined) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <>
      {octopusStepConfigurationDto && (
        <>
          <OctopusToolSelectInput
            fieldName={"octopusToolId"}
            dataObject={octopusStepConfigurationDto}
            setDataObject={setOctopusStepConfigurationDataDto}
          />
          <OctopusSpaceNameSelectInput
            fieldName={"spaceName"}
            dataObject={octopusStepConfigurationDto}
            setDataObject={setOctopusStepConfigurationDataDto}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusToolId").length === 0}
            tool_prop={octopusStepConfigurationDto ? octopusStepConfigurationDto.getData("octopusToolId") : ""}
          />
          <OctopusProjectNameInput 
            dataObject={octopusStepConfigurationDto}
            setDataObject={setOctopusStepConfigurationDataDto}
            stepTool={stepTool}
          />
          <TextInputBase
            setDataObject={setOctopusStepConfigurationDataDto}
            dataObject={octopusStepConfigurationDto}
            fieldName={"projectDescription"}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName").length === 0}
          />
          <OctopusEnvironmentNameSelectInput
            fieldName={"environmentName"}
            dataObject={octopusStepConfigurationDto}
            setDataObject={setOctopusStepConfigurationDataDto}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName").length === 0}
            tool_prop={octopusStepConfigurationDto ? octopusStepConfigurationDto.getData("spaceName") : ""}
          />
          <DtoSelectInput
            setDataObject={setOctopusStepConfigurationDataDto}
            textField={"name"}
            valueField={"_id"}
            dataObject={octopusStepConfigurationDto}
            filter={"contains"}
            selectOptions={listOfSteps ? listOfSteps : []}
            fieldName={"ecrPushStepId"}
            disabled={listOfSteps.length === 0 || octopusStepConfigurationDto.getData("environmentName").length === 0}
          />
          <OctopusTargetRolesSelectInput
            fieldName={"octopusTargetRoles"}
            dataObject={octopusStepConfigurationDto}
            setDataObject={setOctopusStepConfigurationDataDto}
            disabled={
              octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName")
                ? octopusStepConfigurationDto.getData("spaceName").length === 0
                : true
            }
            tool_prop={
              octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName")
                ? octopusStepConfigurationDto.getData("spaceName")
                : ""
            }
          />
          <OctopusLifecycleSelectInput
            fieldName={"lifecycleId"}
            dataObject={octopusStepConfigurationDto}
            setDataObject={setOctopusStepConfigurationDataDto}
            disabled={
              octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName")
                ? octopusStepConfigurationDto.getData("spaceName").length === 0
                : true
            }
            tool_prop={
              octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName")
                ? octopusStepConfigurationDto.getData("spaceName")
                : ""
            }
          />
          <OctopusPlatformTypeSelectInput
            fieldName={"octopusPlatformType"}
            dataObject={octopusStepConfigurationDto}
            setDataObject={setOctopusStepConfigurationDataDto}
            disabled={
              octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName")
                ? octopusStepConfigurationDto.getData("spaceName").length === 0
                : true
            }
            tool_prop={
              octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName")
                ? octopusStepConfigurationDto.getData("spaceName")
                : ""
            }
          />
          {octopusStepConfigurationDto &&
            octopusStepConfigurationDto.getData("octopusPlatformType") &&
            octopusStepConfigurationDto.getData("octopusPlatformType") === "Kubernetes" && (
              <TextInputBase
                setDataObject={setOctopusStepConfigurationDataDto}
                dataObject={octopusStepConfigurationDto}
                fieldName={"namespace"}
                disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName").length === 0}
              />
            )}
          {octopusStepConfigurationDto &&
            octopusStepConfigurationDto.getData("octopusPlatformType") &&
          (octopusStepConfigurationDto.getData("octopusPlatformType") === "Azure" ||
            octopusStepConfigurationDto.getData("octopusPlatformType") === "Script") && (
              <>
                <OctopusDeploymentTypeInputSelect
                  fieldName={"octopusDeploymentType"}
                  dataObject={octopusStepConfigurationDto}
                  setDataObject={setOctopusStepConfigurationDataDto}
                  disabled={
                    octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusPlatformType")
                      ? octopusStepConfigurationDto.getData("octopusPlatformType").length === 0
                      : true
                  }
                  tool_prop={
                    octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusPlatformType")
                      ? octopusStepConfigurationDto.getData("octopusPlatformType")
                      : ""
                  }
                />
                <OctopusScriptTypeSelectInput
                  dataObject={octopusStepConfigurationDto}
                  setDataObject={setOctopusStepConfigurationDataDto}
                  disabled={
                    octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusPlatformType")
                      ? octopusStepConfigurationDto.getData("octopusPlatformType").length === 0
                      : true
                  }
                  tool_prop={
                    octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusPlatformType")
                      ? octopusStepConfigurationDto.getData("octopusPlatformType")
                      : ""
                  }
                  />
                  <OctopusScriptTypeDetailsView
                    dataObject={octopusStepConfigurationDto}
                    setDataObject={setOctopusStepConfigurationDataDto}
                    disabled={
                      octopusStepConfigurationDto && octopusStepConfigurationDto.getData("scriptSource")
                        ? octopusStepConfigurationDto.getData("scriptSource").length === 0
                        : true
                    }
                    tool_prop={
                      octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusPlatformType")
                        ? octopusStepConfigurationDto.getData("octopusPlatformType")
                        : ""
                    }
                  />
                <OctopusFeedSelectInput
                  fieldName={"octopusFeedId"}
                  dataObject={octopusStepConfigurationDto}
                  setDataObject={setOctopusStepConfigurationDataDto}
                  disabled={
                    octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName")
                      ? octopusStepConfigurationDto.getData("spaceName").length === 0
                      : true
                  }
                  tool_prop={
                    octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName")
                      ? octopusStepConfigurationDto.getData("spaceName")
                      : ""
                  }
                />
                {octopusStepConfigurationDto &&
                octopusStepConfigurationDto.getData("octopusPlatformType") &&
                  octopusStepConfigurationDto.getData("octopusPlatformType") !== "Script" && (
                <TextInputBase
                  dataObject={octopusStepConfigurationDto}
                  setDataObject={setOctopusStepConfigurationDataDto}
                  fieldName={"octopusPhysicalPath"}
                />
                )
                }
                <RollbackToggleInput
                  dataObject={octopusStepConfigurationDto}
                  setDataObject={setOctopusStepConfigurationDataDto}
                  fieldName={"isRollback"}
                />
                {octopusStepConfigurationDto && octopusStepConfigurationDto.getData("isRollback") && (
                  <OctopusVersionSelectInput
                    fieldName={"octopusVersion"}
                    dataObject={octopusStepConfigurationDto}
                    setDataObject={setOctopusStepConfigurationDataDto}
                    pipelineId={pipelineId}
                    disabled={
                      octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusFeedId")
                        ? octopusStepConfigurationDto.getData("octopusFeedId").length === 0
                        : true
                    }
                    tool_prop={
                      octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusFeedId")
                        ? octopusStepConfigurationDto.getData("octopusFeedId")
                        : ""
                    }
                  />
                )}
                <OctopusSpecifyDepVarsToggle
                  dataObject={octopusStepConfigurationDto}
                  setDataObject={setOctopusStepConfigurationDataDto}
                  fieldName={"specifyDepVariables"}
                />
                {octopusStepConfigurationDto && octopusStepConfigurationDto.getData("specifyDepVariables") && (
                  <>
                    <OctopusDeploymentVariables
                      fieldName={"deploymentVariables"}
                      dataObject={octopusStepConfigurationDto}
                      setDataObject={setOctopusStepConfigurationDataDto}
                    />
                    <TextInputBase
                      setDataObject={setOctopusStepConfigurationDataDto}
                      dataObject={octopusStepConfigurationDto}
                      fieldName={"structuredConfigVariablesPath"}
                      disabled={
                        octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName").length === 0
                      }
                    />
                    <TextInputBase
                      setDataObject={setOctopusStepConfigurationDataDto}
                      dataObject={octopusStepConfigurationDto}
                      fieldName={"xmlConfigTransformVariableValue"}
                      disabled={
                        octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName").length === 0
                      }
                    />
                  </>
                )}
              </>
            )}
            {octopusStepConfigurationDto &&
              octopusStepConfigurationDto.getData("octopusPlatformType") &&
              octopusStepConfigurationDto.getData("octopusPlatformType").toLowerCase() === "deploy to tomcat via manager" && (
                <OctopusDeployToTomcatDetailsView
                  dataObject={octopusStepConfigurationDto}
                  setDataObject={setOctopusStepConfigurationDataDto}
                  disabled={false}
                  platformType={
                    octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusPlatformType")
                      ? octopusStepConfigurationDto.getData("octopusPlatformType")
                      : ""
                  }
                  pipelineId={pipelineId}
                />
            )}
            {octopusStepConfigurationDto &&
            octopusStepConfigurationDto.getData("octopusPlatformType") &&
            octopusStepConfigurationDto.getData("octopusPlatformType") === "Package" && (
              <>
                <OctopusDeploymentTypeInputSelect
                  fieldName={"octopusDeploymentType"}
                  dataObject={octopusStepConfigurationDto}
                  setDataObject={setOctopusStepConfigurationDataDto}
                  disabled={
                    octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusPlatformType")
                      ? octopusStepConfigurationDto.getData("octopusPlatformType").length === 0
                      : true
                  }
                  tool_prop={
                    octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusPlatformType")
                      ? octopusStepConfigurationDto.getData("octopusPlatformType")
                      : ""
                  }
                />
                {octopusStepConfigurationDto.getData("octopusDeploymentType") &&
                  octopusStepConfigurationDto.getData("octopusDeploymentType").toLowerCase() === "octopus.iis" && (
                    <OctopusDeployToIisView
                      dataObject={octopusStepConfigurationDto}
                      setDataObject={setOctopusStepConfigurationDataDto}
                      disabled={false}
                      platformType={
                        octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusPlatformType")
                          ? octopusStepConfigurationDto.getData("octopusPlatformType")
                          : ""
                      }
                      pipelineId={pipelineId}
                    />
                )}
                {octopusStepConfigurationDto.getData("octopusDeploymentType") &&
                  octopusStepConfigurationDto.getData("octopusDeploymentType").toLowerCase() === "octopus.javaarchive" && (
                    <OctopusDeployToJavaArchiveView
                      dataObject={octopusStepConfigurationDto}
                      setDataObject={setOctopusStepConfigurationDataDto}
                      disabled={false}
                      platformType={
                        octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusPlatformType")
                          ? octopusStepConfigurationDto.getData("octopusPlatformType")
                          : ""
                      }
                      pipelineId={pipelineId}
                    />
                )}
              </>
            )}
          <Row className="mx-1 py-2">
            <SaveButtonBase
              recordDto={octopusStepConfigurationDto}
              setRecordDto={setOctopusStepConfigurationDataDto}
              createRecord={callbackFunction}
              updateRecord={callbackFunction}
              showSuccessToasts={false}
              lenient={true}
              className="mr-2"
            />
            <CloseButton isLoading={isLoading} closeEditorCallback={closeEditorPanel} />
          </Row>
        </>
      )}
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </>
  );
}

OctopusStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  getToolsList: PropTypes.func,
  closeEditorPanel: PropTypes.func,
  pipelineId: PropTypes.string
};

export default OctopusStepConfiguration;
