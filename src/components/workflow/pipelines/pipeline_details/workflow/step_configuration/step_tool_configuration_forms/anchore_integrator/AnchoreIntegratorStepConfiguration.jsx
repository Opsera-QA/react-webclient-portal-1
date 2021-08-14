import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Button, Popover, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faSpinner, faEllipsisH, faSave } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import { Link } from "react-router-dom";
import Model from "core/data_model/model";
import DtoSelectInput from "components/common/input/dto_input/dto-select-input";
import LoadingDialog from "components/common/status_notifications/loading";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import {DialogToastContext} from "../../../../../../../../contexts/DialogToastContext";
import CloseButton from "../../../../../../../common/buttons/CloseButton";
import anchoreIntegratorStepConfigurationMetadata from "./anchore-integrator-step-configuration-metadata";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";

function AnchoreIntegratorStepConfiguration({ stepTool, plan, stepId, parentCallback, getToolsList, closeEditorPanel }) {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);

  const [anchoreList, setAnchoreList] = useState([]);
  const [isAnchoreSearching, setIsAnchoreSearching] = useState(false);
  const [anchoreStepConfigurationDto, setAnchoreStepConfigurationDataDto] = useState(undefined);
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
      setListOfSteps(pipelineSteps);
    }

    await fetchAnchoreDetails();
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

  const fetchAnchoreDetails = async () => {
    setIsAnchoreSearching(true);

    let results = await getToolsList("anchore-integrator");

    const filteredList = results.filter((el) => el.configuration !== undefined);
    if (filteredList) {
      setAnchoreList(filteredList);
      setIsAnchoreSearching(false);
    }
  };

  const loadFormData = async (step) => {
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
      setAnchoreStepConfigurationDataDto(new Model(configuration, anchoreIntegratorStepConfigurationMetadata, false));
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      setAnchoreStepConfigurationDataDto(
        new Model({ ...anchoreIntegratorStepConfigurationMetadata.newObjectFields }, anchoreIntegratorStepConfigurationMetadata, false)
      );
    }
  };

  const callbackFunction = async () => {
    const item = {
      configuration: anchoreStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    parentCallback(item);
  };

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "anchoreToolConfigId") {
      let newDataObject = anchoreStepConfigurationDto;
      newDataObject.setData("anchoreToolConfigId", value.id);
      newDataObject.setData("anchoreUrl", value.configuration.toolURL);
      newDataObject.setData("accountUsername", value.configuration.accountUsername);
      setAnchoreStepConfigurationDataDto({ ...newDataObject });
      return;
    }
  };

  if (isLoading || anchoreStepConfigurationDto == null) {
    if (isAnchoreSearching) {
      return (
        <div className="form-text text-muted mt-2 p-2">
          <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
          Loading Anchore accounts from Tool Registry
        </div>
      );
    }
    return <LoadingDialog size="sm" />;
  }

  if (anchoreList == null || anchoreList.length === 0) {
    return (
      <div className="form-text text-muted p-2">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
        No accounts have been registered for Anchore. Please go to
        <Link to="/inventory/tools">Tool Registry</Link> and add a Anchore Account entry in order to proceed.
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
          anchoreList[anchoreList.findIndex((x) => x.id === anchoreStepConfigurationDto.getData("anchoreToolConfigId"))]
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
        setDataObject={setAnchoreStepConfigurationDataDto}
        textField={"name"}
        valueField={"id"}
        dataObject={anchoreStepConfigurationDto}
        filter={"contains"}
        selectOptions={anchoreList ? anchoreList : []}
        fieldName={"anchoreToolConfigId"}
        busy={isAnchoreSearching}
        disabled={anchoreList.length === 0 || isAnchoreSearching}
      />
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="left"
        overlay={
          <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
            <Popover.Title as="h3">Docker/ECR Step </Popover.Title>

            <Popover.Content>
              <div className="text-muted mb-2">
                This step must the corresponding ECR/Docker step being used in order to retrieve the Docker Image URL
                generated by that step. If this is not selected properly the job may fail.
              </div>
            </Popover.Content>
          </Popover>
        }
      >
        <FontAwesomeIcon
          icon={faEllipsisH}
          className="fa-pull-right pointer pr-1"
          onClick={() => document.body.click()}
        />
      </OverlayTrigger>
      <DtoSelectInput
        setDataObject={setAnchoreStepConfigurationDataDto}
        textField={"name"}
        valueField={"_id"}
        dataObject={anchoreStepConfigurationDto}
        filter={"contains"}
        selectOptions={listOfSteps ? listOfSteps : []}
        fieldName={"ecrPushStepId"}
        disabled={listOfSteps.length === 0 || anchoreStepConfigurationDto.getData("anchoreToolConfigId").length === 0}
      />
      <Row className="mx-1 py-2">
        <SaveButtonBase
          disable={
            anchoreStepConfigurationDto.getData("type") === "push" &&
            anchoreStepConfigurationDto.getData("artifactStepId").length === 0
          }
          recordDto={anchoreStepConfigurationDto}
          setRecordDto={setAnchoreStepConfigurationDataDto}
          createRecord={callbackFunction}
          updateRecord={callbackFunction}
          lenient={true}
          className="mr-2"
        />
        <CloseButton isLoading={isLoading} closeEditorCallback={closeEditorPanel} />
      </Row>
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </>
  );
}

AnchoreIntegratorStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  getToolsList: PropTypes.func,
  closeEditorPanel: PropTypes.func
};

export default AnchoreIntegratorStepConfiguration;
