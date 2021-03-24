import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Popover, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import EBSStepFormMetadata from "./ebs-stepForm-metadata";
import Model from "core/data_model/model";
import DtoSelectInput from "components/common/input/dto_input/dto-select-input";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import { DialogToastContext } from "contexts/DialogToastContext";
import CloseButton from "../../../../../../../common/buttons/CloseButton";
import JSONInput from "react-json-editor-ajrm";
import locale    from "react-json-editor-ajrm/locale/en";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";
import TextInputBase from "components/common/inputs/text/TextInputBase";

const PLATFORM_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: ".NET on Windows Server", label: ".NET on Windows Server" },
  { value: "Go", label: "Go" },
  { value: "Java SE", label: "Java SE" },
  { value: "Multicontainer Docker", label: "Multiple Container Docker" },
  { value: "Node.js", label: "Node.js" },
  { value: "PHP", label: "PHP" },
  { value: "Preconfigured Docker", label: "Pre-configured Docker" },
  { value: "Python", label: "Python" },
  { value: "Ruby", label: "Ruby" },
  { value: "Single Container Docker", label: "Single Container Docker" },
  { value: "Tomcat", label: "Tomcat" }
];

const ACCESS_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "private", label: "Private" },
  { value: "public", label: "Public" },
];

function EBSStepConfiguration({ stepTool, plan, stepId, parentCallback, getToolsList, callbackSaveToVault, pipelineId, closeEditorPanel }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  const [ebsStepConfigurationDto, setEBSStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [awsList, setAwsList] = useState([]);
  const [isAwsSearching, setIsAwsSearching] = useState(false);
  const [jsonEditorInvalid, setJsonEditorInvalid] = useState(false);
  const [jsonEditor, setJsonEditor] = useState({});

  useEffect(() => {
    loadFormData(stepTool);
  }, []);

  const loadFormData = async (step) => {
    setIsLoading(true);
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
      setEBSStepConfigurationDataDto(new Model(configuration, EBSStepFormMetadata, false));
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      setEBSStepConfigurationDataDto(
        new Model({ ...EBSStepFormMetadata.newModelBase }, EBSStepFormMetadata, false)
      );
    }

    if (plan && stepId) {
      let pipelineSteps = pipelineHelpers.formatStepOptions(plan, stepId);
      setListOfSteps(pipelineSteps);
    }
    await fetchEBSDetails();
    setIsLoading(false);
  };

  const fetchEBSDetails = async () => {
    setIsAwsSearching(true);

    let results = await getToolsList("aws_account");

    const filteredList = results.filter((el) => el.configuration !== undefined);
    if (filteredList) {
      setAwsList(filteredList);
    }
    setIsAwsSearching(false);
  };

  const callbackFunction = async () => {
    let newConfiguration = ebsStepConfigurationDto.getPersistData();
    if (typeof(newConfiguration.secretKey) === "string") {
      newConfiguration.secretKey = await saveToVault(pipelineId, stepId, "secretKey", "Vault Secured Key", newConfiguration.secretKey);
    }
    const item = {
      configuration: newConfiguration,
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    parentCallback(item);
  };

  const saveToVault = async (pipelineId, stepId, key, name, value) => {
    const keyName = `${pipelineId}-${stepId}-${key}`;
    const body = {
      "key": keyName,
      "value": value
    };
    const response = await callbackSaveToVault(body);
    if (response.status === 200 ) {
      return { name: name, vaultKey: keyName };
    } else {
      let newDataObject = ebsStepConfigurationDto;
      newDataObject.setData("secretKey", {});
      setEBSStepConfigurationDataDto({ ...newDataObject });
      setIsLoading(false);
      let errorMessage = "ERROR: Something has gone wrong saving secure data to your vault.  Please try again or report the issue to OpsERA.";
      toastContext.showErrorDialog(errorMessage);
      return "";
    }
  };

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "awsToolConfigId") {
      let newDataObject = ebsStepConfigurationDto;
      newDataObject.setData("awsToolConfigId", value.id);
      newDataObject.setData("awsAccountId", value.configuration
        ? value.configuration.awsAccountId
        : "");
      newDataObject.setData("accessKey", value.configuration
        ? value.configuration.accessKey
        : "");
      newDataObject.setData("secretKey", value.configuration
        ? value.configuration.secretKey
        : "");
      newDataObject.setData("regions", value.configuration
        ? value.configuration.regions
        : "");
      setEBSStepConfigurationDataDto({ ...newDataObject });
      return;
    }
    if (fieldName === "platform") {
      let newDataObject = ebsStepConfigurationDto;
      newDataObject.setData("platform", value.value);
      setEBSStepConfigurationDataDto({ ...newDataObject });
    }
    if (fieldName === "bucketAccess") {
      let newDataObject = ebsStepConfigurationDto;
      newDataObject.setData("bucketAccess", value.value);
      setEBSStepConfigurationDataDto({ ...newDataObject });
    }
  };

  const handlePathUpdate = (e) => {
    if (e.error) {
      setJsonEditorInvalid(e.error);
      return;
    }
    if (e.jsObject && Object.keys(e.jsObject).length > 0) {
      setJsonEditor(e.jsObject);
      let newDataObject = ebsStepConfigurationDto;
      newDataObject.setData("dockerVolumePath", e.jsObject);
      setEBSStepConfigurationDataDto({ ...newDataObject });
      return;
    }
  };

  const handleEnvUpdate = (e) => {
    if (e.error) {
      setJsonEditorInvalid(e.error);
      return;
    }
    if (e.jsObject && Object.keys(e.jsObject).length > 0) {
      setJsonEditor(e.jsObject);
      let newDataObject = ebsStepConfigurationDto;
      newDataObject.setData("environments", e.jsObject);
      setEBSStepConfigurationDataDto({ ...newDataObject });
      return;
    }
  };

  

  if (isLoading || ebsStepConfigurationDto === undefined) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <>
      {ebsStepConfigurationDto && (
        <>
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="left"
            overlay={pipelineHelpers.getRegistryPopover(
              awsList[awsList.findIndex((x) => x.id === ebsStepConfigurationDto.getData("ebsToolId"))]
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
            setDataObject={setEBSStepConfigurationDataDto}
            textField={"name"}
            valueField={"id"}
            dataObject={ebsStepConfigurationDto}
            filter={"contains"}
            selectOptions={awsList ? awsList : []}
            fieldName={"awsToolConfigId"}
            busy={isAwsSearching}
            disabled={isAwsSearching}
          />
          <TextInputBase
            setDataObject={setEBSStepConfigurationDataDto}
            dataObject={ebsStepConfigurationDto}
            fieldName={"bucketName"}
            disabled={ebsStepConfigurationDto && ebsStepConfigurationDto.getData("awsToolConfigId").length === 0}
          />
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="left"
            overlay={
              <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
                <Popover.Title as="h3">EC2 Key Name</Popover.Title>

                <Popover.Content>
                  <div className="text-muted mb-2">Key-pair file name used to access the EC2 instance.</div>
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
          <TextInputBase
            setDataObject={setEBSStepConfigurationDataDto}
            dataObject={ebsStepConfigurationDto}
            fieldName={"ec2KeyName"}
            disabled={ebsStepConfigurationDto && ebsStepConfigurationDto.getData("bucketName").length === 0}
          />
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="left"
            overlay={
              <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
                <Popover.Title as="h3">Application Port </Popover.Title>

                <Popover.Content>
                  <div className="text-muted mb-2">Port that the application needs in order to run.</div>
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
          <TextInputBase
            setDataObject={setEBSStepConfigurationDataDto}
            dataObject={ebsStepConfigurationDto}
            fieldName={"port"}
            disabled={ebsStepConfigurationDto && ebsStepConfigurationDto.getData("ec2KeyName").length === 0}
          />
          <DtoSelectInput
            setDataFunction={handleDTOChange}
            setDataObject={setEBSStepConfigurationDataDto}
            valueField="id"
            textField="label"
            dataObject={ebsStepConfigurationDto}
            filter={"contains"}
            selectOptions={PLATFORM_OPTIONS ? PLATFORM_OPTIONS : []}
            fieldName={"platform"}
            disabled={ebsStepConfigurationDto && ebsStepConfigurationDto.getData("port").length === 0}
          />
          <TextInputBase
            setDataObject={setEBSStepConfigurationDataDto}
            dataObject={ebsStepConfigurationDto}
            fieldName={"applicationName"}
            disabled={ebsStepConfigurationDto && ebsStepConfigurationDto.getData("platform").length === 0}
          />
          <TextInputBase
            setDataObject={setEBSStepConfigurationDataDto}
            dataObject={ebsStepConfigurationDto}
            fieldName={"description"}
            disabled={ebsStepConfigurationDto && ebsStepConfigurationDto.getData("applicationName").length === 0}
          />
          <TextInputBase
            setDataObject={setEBSStepConfigurationDataDto}
            dataObject={ebsStepConfigurationDto}
            fieldName={"applicationVersionLabel"}
            disabled={ebsStepConfigurationDto && ebsStepConfigurationDto.getData("description").length === 0}
          />
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="left"
            overlay={
              <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
                <Popover.Title as="h3">S3 Step Info </Popover.Title>

                <Popover.Content>
                  <div className="text-muted mb-2">
                    This step must the corresponding S3 step being used in order to retrieve the data generated by that
                    step. If this is not selected properly the job may fail.
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
            setDataObject={setEBSStepConfigurationDataDto}
            textField={"name"}
            valueField={"_id"}
            dataObject={ebsStepConfigurationDto}
            filter={"contains"}
            selectOptions={listOfSteps ? listOfSteps : []}
            fieldName={"s3ECRStepId"}
            busy={isAwsSearching}
            disabled={
              listOfSteps.length === 0 || ebsStepConfigurationDto.getData("applicationVersionLabel").length === 0
            }
          />
                    <OverlayTrigger
            trigger="click"
            rootClose
            placement="left"
            overlay={
              <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
                <Popover.Title as="h3">Docker Volume Path</Popover.Title>

                <Popover.Content>
                  <div className="text-muted mb-2">
                    Enter Docker Volume Path as a key value pair JSON. You can add any number of paths to the
                    JSON Object. Sample: {" { Source1: Target1, Source2: Target2 }"}
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
          <div className="form-group m-2 mt-2">
            <label>Docker Volume Path</label>
            <div style={{ border: "1px solid #ced4da", borderRadius: ".25rem" }}>
              <JSONInput
                placeholder={
                  ebsStepConfigurationDto.getData("dockerVolumePath") && typeof ebsStepConfigurationDto.getData("dockerVolumePath") === "object" && Object.keys(ebsStepConfigurationDto.getData("dockerVolumePath")).length > 0
                    ? ebsStepConfigurationDto.getData("dockerVolumePath")
                    : undefined
                }
                value={ebsStepConfigurationDto.getData("dockerVolumePath")}
                onChange={(e) => handlePathUpdate(e)}
                theme="light_mitsuketa_tribute"
                locale={locale}
                height="175px"
              />
            </div>
          </div>
          <small className="form-text text-muted form-group m-2 text-left">
            Enter Source, Target path as a JSON Object
          </small>

          <OverlayTrigger
            trigger="click"
            rootClose
            placement="left"
            overlay={
              <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
                <Popover.Title as="h3">Environments</Popover.Title>

                <Popover.Content>
                  <div className="text-muted mb-2">
                    Enter environments as a key value pair JSON. You can add any number of environments to the
                    JSON Object. Sample: {" { envName1: env1, envName2: env2 }"}
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
          <div className="form-group m-2 mt-2">
            <label>Environments</label>
            <div style={{ border: "1px solid #ced4da", borderRadius: ".25rem" }}>
              <JSONInput
                placeholder={
                  ebsStepConfigurationDto.getData("environments") && typeof ebsStepConfigurationDto.getData("environments") === "object" && Object.keys(ebsStepConfigurationDto.getData("environments")).length > 0
                    ? ebsStepConfigurationDto.getData("environments")
                    : undefined
                }
                value={ebsStepConfigurationDto.getData("environments")}
                onChange={(e) => handleEnvUpdate(e)}
                theme="light_mitsuketa_tribute"
                locale={locale}
                height="175px"
              />
            </div>
          </div>
          <small className="form-text text-muted form-group m-2 text-left">
            Enter environments as a JSON Object
          </small>
          <DtoSelectInput
            setDataFunction={handleDTOChange}
            setDataObject={setEBSStepConfigurationDataDto}
            valueField="id"
            textField="label"
            dataObject={ebsStepConfigurationDto}
            filter={"contains"}
            selectOptions={ACCESS_OPTIONS ? ACCESS_OPTIONS : []}
            fieldName={"bucketAccess"}
            disabled={ebsStepConfigurationDto && ebsStepConfigurationDto.getData("s3ECRStepId").length === 0}
          />      
          <TextInputBase
            setDataObject={setEBSStepConfigurationDataDto}
            dataObject={ebsStepConfigurationDto}
            fieldName={"hostedZoneId"}
            disabled={ebsStepConfigurationDto && ebsStepConfigurationDto.getData("bucketAccess").length === 0}
          />
          <TextInputBase
            setDataObject={setEBSStepConfigurationDataDto}
            dataObject={ebsStepConfigurationDto}
            fieldName={"domainName"}
            disabled={ebsStepConfigurationDto && ebsStepConfigurationDto.getData("hostedZoneId").length === 0}
          />
          <Row className="mx-1 py-2">
            <SaveButtonBase
              recordDto={ebsStepConfigurationDto}
              setRecordDto={setEBSStepConfigurationDataDto}
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

EBSStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  pipelineId: PropTypes.string,
  getToolsList: PropTypes.func,
  closeEditorPanel: PropTypes.func
};

export default EBSStepConfiguration;
