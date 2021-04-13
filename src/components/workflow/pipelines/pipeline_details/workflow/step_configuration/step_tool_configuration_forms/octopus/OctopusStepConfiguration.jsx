import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, OverlayTrigger, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import OctopusStepFormMetadata from "./octopus-stepForm-metadata";
import Model from "core/data_model/model";
import DtoSelectInput from "components/common/input/dto_input/dto-select-input";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import { DialogToastContext } from "contexts/DialogToastContext";
import OctopusStepActions from "./octopus-step-actions";
import CloseButton from "../../../../../../../common/buttons/CloseButton";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";
import octopusActions from "../../../../../../../inventory/tools/tool_details/tool_jobs/octopus/octopus-actions";
import OctopusToolSelectInput from "./input/OctopusToolSelectInput";
import ProjectMappingToolSelectInput
  from "../../../../../../../common/list_of_values_input/settings/data_tagging/projects/ProjectMappingToolSelectInput";
import AzureToolSelectInput
  from "../../../../../../../inventory/tools/tool_details/tool_jobs/octopus/applications/details/input/AzureToolSelectInput";
import SpaceNameSelectInput
  from "../../../../../../../inventory/tools/tool_details/tool_jobs/octopus/applications/details/input/SpaceNameSelectInput";
import OctopusSpaceNameSelectInput from "./input/OctopusSpaceNameSelectInput";
import OctopusEnvironmentNameSelectInput from "./input/OctopusEnvironmentSelectInput";
import OctopusTargetRolesSelectInput from "./input/OctopusTargetRolesSelect";
import OctopusPlatformTypeSelectInput from "./input/OctopusPlatformTypeSelectInput";
import OctopusDeploymentTypeInputSelect from "./input/OctopusDeploymentTypeInputSelect";
import OctopusFeedSelectInput from "./input/OctopusFeedSelectInput";
import OctopusVersionSelectInput from "./input/OctopusVersionSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ValidateProjectButton from "./input/ValidateProjectButton";
import RollbackToggleInput from "./input/RollbackToggleInput";
import WorkspaceDeleteToggleInput from "../dotnet/inputs/WorkspaceDeleteToggleInput";
import OctopusDeploymentVariables from "./input/OctopusDeploymentVariables";
import OctopusSpecifyDepVarsToggle from "./input/OctopusSpecifyDepVarsToggle";

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
        new Model({ ...OctopusStepFormMetadata.newModelBase }, OctopusStepFormMetadata, false)
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

    const filteredList = results.filter((el) => el.configuration !== undefined);
    if (filteredList) {
      setOctopusList(filteredList);
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
    if (validateDepVariables) {
      await createDeploymentEnvironments();
      parentCallback(item);
      await createOctopusProject();
    }
  };

  const createOctopusProject = async () => {
    await octopusActions
      .createOctopusProject({ pipelineId: pipelineId, stepId: stepId, variableSet: octopusStepConfigurationDto.getData("specifyDepVariables") ?  octopusStepConfigurationDto.getData("deploymentVariables") : [] }, getAccessToken)
      .then(async (response) => {
        await removeSensitiveCredentials();
      })
      .catch(function (error) {
        console.log(error);
        let errorMesage =
          error && error.error && error.error.response && error.error.response.data ? error.error.response.data : "";
        toastContext.showErrorDialog(`Error in octopus Project Creation:  ${errorMesage}`);
      });
  };

  const removeSensitiveCredentials = async () => {
    let deploymentVariablesCopy = octopusStepConfigurationDto.getData("deploymentVariables");
    if (octopusStepConfigurationDto.getData("specifyDepVariables")) {
      for (let item in octopusStepConfigurationDto.getData("deploymentVariables")) {
        if (octopusStepConfigurationDto.getData("deploymentVariables")[item]["sensitive"]) {
          deploymentVariablesCopy.splice(item, 1);
        }
      }
    }
    if (deploymentVariablesCopy.length !== octopusStepConfigurationDto.getData("deploymentVariables").length) {
      let newDataObject = octopusStepConfigurationDto;
      newDataObject.setData("deploymentVariables", deploymentVariablesCopy);
      setOctopusStepConfigurationDataDto({ ...newDataObject });
      const item = {
        configuration: octopusStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
      };
      parentCallback(item);
    }
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

  const validateDeploymentVariables = async () => {
    if (octopusStepConfigurationDto.getData("specifyDepVariables")) {
      for (let item in octopusStepConfigurationDto.getData("deploymentVariables")) {
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
          <Row>
            <Col lg={8}>
              <TextInputBase
                setDataObject={setOctopusStepConfigurationDataDto}
                dataObject={octopusStepConfigurationDto}
                fieldName={"projectName"}
                disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName").length === 0}
              />
            </Col>
            <Col lg={4}>
              <ValidateProjectButton
                toolDataDto={octopusStepConfigurationDto}
                disable={
                  (octopusStepConfigurationDto && octopusStepConfigurationDto.getData("projectName").length === 0) ||
                  (stepTool &&
                    stepTool.configuration &&
                    stepTool.configuration.projectId &&
                    stepTool.configuration.projectName &&
                    octopusStepConfigurationDto &&
                    stepTool.configuration.projectName === octopusStepConfigurationDto.getData("projectName"))
                }
              />
            </Col>
          </Row>
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
            octopusStepConfigurationDto.getData("octopusPlatformType") === "Azure" && (
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
                <RollbackToggleInput dataObject={octopusStepConfigurationDto} setDataObject={setOctopusStepConfigurationDataDto} fieldName={"isRollback"} />
                {
                  octopusStepConfigurationDto &&
                  octopusStepConfigurationDto.getData("isRollback") &&
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
                }
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
                <OctopusSpecifyDepVarsToggle
                  dataObject={octopusStepConfigurationDto}
                  setDataObject={setOctopusStepConfigurationDataDto}
                  fieldName={"specifyDepVariables"}
                />
                {octopusStepConfigurationDto && octopusStepConfigurationDto.getData("specifyDepVariables") && (
                  <OctopusDeploymentVariables
                    fieldName={"deploymentVariables"}
                    dataObject={octopusStepConfigurationDto}
                    setDataObject={setOctopusStepConfigurationDataDto}
                  />
                )}
              </>
            )}
          <TextInputBase
            dataObject={octopusStepConfigurationDto}
            setDataObject={setOctopusStepConfigurationDataDto}
            fieldName={"octopusPhysicalPath"}
          />
          <Row className="mx-1 py-2">
            <SaveButtonBase
              recordDto={octopusStepConfigurationDto}
              setRecordDto={setOctopusStepConfigurationDataDto}
              createRecord={callbackFunction}
              updateRecord={callbackFunction}
              lenient={true}
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
