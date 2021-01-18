import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Row } from "react-bootstrap";
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
import DtoTextInput from "../../../../../../../common/input/dto_input/dto-text-input";
import octopusActions from "../../../../../../../inventory/tools/tool_details/tool_jobs/octopus/octopus-actions";

function OctopusStepConfiguration({ stepTool, plan, stepId, parentCallback, getToolsList, closeEditorPanel, pipelineId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [octopusStepConfigurationDto, setOctopusStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [octopusSearching, isOctopusSearching] = useState(false);
  const [octopusList, setOctopusList] = useState([]);
  const [spacesSearching, setIsSpacesSearching] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [environmentsSearching, setIsEnvironmentsSearching] = useState(false);
  const [environments, setEnvironments] = useState([]);
  const [listOfSteps, setListOfSteps] = useState([]);

  useEffect(() => {
    loadFormData(stepTool);
  }, []);

  const loadFormData = async (step) => {
    console.log(plan  )
    setIsLoading(true);
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
      setOctopusStepConfigurationDataDto(new Model(configuration, OctopusStepFormMetadata, false));

      if (configuration.octopusToolId.length > 0) {
        await searchSpaces(configuration.octopusToolId);
        if (configuration.spaceId.length > 0) {
          await searchEnvironments(configuration.octopusToolId,configuration.spaceId);
        }
      }
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
    await octopusActions.createOctopusProject({pipelineId: pipelineId, stepId: stepId}, getAccessToken)
      .then(function (response) {
        return
      })
      .catch(function (error) {
        console.log(error)
        let errorMesage = (error && error.error && error.error.response && error.error.response.data) ? error.error.response.data : ""
        toastContext.showErrorDialog( `Error in octopus Project Creation:  ${errorMesage}`)
        return
  });
  };

  const errorCatch = async (setterFunc, error) => {
    setterFunc([{ value: "", name: "Select One", isDisabled: "yes" }]);
    console.error(error);
    toastContext.showServiceUnavailableDialog();
  }

  const credentialCatch = async (setterFunc, tool) => {
    setterFunc([{ value: "", name: "Select One", isDisabled: "yes" }]);
    let errorMessage =
      `Error fetching Octopus ${tool}!  Please validate configured ${tool}.`;
    toastContext.showErrorDialog(errorMessage);
  }

  const nullDataCatch = async (setterFunc, tool) => {
    setterFunc([{ value: "", name: "Select One", isDisabled: "yes" }]);
    let errorMessage = `No Octopus ${tool} Found!  Please validate credentials and configured  ${tool}.`;
    toastContext.showErrorDialog(errorMessage);
  }

  const searchSpaces = async (id) => {
    setIsSpacesSearching(true);
    try {
      const res = await OctopusStepActions.getSpaces(id, getAccessToken);
      if (res.data) {
        let arrOfObj = res.data.data ? res.data.data : [];
        setSpaces(arrOfObj);
        if (arrOfObj.length === 0) {
          await nullDataCatch(setSpaces, "Spaces")
        }
      } else {
        await credentialCatch(setSpaces, "Spaces")
      }
    } catch (error) {
      await errorCatch(setSpaces, error)
    } finally {
      setIsSpacesSearching(false);
    }
  };


  const searchEnvironments = async (id, spaceID) => {
    setIsEnvironmentsSearching(true);
    try {
      const res = await OctopusStepActions.getEnvironments(id,spaceID, getAccessToken);
      if (res.data) {
        let arrOfObj = res.data.data ? res.data.data : [];
        setEnvironments(arrOfObj);
        if (arrOfObj.length === 0) {
          await nullDataCatch(setEnvironments, "Environments")
        }
      } else {
        await credentialCatch(setEnvironments, "Environments")
      }
    } catch (error) {
      await errorCatch(setEnvironments, error)
    } finally {
      setIsEnvironmentsSearching(false);
    }
  };

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "octopusToolId") {
      let newDataObject = octopusStepConfigurationDto;
      newDataObject.setData("octopusToolId", value.id);
      newDataObject.setData("toolURL", value.configuration.toolURL);
      newDataObject.setData("octopusApiKey", value.configuration.octopusApiKey);
      setOctopusStepConfigurationDataDto({ ...newDataObject });
      await searchSpaces(value.id);
      return;
    }
    if (fieldName === "spaceName") {
      let newDataObject = octopusStepConfigurationDto;
      newDataObject.setData("spaceName", value.name);
      newDataObject.setData("spaceId", value.id);
      setOctopusStepConfigurationDataDto({ ...newDataObject });
      await searchEnvironments(octopusStepConfigurationDto.getData("octopusToolId"),octopusStepConfigurationDto.getData("spaceId"));
      return;
    }
    if (fieldName === "releaseVersion") {
      let newDataObject = octopusStepConfigurationDto;
      newDataObject.setData("releaseVersion", value.version);
      newDataObject.setData("releaseVersionId", value.id);
      setOctopusStepConfigurationDataDto({ ...newDataObject });
      return;
    }
    if (fieldName === "environmentName") {
      let newDataObject = octopusStepConfigurationDto;
      newDataObject.setData("environmentName", value.name);
      newDataObject.setData("environmentId", value.id);
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
          <DtoSelectInput
            setDataFunction={handleDTOChange}
            setDataObject={setOctopusStepConfigurationDataDto}
            textField={"name"}
            valueField={"id"}
            dataObject={octopusStepConfigurationDto}
            filter={"contains"}
            selectOptions={spaces ? spaces : []}
            fieldName={"spaceName"}
            busy={spacesSearching}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusToolId").length === 0}
          />
          <DtoTextInput
            setDataObject={setOctopusStepConfigurationDataDto}
            dataObject={octopusStepConfigurationDto}
            fieldName={"projectName"}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName").length === 0}
          />
          <DtoTextInput
            setDataObject={setOctopusStepConfigurationDataDto}
            dataObject={octopusStepConfigurationDto}
            fieldName={"projectDescription"}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName").length === 0}
          />
          <DtoTextInput
            setDataObject={setOctopusStepConfigurationDataDto}
            dataObject={octopusStepConfigurationDto}
            fieldName={"namespace"}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("projectDescription").length === 0}
          />
          <DtoSelectInput
            setDataFunction={handleDTOChange}
            setDataObject={setOctopusStepConfigurationDataDto}
            textField={"name"}
            valueField={"id"}
            dataObject={octopusStepConfigurationDto}
            filter={"contains"}
            selectOptions={environments ? environments : []}
            fieldName={"environmentName"}
            busy={environmentsSearching}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("namespace").length === 0}
          />
          <DtoSelectInput
            setDataObject={setOctopusStepConfigurationDataDto}
            textField={"name"}
            valueField={"_id"}
            dataObject={octopusStepConfigurationDto}
            filter={"contains"}
            selectOptions={listOfSteps ? listOfSteps : []}
            fieldName={"ecrPushStepId"}
            disabled={
              listOfSteps.length === 0 || octopusStepConfigurationDto.getData("environmentName").length === 0
            }
          />
          <Row className="mx-1 py-2">
            <SaveButtonBase
              recordDto={octopusStepConfigurationDto}
              setRecordDto={setOctopusStepConfigurationDataDto}
              createRecord={callbackFunction}
              updateRecord={callbackFunction}
              lenient={true}
            />
            <CloseButton
              isLoading={isLoading}
              closeEditorCallback={closeEditorPanel}
            />
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
  closeEditorPanel: PropTypes.func
};

export default OctopusStepConfiguration;
