import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Popover, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "contexts/AuthContext";
import terraformStepFormMetadata from "./terraform-stepForm-metadata";
import Model from "core/data_model/model";
import DtoSelectInput from "components/common/input/dto_input/dto-select-input";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import { DialogToastContext, showServiceUnavailableDialog } from "contexts/DialogToastContext";
import GitActionsHelper from "../../helpers/git-actions-helper.js";
import JSONInput from "react-json-editor-ajrm";
import locale    from "react-json-editor-ajrm/locale/en";
import CloseButton from "../../../../../../../common/buttons/CloseButton";
import pipelineActions from "../../../../../../pipeline-actions";
import {faInfoCircle} from "@fortawesome/pro-light-svg-icons";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import TerraformJobTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformJobTypeSelectInput";
import TerraformSCMToolTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformSCMToolTypeSelectInput";
import TerraformSCMToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformSCMToolSelectInput";

const SCM_TOOL_LIST = [
  {
    name: "Gitlab",
    value: "gitlab",
  },
  {
    name: "Github",
    value: "github",
  },
  {
    name: "Bitbucket",
    value: "bitbucket",
  },
];

const JOB_TYPES = [
  {
    name: "Execute Script",
    value: "EXECUTE",
  },
  {
    name: "Delete",
    value: "DELETE",
  }
];

function TerraformStepConfiguration({ stepTool, plan, stepId, parentCallback, getToolsList, closeEditorPanel }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [SCMList, setSCMList] = useState([]);
  const [isGitSearching, setIsGitSearching] = useState(false);
  const [terraformStepConfigurationDto, setTerraformStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [repoList, setRepoList] = useState([]);
  const [isRepoSearching, setIsRepoSearching] = useState(false);
  const [isBranchSearching, setIsBranchSearching] = useState(false);
  const [jsonEditorInvalid, setJsonEditorInvalid] = useState(false);
  const [jsonEditor, setJsonEditor] = useState({});
  const [workspacesList, setWorkspacesList] = useState([]);
  const [isWorkspacesSearching, setIsWorkspacesSearching] = useState(false);
  const [awsList, setAwsList] = useState([]);
  const [isAwsSearching, setIsAwsSearching] = useState(false);
  const [jobType, setJobType] = useState(""); 

  useEffect(() => {
    // loadFormData(stepTool);
    loadData();
  }, []);

  const loadFormData = async (step) => {
    setIsLoading(true);
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
      setTerraformStepConfigurationDataDto(new Model(configuration, TerraformStepFormMetadata, false));
      await fetchAWSDetails();
      await fetchSCMDetails(configuration);
      await searchRepositories(configuration.type, configuration.gitToolId, configuration.bitbucketWorkspace);
      await searchBranches(configuration.type, configuration.gitToolId, configuration.gitRepositoryID, configuration.bitbucketWorkspace);
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      await fetchAWSDetails();
      setTerraformStepConfigurationDataDto(
        new Model({ ...TerraformStepFormMetadata.newModelBase }, TerraformStepFormMetadata, false)
      );
    }

  //   if (plan && stepId) {
  //     let pipelineSteps = pipelineHelpers.formatStepOptions(plan, stepId);
  //     setListOfSteps(pipelineSteps);
  //   }

  //   setIsLoading(false);
  // };

  const loadData = async () => {
    console.log(stepTool);
    setIsLoading(true);
    let {threshold, configuration } = stepTool;
    let terraformConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, terraformStepFormMetadata);

    if (configuration) {
      console.log("here");
      setTerraformStepConfigurationDataDto(new Model(configuration, terraformStepFormMetadata, false));

    }

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const fetchSCMDetails = async (item) => {
    setIsGitSearching(true);
    let tool = item.type;
    let results = await getToolsList(tool);
    const filteredList = results.filter((el) => el.configuration !== undefined);
    if (filteredList) {
      setSCMList(filteredList);
      setIsGitSearching(false);
    }
  };

  const fetchAWSDetails = async () => {
    setIsAwsSearching(true);

    let results = await getToolsList("aws_account");

    const filteredList = results.filter((el) => el.configuration !== undefined);
    if (filteredList) {
      setAwsList(filteredList);
    }
    setIsAwsSearching(false);
  };

  const formatOptions = (options) => {
    options.unshift({ value: "", name: "Select One",  isDisabled: "yes" });
    return options;
  };


  const searchRepositories = async (service, gitAccountId, workspaces) => {
    setIsRepoSearching(true);
    try {
      const res = await GitActionsHelper.searchRepositories(service, gitAccountId, workspaces, getAccessToken);
      if (res.data && res.data.data) {
        let arrOfObj = res.data.data;
        if (arrOfObj) {
          let result = arrOfObj.map(function (el) {
            let o = Object.assign({});
            o.value = el.id;
            o.name = el.name;
            o.sshUrl = el.sshUrl;
            o.httpUrl = el.httpUrl;
            return o;
          });
          if (result) {
            setRepoList(formatOptions(result));
          }
          if (arrOfObj.length === 0) {
            setRepoList([{ value: "", name: "Select One",  isDisabled: "yes" }]);
            let errorMessage = "No Repositories Found!  Please check credentials or configure a repository.";
            toastContext.showErrorDialog(errorMessage);
          }
        }
      } else {
        setRepoList([{ value: "", name: "Select One",  isDisabled: "yes" }]);
        let errorMessage = "Error fetching repositories!  Please validate credentials and configured repositories.";
        toastContext.showErrorDialog(errorMessage);
      }
    } catch (error) {
      setRepoList([{ value: "", name: "Select One",  isDisabled: "yes" }]);
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsRepoSearching(false);
    }
  };

  const searchBranches = async (service, gitAccountId, repoId, workspaces) => {
    setIsBranchSearching(true);
    try {
      const res = await GitActionsHelper.searchBranches(service, gitAccountId, repoId,workspaces,  getAccessToken);
      if (res.data && res.data.data) {
        let arrOfObj = res.data.data;
        if (typeof arrOfObj !== "object") {
          setBranchList([{ value: "", name: "Select One",  isDisabled: "yes" }]);
          let errorMessage = "No Branches Found for the tool";
          toastContext.showErrorDialog(errorMessage);
          return [];
        }
        if (arrOfObj) {
          var result = arrOfObj.map(function (el) {
            var o = Object.assign({});
            o.value = el;
            o.name = el;
            return o;
          });
          if (result) {
            setBranchList(result);
          }
          if (arrOfObj.length === 0) {
            setBranchList([{ value: "", name: "Select One",  isDisabled: "yes" }]);
            let errorMessage = "No Branches Found!  Please check credentials or configure a branch.";
            toastContext.showErrorDialog(errorMessage);
          }
        }
      } else {
        setBranchList([{ value: "", name: "Select One",  isDisabled: "yes" }]);
        let errorMessage = "Error fetching branches!  Please validate credentials and configured repositories.";
        toastContext.showErrorDialog(errorMessage);
      }
    } catch (error) {
      setBranchList([{ value: "", name: "Select One",  isDisabled: "yes" }]);
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsBranchSearching(false);
    }
  };

  const getWorkspaces = async (service, tool, getAccessToken) => {
    setIsWorkspacesSearching(true);
    try {
      let results = await pipelineActions.searchWorkSpaces(service, tool, getAccessToken);
      if (typeof results != "object") {
        setWorkspacesList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage = "Workspace information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
      }
      setWorkspacesList(results);
    } catch (error) {
      console.log(error);
      setWorkspacesList([{ value: "", name: "Select One", isDisabled: "yes" }]);
      let errorMessage = "Workspace information is missing or unavailable!";
      toastContext.showErrorDialog(errorMessage);
    } finally {
      setIsWorkspacesSearching(false);
    }
  };

  const callbackFunction = async () => {
    const item = {
      configuration: terraformStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    parentCallback(item);
  };

  const handleDTOChange = async (fieldName, value) => {
    // console.log(terraformStepConfigurationDto);
    if (fieldName === "type") {
      let newDataObject = terraformStepConfigurationDto;
      newDataObject.setData("type", value.value);
      newDataObject.setData("gitToolId", "");
      newDataObject.setData("gitRepository", "");
      newDataObject.setData("defaultBranch", "");
      newDataObject.setData("gitFilePath", "");
      newDataObject.setData("bitbucketWorkspace", "");
      newDataObject.setData("bitbucketWorkspaceName", "");
      setTerraformStepConfigurationDataDto({ ...newDataObject });
      await fetchSCMDetails(terraformStepConfigurationDto.data);
      return;
    }
    if (fieldName === "gitToolId") {
      let newDataObject = terraformStepConfigurationDto;
      newDataObject.setData("gitToolId", value.id);
      setTerraformStepConfigurationDataDto({ ...newDataObject });
      if (terraformStepConfigurationDto.getData("type") !== "bitbucket") {
        await searchRepositories(terraformStepConfigurationDto.getData("type"), terraformStepConfigurationDto.getData("gitToolId"));
        return;
      }
      await getWorkspaces("bitbucket", terraformStepConfigurationDto.getData("gitToolId"), getAccessToken);
      return;
    }
    if (fieldName === "gitRepository") {
      let newDataObject = terraformStepConfigurationDto;
      let repoName = value.name;
      if (terraformStepConfigurationDto.getData("type") === "gitlab") {
        let re = /\.com:([^\/]+)/;
        let matches = re.exec(value.sshUrl);
        if (matches.length === 0) {
          let errorMessage = "Error fetching gitlab workspace";
          toastContext.showErrorDialog(errorMessage);
          return;
        }
        repoName = matches[1] + "/" + value.name;
      }
      newDataObject.setData("gitRepository", repoName);
      newDataObject.setData("gitRepositoryID", value.value);
      newDataObject.setData("sshUrl", value.sshUrl || "");
      newDataObject.setData("gitUrl", value.httpUrl || "");
      setTerraformStepConfigurationDataDto({ ...newDataObject });
      await searchBranches(
        terraformStepConfigurationDto.getData("type"),
        terraformStepConfigurationDto.getData("gitToolId"),
        terraformStepConfigurationDto.getData("gitRepositoryID"),
        terraformStepConfigurationDto.getData("bitbucketWorkspace"),
      );
      return;
      }
    if (fieldName === "bitbucketWorkspaceName") {
      let newDataObject = terraformStepConfigurationDto;
      newDataObject.setData("bitbucketWorkspace", value.key);
      newDataObject.setData("bitbucketWorkspaceName", value.name);
      setTerraformStepConfigurationDataDto({ ...newDataObject });
      await searchRepositories(
        terraformStepConfigurationDto.getData("type"),
        terraformStepConfigurationDto.getData("gitToolId"),
        value.key
      );
      return;
    }
    if (fieldName === "awsToolConfigId") {
      let newDataObject = terraformStepConfigurationDto;
      newDataObject.setData("awsToolConfigId", value.id);
      setTerraformStepConfigurationDataDto({ ...newDataObject });
      return;
    }
  };

  const handleJsonInputUpdate = (e) => {
    if (e.error) {
      setJsonEditorInvalid(e.error);
      return;
    }
    if (e.jsObject && Object.keys(e.jsObject).length > 0) {
      setJsonEditor(e.jsObject);
      let newDataObject = terraformStepConfigurationDto;
      newDataObject.setData("keyValueMap", e.jsObject);
      setTerraformStepConfigurationDataDto({ ...newDataObject });
      return;
    }
  };

  if (isLoading || terraformStepConfigurationDto === undefined) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <>
      {terraformStepConfigurationDto && (
        <>
        <TerraformJobTypeSelectInput
          dataObject={terraformStepConfigurationDto}
          setDataObject={setTerraformStepConfigurationDataDto}
          disabled={isLoading}
        />
        <TerraformSCMToolTypeSelectInput
          dataObject={terraformStepConfigurationDto}
          setDataObject={setTerraformStepConfigurationDataDto}
          disabled={isLoading}
        />
        <TerraformSCMToolSelectInput
          dataObject={terraformStepConfigurationDto}
          setDataObject={setTerraformStepConfigurationDataDto}
        />
          {/* <DtoSelectInput
            setDataObject={setTerraformStepConfigurationDataDto}
            textField={"name"}
            valueField={"value"}
            dataObject={terraformStepConfigurationDto}
            filter={"contains"}
            selectOptions={JOB_TYPES ? JOB_TYPES : []}
            fieldName={"toolActionType"}
          /> */}
          {/* <DtoSelectInput
            setDataObject={setTerraformStepConfigurationDataDto}
            setDataFunction={handleDTOChange}
            textField={"name"}
            valueField={"value"}
            dataObject={terraformStepConfigurationDto}
            filter={"contains"}
            selectOptions={SCM_TOOL_LIST ? SCM_TOOL_LIST : []}
            fieldName={"type"}
          /> */}

          {/* <OverlayTrigger
            trigger="click"
            rootClose
            placement="left"
            overlay={pipelineHelpers.getRegistryPopover(
              SCMList[SCMList.findIndex((x) => x.id === terraformStepConfigurationDto.getData("gitToolId"))]
            )}
          > */}
            {/* <FontAwesomeIcon
              icon={faInfoCircle}
              className="fa-pull-right pointer pr-2"
              onClick={() => document.body.click()}
            />
          </OverlayTrigger>
          <DtoSelectInput
            setDataFunction={handleDTOChange}
            setDataObject={setTerraformStepConfigurationDataDto}
            textField={"name"}
            valueField={"id"}
            dataObject={terraformStepConfigurationDto}
            filter={"contains"}
            selectOptions={SCMList ? SCMList : []}
            fieldName={"gitToolId"}
            busy={isGitSearching}
            // disabled={terraformStepConfigurationDto.getData("type").length === 0 || isGitSearching}
          /> */}

          {terraformStepConfigurationDto.getData("type") === "bitbucket" && (
            <DtoSelectInput
              setDataFunction={handleDTOChange}
              setDataObject={setTerraformStepConfigurationDataDto}
              textField={"name"}
              valueField={"key"}
              dataObject={terraformStepConfigurationDto}
              filter={"contains"}
              selectOptions={workspacesList ? workspacesList : []}
              fieldName={"bitbucketWorkspaceName"}
              busy={isWorkspacesSearching}
              // disabled={terraformStepConfigurationDto.getData("gitToolId").length === 0 || isWorkspacesSearching}
            />
          )}

          <DtoSelectInput
            setDataFunction={handleDTOChange}
            setDataObject={setTerraformStepConfigurationDataDto}
            textField={"name"}
            valueField={"name"}
            dataObject={terraformStepConfigurationDto}
            filter={"contains"}
            selectOptions={repoList ? repoList : []}
            fieldName={"gitRepository"}
            busy={isRepoSearching}
            // disabled={terraformStepConfigurationDto.getData("gitToolId").length === 0 || isRepoSearching}
          />

          <DtoSelectInput
            setDataObject={setTerraformStepConfigurationDataDto}
            textField={"name"}
            valueField={"value"}
            dataObject={terraformStepConfigurationDto}
            filter={"contains"}
            selectOptions={branchList ? branchList : []}
            fieldName={"defaultBranch"}
            busy={isBranchSearching}
            // disabled={terraformStepConfigurationDto.getData("gitRepository").length === 0 || isBranchSearching}
          />
          <TextInputBase
            setDataObject={setTerraformStepConfigurationDataDto}
            dataObject={terraformStepConfigurationDto}
            fieldName={"gitFilePath"}
            // disabled={
            //   terraformStepConfigurationDto && terraformStepConfigurationDto.getData("defaultBranch").length === 0
            // }
          />
          <DtoSelectInput
            setDataObject={setTerraformStepConfigurationDataDto}
            textField={"name"}
            valueField={"id"}
            dataObject={terraformStepConfigurationDto}
            filter={"contains"}
            selectOptions={awsList ? awsList : []}
            fieldName={"awsToolConfigId"}
            busy={isAwsSearching}
            // disabled={isAwsSearching || terraformStepConfigurationDto && terraformStepConfigurationDto.getData("defaultBranch").length === 0}
          />
          <TextInputBase
            setDataObject={setTerraformStepConfigurationDataDto}
            dataObject={terraformStepConfigurationDto}
            fieldName={"accessKeyParamName"}
            // disabled={
            //   terraformStepConfigurationDto && terraformStepConfigurationDto.getData("awsToolConfigId") && terraformStepConfigurationDto.getData("awsToolConfigId").length === 0
            // }
          />
          <TextInputBase
            setDataObject={setTerraformStepConfigurationDataDto}
            dataObject={terraformStepConfigurationDto}
            fieldName={"secrectKeyParamName"}
            // disabled={
            //   terraformStepConfigurationDto && terraformStepConfigurationDto.getData("awsToolConfigId") && terraformStepConfigurationDto.getData("awsToolConfigId").length === 0
            // }
          />
          <TextInputBase
            setDataObject={setTerraformStepConfigurationDataDto}
            dataObject={terraformStepConfigurationDto}
            fieldName={"regionParamName"}
            // disabled={
            //   terraformStepConfigurationDto && terraformStepConfigurationDto.getData("awsToolConfigId") && terraformStepConfigurationDto.getData("awsToolConfigId").length === 0
            // }
          />
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="left"
            overlay={
              <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
                <Popover.Title as="h3">Runtime Arguments</Popover.Title>

                <Popover.Content>
                  <div className="text-muted mb-2">
                    Enter Runtime arguments as a key value pair JSON. You can add any number of runtime arguments to the
                    JSON Object. Sample: {" { Key1: Value1, Key2: value2 }"}
                  </div>
                </Popover.Content>
              </Popover>
            }
          >
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="fa-pull-right pointer pr-2"
              onClick={() => document.body.click()}
            />
          </OverlayTrigger>
          <div className="form-group m-2">
            <label>Runtime Arguments (Optional)</label>
            <div style={{ border: "1px solid #ced4da", borderRadius: ".25rem" }}>
              <JSONInput
                placeholder={
                  typeof terraformStepConfigurationDto.getData("keyValueMap") === "object" && Object.keys(terraformStepConfigurationDto.getData("keyValueMap")).length > 0
                    ? terraformStepConfigurationDto.getData("keyValueMap")
                    : undefined
                }
                value={terraformStepConfigurationDto.getData("keyValueMap")}
                onChange={(e) => handleJsonInputUpdate(e)}
                theme="light_mitsuketa_tribute"
                locale={locale}
                height="175px"
              />
            </div>
          </div>
          <small className="form-text text-muted form-group m-2 text-left">
            Enter runtime arguments as a JSON Object
          </small>

          <Row className="mx-1 py-2">
            <SaveButtonBase
              lenient={true}
              recordDto={terraformStepConfigurationDto}
              setRecordDto={setTerraformStepConfigurationDataDto}
              createRecord={callbackFunction}
              updateRecord={callbackFunction}
            />
            <CloseButton isLoading={isLoading} closeEditorCallback={closeEditorPanel} />
          </Row>
        </>
      )}
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </>
  );
}

TerraformStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  getToolsList: PropTypes.func,
  closeEditorPanel: PropTypes.func
};

export default TerraformStepConfiguration;
