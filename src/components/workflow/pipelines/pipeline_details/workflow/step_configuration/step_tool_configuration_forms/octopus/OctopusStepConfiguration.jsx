import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import OctopusStepFormMetadata from "./octopus-stepForm-metadata";
import Model from "core/data_model/model";
import DtoSelectInput from "components/common/input/dto_input/dto-select-input";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import DtoTextInput from "components/common/input/dto_input/dto-text-input";
import { DialogToastContext, showServiceUnavailableDialog } from "contexts/DialogToastContext";
import SaveButton from "components/common/buttons/SaveButton";

function OctopusStepConfiguration({ stepTool, plan, stepId, parentCallback, getToolsList }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  const [octopusStepConfigurationDto, setOctopusStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [octopusSearching, isOctopusSearching] = useState(false);
  const [octopusList, setOctopusList] = useState([]);

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
    parentCallback(item);
  };

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "octopusToolId") {
      let newDataObject = octopusStepConfigurationDto;
      newDataObject.setData("octopusToolId", value.id);
      newDataObject.setData("toolURL", value.configuration.toolURL);
      newDataObject.setData("octopusApiKey", value.configuration.octopusApiKey);
      setOctopusStepConfigurationDataDto({ ...newDataObject });
      return;
    }
  };

  if (isLoading || octopusStepConfigurationDto === undefined) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <>
      {octopusStepConfigurationDto && (
        <>
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="left"
            overlay={pipelineHelpers.getRegistryPopover(
              octopusList[octopusList.findIndex((x) => x.id === octopusStepConfigurationDto.getData("octopusToolId"))]
            )}
          >
            <FontAwesomeIcon
              icon={faEllipsisH}
              className="fa-pull-right pointer pr-1"
              onClick={() => document.body.click()}
            />
          </OverlayTrigger>
          <DtoSelectInput
            setDataFunction={handleDTOChange}
            setDataObject={setOctopusStepConfigurationDataDto}
            textField={"name"}
            valueField={"id"}
            dataObject={octopusStepConfigurationDto}
            filter={"contains"}
            selectOptions={octopusList ? octopusList : []}
            fieldName={"octopusToolId"}
            busy={octopusSearching}
            disabled={octopusList.length === 0 || octopusSearching}
          />
          <DtoTextInput
            setDataObject={setOctopusStepConfigurationDataDto}
            dataObject={octopusStepConfigurationDto}
            fieldName={"spaceName"}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusToolId").length === 0}
          />
          <DtoTextInput
            setDataObject={setOctopusStepConfigurationDataDto}
            dataObject={octopusStepConfigurationDto}
            fieldName={"projectName"}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusToolId").length === 0}
          />
          <DtoTextInput
            setDataObject={setOctopusStepConfigurationDataDto}
            dataObject={octopusStepConfigurationDto}
            fieldName={"releaseVersion"}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusToolId").length === 0}
          />
        <DtoTextInput
            setDataObject={setOctopusStepConfigurationDataDto}
            dataObject={octopusStepConfigurationDto}
            fieldName={"environmentName"}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusToolId").length === 0}
          />
        <DtoTextInput
            setDataObject={setOctopusStepConfigurationDataDto}
            dataObject={octopusStepConfigurationDto}
            fieldName={"tenantName"}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusToolId").length === 0}
          />
          <SaveButton
            recordDto={octopusStepConfigurationDto}
            setRecordDto={setOctopusStepConfigurationDataDto}
            createRecord={callbackFunction}
            updateRecord={callbackFunction}
          />
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
};

export default OctopusStepConfiguration;
