import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faSpinner, faEllipsisH, faSave } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import { Link } from "react-router-dom";
import nexusStepFormMetadata from "./step_tool_configuration_forms_metadata/nexus-stepForm-metadata";
import Model from "core/data_model/model";
import DtoSelectInput from "components/common/input/dto_input/dto-select-input";
import DtoTextInput from "components/common/input/dto_input/dto-text-input";
import LoadingDialog from "components/common/status_notifications/loading";
import ToastContext from "react-bootstrap/cjs/ToastContext";
import { axiosApiService } from "../../../../../../../api/apiService";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import { getErrorDialog, getMissingRequiredFieldsErrorDialog } from "components/common/toasts/toasts";
import _ from "lodash";

const NEXUS_STEP_TYPES = [
  {
    name: "Push Artifacts",
    value: "push",
  },
  {
    name: "Pull Artifact",
    value: "pull",
  },
];

function NexusStepConfiguration({ stepTool, plan, stepId, parentCallback, getToolsList, setToast, setShowToast }) {
  const contextType = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);

  const [nexusList, setNexusList] = useState([]);
  const [isNexusSearching, setIsNexusSearching] = useState(false);
  const [nexusRepositoriesList, setNexusRepositoriesList] = useState([]);
  const [nexusStepConfigurationDto, setNexusStepConfigurationDataDto] = useState(undefined);
  const [isRepoSearching, setIsRepoSearching] = useState(false);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await loadFormData(stepTool);

    if (plan && stepId) {
      let pipelineSteps = formatStepOptions(plan, stepId);
      let groupedSteps = _.groupBy(pipelineSteps, "tool.tool_identifier");
      let jenkinsSteps =
        Object.keys(groupedSteps).length > 0
          ? groupedSteps.jenkins
            ? groupedSteps.jenkins
            : [{ _id: "", name: "Please configure a jenkins build step", isDisabled: "yes" }]
          : [{ _id: "", name: "Please configure a jenkins build step", isDisabled: "yes" }];
      setListOfSteps(jenkinsSteps);
    }

    await fetchNexusDetails();
    setIsLoading(false);
  };

  const formatStepOptions = (plan, stepId) => {
    let STEP_OPTIONS = plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
    STEP_OPTIONS.unshift({ _id: "", name: "Select One", isDisabled: "yes" });
    return STEP_OPTIONS;
  };

  const fetchNexusDetails = async () => {
    setIsNexusSearching(true);

    let results = await getToolsList("nexus");

    const filteredList = results.filter((el) => el.configuration !== undefined);
    if (filteredList) {
      setNexusList(filteredList);
      setIsNexusSearching(false);
    }
  };

  const loadFormData = async (step) => {
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
      setNexusStepConfigurationDataDto(new Model(configuration, nexusStepFormMetadata, false));
      await getNexusRepositoriesList(configuration.nexusToolConfigId);
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      setNexusStepConfigurationDataDto(
        new Model({ ...nexusStepFormMetadata.newModelBase }, nexusStepFormMetadata, true)
      );
    }
  };

  const callbackFunction = async () => {
    setLoading(true);
    if (validateRequiredFields()) {
      const item = {
        configuration: nexusStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
      };
      parentCallback(item);
    }
    setLoading(false);
  };

  const validateRequiredFields = () => {
    let {
      artifactStepId,
      type,
      groupName,
      artifactName,
      repositoryName,
      repositoryGroup,
      nexusToolConfigId,
    } = nexusStepConfigurationDto.data;
    if (
      !nexusStepConfigurationDto.isModelValid() ||
      (type.length !== 0 && type === "push" && artifactStepId.length === 0) ||
      groupName.length === 0 ||
      artifactName.length === 0 ||
      repositoryName.length === 0 ||
      repositoryGroup.length === 0 ||
      nexusToolConfigId.length === 0 ||
      type.length === 0
    ) {
      let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
      setToast(toast);
      setShowToast(true);
      return false;
    } else {
      return true;
    }
  };

  const getNexusRepositoriesList = async (toolID) => {
    setIsRepoSearching(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/nexus/repositories";
    try {
      const res = await axiosApiService(accessToken).get(apiUrl, {
        params: {
          tool: "nexus",
          toolId: toolID,
        },
      });
      if (res.data && res.data.data) {
        let respObj = [];
        let arrOfObj = res.data.data;
        arrOfObj.map((item) => {
          respObj.push({
            name: item.name,
            format: item.format,
            type: item.type,
            url: item.url,
            attributes: item.attributes,
          });
        });
        if (res.data.data.length === 0) {
          respObj.push({
            name: "Configure nexus repositories to activate this step",
            format: "N/A",
            isDisabled: "yes",
          });
        }
        setNexusRepositoriesList(respObj);
        setIsRepoSearching(false);
      } else {
        let errorMessage =
          "Error fetching nexus repositories!  Please validate nexus credentials and configured repositories.";
        let toast = getErrorDialog(errorMessage, setShowToast, "detailPanelTop");
        setToast(toast);
        setShowToast(true);
        setIsRepoSearching(false);
      }
    } catch (error) {
      const errorMsg = `Service Unavailable. Error reported by services while fetching repositories for toolId: ${toolID}.  Please see browser logs for details.`;
      console.error(error);
      let toast = getErrorDialog(errorMsg, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
      setIsRepoSearching(false);
    }
  };

  const handleNexusToolConfigurationIdChange = async (fieldName, value) => {
    setIsLoading(true);
    let newDataObject = nexusStepConfigurationDto;
    newDataObject.setData("nexusToolConfigId", value.id);
    newDataObject.setData("toolURL", value.configuration.toolURL);
    newDataObject.setData("userName", value.configuration.userName);
    newDataObject.setData("secretKey", value.configuration.secretKey);
    setNexusRepositoriesList([]);
    await getNexusRepositoriesList(newDataObject.nexusToolConfigId);
    setNexusStepConfigurationDataDto(new Model(newDataObject.data, nexusStepFormMetadata, false));
    setIsLoading(false);
  };

  const handleNexusStepTypeChange = async (fieldName, value) => {
    let newDataObject = nexusStepConfigurationDto;
    newDataObject.setData("type", value.value);
    if (newDataObject.type === "pull") newDataObject.setData("artifactStepId", "");
    setNexusStepConfigurationDataDto(new Model(newDataObject.data, nexusStepFormMetadata, false));
  };

  const handleGroupNameChange = (fieldName, value) => {
    let newDataObject = nexusStepConfigurationDto;
    newDataObject.setData("groupName", value);
    setNexusStepConfigurationDataDto(new Model(newDataObject.data, nexusStepFormMetadata, false));
  };

  const handleArtifactNameChange = (fieldName, value) => {
    let newDataObject = nexusStepConfigurationDto;
    newDataObject.setData("artifactName", value);
    setNexusStepConfigurationDataDto(new Model(newDataObject.data, nexusStepFormMetadata, false));
  };

  const handleRepositoryChange = (fieldName, value) => {
    let newDataObject = nexusStepConfigurationDto;
    newDataObject.setData("repositoryGroup", value.format);
    newDataObject.setData("repositoryName", value.name);
    setNexusStepConfigurationDataDto(new Model(newDataObject.data, nexusStepFormMetadata, false));
  };

  if (isLoading || nexusStepConfigurationDto == null) {
    if (isNexusSearching) {
      return (
        <div className="form-text text-muted mt-2 p-2">
          <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
          Loading Nexus accounts from Tool Registry
        </div>
      );
    }

    return <LoadingDialog size="sm" />;
  }

  if (nexusList == null || nexusList.length === 0) {
    return (
      <div className="form-text text-muted p-2">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
        No accounts have been registered for Nexus. Please go to
        <Link to="/inventory/tools">Tool Registry</Link> and add a Nexus Account entry in order to proceed.
      </div>
    );
  }

  return (
    <>
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="left"
        overlay={pipelineHelpers.getRegistryPopover(
          nexusList[nexusList.findIndex((x) => x.id === nexusStepConfigurationDto.nexusToolConfigId)]
        )}
      >
        <FontAwesomeIcon
          icon={faEllipsisH}
          className="fa-pull-right pointer pr-1"
          onClick={() => document.body.click()}
        />
      </OverlayTrigger>
      <DtoSelectInput
        setDataFunction={handleNexusToolConfigurationIdChange}
        setDataObject={setNexusStepConfigurationDataDto}
        textField={"name"}
        valueField={"id"}
        dataObject={nexusStepConfigurationDto}
        filter={"contains"}
        selectOptions={nexusList ? nexusList : []}
        fieldName={"nexusToolConfigId"}
      />
      {nexusStepConfigurationDto.getData("nexusToolConfigId") !== "" && (
        <DtoSelectInput
          setDataObject={setNexusStepConfigurationDataDto}
          setDataFunction={handleNexusStepTypeChange}
          textField={"name"}
          valueField={"value"}
          dataObject={nexusStepConfigurationDto}
          filter={"contains"}
          selectOptions={NEXUS_STEP_TYPES ? NEXUS_STEP_TYPES : []}
          fieldName={"type"}
        />
      )}
      {isRepoSearching ? (
        <div className="form-text text-muted mt-2 p-2">
          <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
          Loading Repositories from Nexus Tool
        </div>
      ) : nexusStepConfigurationDto.getData("nexusToolConfigId") !== "" && nexusRepositoriesList ? (
        <DtoSelectInput
          setDataFunction={handleRepositoryChange}
          setDataObject={setNexusStepConfigurationDataDto}
          textField={"name"}
          valueField={"name"}
          busy={isRepoSearching}
          dataObject={nexusStepConfigurationDto}
          filter={"contains"}
          selectOptions={nexusRepositoriesList ? nexusRepositoriesList : []}
          fieldName={"repositoryName"}
        />
      ) : (
        ""
      )}
      {nexusStepConfigurationDto.getData("nexusToolConfigId") !== "" &&
        nexusStepConfigurationDto.getData("type") !== "" && (
          <DtoTextInput
            setDataFunction={handleGroupNameChange}
            setDataObject={setNexusStepConfigurationDataDto}
            dataObject={nexusStepConfigurationDto}
            fieldName={"groupName"}
          />
        )}
      {nexusStepConfigurationDto.getData("nexusToolConfigId") !== "" &&
        nexusStepConfigurationDto.getData("type") !== "" && (
          <DtoTextInput
            setDataFunction={handleArtifactNameChange}
            setDataObject={setNexusStepConfigurationDataDto}
            dataObject={nexusStepConfigurationDto}
            fieldName={"artifactName"}
          />
        )}

      {nexusStepConfigurationDto.getData("nexusToolConfigId") !== "" &&
      nexusStepConfigurationDto.getData("type") !== "" &&
      nexusStepConfigurationDto.getData("type") === "push" &&
      listOfSteps ? (
        <DtoSelectInput
          setDataObject={setNexusStepConfigurationDataDto}
          textField={"name"}
          valueField={"_id"}
          dataObject={nexusStepConfigurationDto}
          filter={"contains"}
          selectOptions={listOfSteps ? listOfSteps : []}
          fieldName={"artifactStepId"}
        />
      ) : (
        ""
      )}
      <Button
        variant="primary"
        type="button"
        className="mt-3 ml-2"
        onClick={() => {
          callbackFunction();
        }}
      >
        {loading ? (
          <>
            <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth /> Saving
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faSave} className="mr-1" /> Save
          </>
        )}
      </Button>
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </>
  );
}

NexusStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  getToolsList: PropTypes.func,
};

export default NexusStepConfiguration;
