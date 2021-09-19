import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faSpinner, faEllipsisH, faSave } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import { Link } from "react-router-dom";
import spinnakerStepFormMetadata from "./spinnaker-stepForm-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import spinnakerStepActions from "./spinnaker-step-actions";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function SpinnakerStepConfiguration({ stepTool, plan, stepId, parentCallback, getToolsList }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);

  const [spinnakerList, setSpinnakerList] = useState([]);
  const [isSpinnakerSearching, setIsSpinnakerSearching] = useState(false);
  const [spinnakerAppsList, setspinnakerAppsList] = useState([]);
  const [spinnakerToolsList, setspinnakerToolsList] = useState([]);
  const [spinnakerStepConfigurationDto, setSpinnakerStepConfigurationDataDto] = useState(undefined);
  const [spinnakerAppsSearching, setIsSpinnakerAppsSearching] = useState(false);
  const [spinnakerToolsSearching, setIsSpinnakerToolsSearching] = useState(false);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await loadFormData(stepTool);

    if (plan && stepId) {
      let pipelineSteps = pipelineHelpers.formatStepOptions(plan, stepId);
      setListOfSteps(pipelineSteps);
    }

    await fetchSpinnakerDetails();
    setIsLoading(false);
  };

  const fetchSpinnakerDetails = async () => {
    setIsSpinnakerSearching(true);

    let results = await getToolsList("spinnaker");

    const filteredList = results.filter((el) => el.configuration !== undefined);
    if (filteredList) {
      setSpinnakerList(filteredList);
      setIsSpinnakerSearching(false);
    }
  };

  const loadFormData = async (step) => {
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
      setSpinnakerStepConfigurationDataDto(new Model(configuration, spinnakerStepFormMetadata, false));
      await getspinnakerAppsList(configuration.spinnakerId);
      await getspinnakerToolsList(configuration.spinnakerId, configuration.applicationName);
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      setSpinnakerStepConfigurationDataDto(
        new Model({ ...spinnakerStepFormMetadata.newObjectFields }, spinnakerStepFormMetadata, false)
      );
    }
  };

  const callbackFunction = async () => {
    const item = {
      configuration: spinnakerStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    parentCallback(item);
  };

  const getspinnakerAppsList = async (toolID) => {
    setspinnakerAppsList([]);
    setIsSpinnakerAppsSearching(true);
    try {
      const response = await spinnakerStepActions.searchApps(toolID, getAccessToken);
      if (response.data) {
        if (response.data.length === 0) {
          setspinnakerAppsList([
            {
              name: "Configure spinnaker applications to activate this step",
              format: "N/A",
              isDisabled: "yes",
            },
          ]);
        } else {
          let arrOfObj = response.data.spinnakerApplications;
          if (arrOfObj) {
            var result = arrOfObj.map(function (el) {
              var o = Object.assign({}, el);
              o.value = el.name;
              return o;
            });
            setspinnakerAppsList(result);
          }
        }
      } else {
        let errorMessage =
          "Error fetching spinnaker applications!  Please validate spinnaker credentials and configured repositories.";
        toastContext.showErrorDialog(errorMessage);
      }
    } catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsSpinnakerAppsSearching(false);
    }
  };

  const getspinnakerToolsList = async (toolID, appName) => {
    setspinnakerToolsList([]);
    setIsSpinnakerToolsSearching(true);
    try {
      const response = await spinnakerStepActions.searchTools(toolID, appName, getAccessToken);
      if (response.data) {
        if (response.data.length === 0) {
          setspinnakerToolsList([
            {
              name: "Configure spinnaker applications to activate this step",
              format: "N/A",
              isDisabled: "yes",
            },
          ]);
        } else {
          let arrOfObj = response.data.spinnakerPipelines;
          if (arrOfObj) {
            var result = arrOfObj.map(function (el) {
              var o = Object.assign({}, el);
              o.value = el.name;
              return o;
            });
            setspinnakerToolsList(result);
          }
        }
      } else {
        let errorMessage =
          "Error fetching spinnaker tools!  Please validate spinnaker credentials and configured repositories.";
        toastContext.showErrorDialog(errorMessage);
      }
    } catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsSpinnakerToolsSearching(false);
    }
  };

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "spinnakerId") {
      let newDataObject = spinnakerStepConfigurationDto;
      newDataObject.setData("spinnakerId", value.id);
      newDataObject.setData("toolURL", value.configuration.toolURL);
      setSpinnakerStepConfigurationDataDto({ ...newDataObject });
      await getspinnakerAppsList(value.id);
      return;
    }
    if (fieldName === "applicationName") {
      let newDataObject = spinnakerStepConfigurationDto;
      newDataObject.setData("applicationName", value.name);
      setSpinnakerStepConfigurationDataDto({ ...newDataObject });
      await getspinnakerToolsList(spinnakerStepConfigurationDto.getData("spinnakerId"), value.name);
      return;
    }
  };

  if (isLoading || spinnakerStepConfigurationDto == null) {
    if (isSpinnakerSearching) {
      return (
        <div className="form-text text-muted mt-2 p-2">
          <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
          Loading Spinnaker accounts from Tool Registry
        </div>
      );
    }

    return <LoadingDialog size="sm" />;
  }

  if (spinnakerList == null || spinnakerList.length === 0) {
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
          spinnakerList[spinnakerList.findIndex((x) => x.id === spinnakerStepConfigurationDto.getData("spinnakerId"))]
        )}
      >
        <FontAwesomeIcon
          icon={faEllipsisH}
          className="fa-pull-right pointer pr-1"
          onClick={() => document.body.click()}
        />
      </OverlayTrigger>
      <SelectInputBase
        setDataFunction={handleDTOChange}
        setDataObject={setSpinnakerStepConfigurationDataDto}
        textField={"name"}
        valueField={"id"}
        dataObject={spinnakerStepConfigurationDto}
        filter={"contains"}
        selectOptions={spinnakerList ? spinnakerList : []}
        fieldName={"spinnakerId"}
      />
      <SelectInputBase
        setDataFunction={handleDTOChange}
        setDataObject={setSpinnakerStepConfigurationDataDto}
        textField={"name"}
        valueField={"name"}
        dataObject={spinnakerStepConfigurationDto}
        filter={"contains"}
        selectOptions={spinnakerAppsList ? spinnakerAppsList : []}
        fieldName={"applicationName"}
        busy={spinnakerAppsSearching}
        disabled={spinnakerStepConfigurationDto.getData("spinnakerId").length === 0 || spinnakerAppsSearching}
      />
      <SelectInputBase
        setDataObject={setSpinnakerStepConfigurationDataDto}
        textField={"name"}
        valueField={"name"}
        dataObject={spinnakerStepConfigurationDto}
        filter={"contains"}
        selectOptions={spinnakerToolsList ? spinnakerToolsList : []}
        fieldName={"pipelineName"}
        busy={spinnakerToolsSearching}
        disabled={spinnakerStepConfigurationDto.getData("applicationName").length === 0 || spinnakerToolsSearching}
      />
      <SaveButtonBase
        recordDto={spinnakerStepConfigurationDto}
        setRecordDto={setSpinnakerStepConfigurationDataDto}
        createRecord={callbackFunction}
        updateRecord={callbackFunction}
      />
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </>
  );
}

SpinnakerStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  getToolsList: PropTypes.func,
};

export default SpinnakerStepConfiguration;
