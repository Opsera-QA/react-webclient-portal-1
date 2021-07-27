import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Popover, Row  } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH,faTools } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import gitYAMLStepFormMetadata from "./argocd-stepForm-metadata";
import Model from "core/data_model/model";
import DtoSelectInput from "components/common/input/dto_input/dto-select-input";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import { DialogToastContext } from "contexts/DialogToastContext";
import GitYamlStepActions from "./argocd-step-actions";
import pipelineActions from "components/workflow/pipeline-actions";
import CloseButton from "../../../../../../../common/buttons/CloseButton";
import { Link } from "react-router-dom";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";
import TextInputBase from "components/common/inputs/text/TextInputBase";

const YAML_SCM_TOOL = [
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

function ArgoCDStepConfiguration({ stepTool, plan, stepId, parentCallback, getToolsList,closeEditorPanel }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [SCMList, setSCMList] = useState([]);
  const [isGitSearching, setIsGitSearching] = useState(false);
  const [gitYAMLStepConfigurationDto, setGitYAMLStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [repoList, setRepoList] = useState([]);
  const [isRepoSearching, setIsRepoSearching] = useState(false);
  const [isBranchSearching, setIsBranchSearching] = useState(false);
  const [argoList, setArgoList] = useState([]);
  const [isArgoSearching, setIsArgoSearching] = useState(false);
  const [isArgoAppsSearching, setIsArgoAppsSearching] = useState(false);
  const [argoAppsList, setArgoAppsList] = useState([]);
  const [workspacesList, setWorkspacesList] = useState([]);
  const [isWorkspacesSearching, setIsWorkspacesSearching] = useState(false);

  useEffect(() => {
    loadFormData(stepTool);
  }, []);

  const loadFormData = async (step) => {
    setIsLoading(true);
    await searchArgoList("argo");
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
      setGitYAMLStepConfigurationDataDto(new Model(configuration, gitYAMLStepFormMetadata, false));
      await fetchSCMDetails(configuration);
      if (configuration.type === "bitbucket") await getWorkspaces("bitbucket", configuration.gitToolId , getAccessToken);
      await searchRepositories(configuration.type, configuration.gitToolId, configuration.bitbucketWorkspace);
      await searchBranches(
        configuration.type,
        configuration.gitToolId,
        configuration.gitRepositoryID,
        configuration.bitbucketWorkspace
      );
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      setGitYAMLStepConfigurationDataDto(
        new Model({ ...gitYAMLStepFormMetadata.newModelBase }, gitYAMLStepFormMetadata, false)
      );
    }

    if (plan && stepId) {
      let pipelineSteps = pipelineHelpers.formatStepOptions(plan, stepId);
      setListOfSteps(pipelineSteps);
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

  const formatOptions = (options) => {
    options.unshift({ value: "", name: "Select One", isDisabled: "yes" });
    return options;
  };

  const searchArgoAppsList = async (id) => {
    setIsArgoAppsSearching(true);
    try {
      const res = await GitYamlStepActions.searchArgoAppsList(id, getAccessToken);
      if (res.data) {
        let arrOfObj = res.data.data && res.data.data.length > 0 ? res.data.data : [];
        setArgoAppsList(arrOfObj);
        if (arrOfObj.length === 0) {
          setArgoAppsList([{ value: "", name: "Select One", isDisabled: "yes" }]);
          let errorMessage = "No Argo Applications Found!  Please validate credentials and configured applications.";
          toastContext.showErrorDialog(errorMessage);
        }
      } else {
        setArgoAppsList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage =
          "Error fetching Argo Applications!  Please validate credentials and configured repositories.";
        toastContext.showErrorDialog(errorMessage);
      }
    } catch (error) {
      setArgoAppsList([{ value: "", name: "Select One", isDisabled: "yes" }]);
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsArgoAppsSearching(false);
    }
  };

  const searchArgoList = async (service) => {
    setIsArgoSearching(true);
    try {
      const res = await GitYamlStepActions.searchArgoList(service, getAccessToken);
      if (res.data) {
        let respObj = [];
        let arrOfObj = res.data;
        arrOfObj.map((item) => {
          respObj.push({ name: item.name, id: item._id, configuration: item.configuration });
        });
        setArgoList(formatOptions(respObj));
        if (respObj.length === 0) {
          setArgoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
          let errorMessage = "No Argo Instances Found!  Please configure an argo application in tools registry.";
          toastContext.showErrorDialog(errorMessage);
        }
      } else {
        setArgoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage =
          "Argo information is missing or unavailable!  Please ensure the required Cypress creds are registered and up to date in Tool Registry.";
        toastContext.showErrorDialog(errorMessage);
      }
    } catch (error) {
      setArgoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsArgoSearching(false);
    }
  };

  const searchRepositories = async (service, gitAccountId, workspace) => {
    setIsRepoSearching(true);
    try {
      let results = await pipelineActions.searchRepositories(service, gitAccountId, workspace, getAccessToken);
      if (typeof results != "object") {
        setRepoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage = "Repository information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
      }
      setRepoList(results);
    } catch (error) {
      console.log(error);
      setRepoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
      let errorMessage = "Repository information is missing or unavailable!";
      toastContext.showErrorDialog(errorMessage);
    } finally {
      setIsRepoSearching(false);
    }
  };

  const searchBranches = async (service, gitAccountId, repoId, workspace) => {
    setIsBranchSearching(true);
    try {
      let results = await pipelineActions.searchBranches(service, gitAccountId, repoId, workspace, getAccessToken);
      console.log(results);
      if (typeof results != "object") {
        setBranchList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage = "Branch information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
      }
      setBranchList(results);
    } catch (error) {
      console.log(error);
      setBranchList([{ value: "", name: "Select One", isDisabled: "yes" }]);
      let errorMessage = "Branch information is missing or unavailable!";
      toastContext.showErrorDialog(errorMessage);
    } finally {
      setIsBranchSearching(false);
    }
  };

  const callbackFunction = async () => {
    const item = {
      configuration: gitYAMLStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    parentCallback(item);
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

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "type") {
      let newDataObject = gitYAMLStepConfigurationDto;
      newDataObject.setData("type", value.value);
      newDataObject.setData("gitToolId", "");
      newDataObject.setData("gitRepository", "");
      newDataObject.setData("defaultBranch", "");
      newDataObject.setData("gitFilePath", "");
      newDataObject.setData("gitWorkspace", "");
      newDataObject.setData("bitbucketWorkspace", "");
      newDataObject.setData("bitbucketWorkspaceName", "");
      setGitYAMLStepConfigurationDataDto({ ...newDataObject });
      await fetchSCMDetails(gitYAMLStepConfigurationDto.data);
      return;
    }
    if (fieldName === "gitToolId") {
      let newDataObject = gitYAMLStepConfigurationDto;
      newDataObject.setData("gitToolId", value.id);
      setGitYAMLStepConfigurationDataDto({ ...newDataObject });
      if (gitYAMLStepConfigurationDto.getData("type") === "bitbucket") {
        await getWorkspaces("bitbucket", value.id, getAccessToken);
      } else {
        await searchRepositories(
          gitYAMLStepConfigurationDto.getData("type"),
          gitYAMLStepConfigurationDto.getData("gitToolId")
        );
        return;
      }
    }
    if (fieldName === "gitRepository") {
      let newDataObject = gitYAMLStepConfigurationDto;
      let repoName = value.name;
      if (gitYAMLStepConfigurationDto.getData("type") === "gitlab") {
        let re = /\.com:(.*)\.git/;
        let matches = re.exec(value.sshUrl);
        if (matches.length === 0) {
          let errorMessage = "Error fetching gitlab workspace";
          toastContext.showErrorDialog(errorMessage);
          return;
        }
        repoName = matches[1];
      }
      newDataObject.setData("gitRepository", repoName);
      newDataObject.setData("gitRepositoryID", value.id);
      newDataObject.setData("gitUrl", value.httpUrl || "");
      newDataObject.setData("sshUrl", value.sshUrl || "");
      setGitYAMLStepConfigurationDataDto({ ...newDataObject });
      await searchBranches(
        gitYAMLStepConfigurationDto.getData("type"),
        gitYAMLStepConfigurationDto.getData("gitToolId"),
        value.id,
        gitYAMLStepConfigurationDto.getData("bitbucketWorkspace")
      );
      return;
    }
    if (fieldName === "toolConfigId") {
      if (value && value.configuration) {
        let newDataObject = gitYAMLStepConfigurationDto;
        newDataObject.setData("toolConfigId", value.id);
        newDataObject.setData("toolUrl", value.configuration.toolURL);
        newDataObject.setData("userName", value.configuration.userName);
        setGitYAMLStepConfigurationDataDto({ ...newDataObject });
        await searchArgoAppsList(value.id);
      }
      return;
    }
    if (fieldName === "bitbucketWorkspaceName") {
      let newDataObject = gitYAMLStepConfigurationDto;
      newDataObject.setData("bitbucketWorkspace", value.key);
      newDataObject.setData("bitbucketWorkspaceName", value.name);
      setGitYAMLStepConfigurationDataDto({ ...newDataObject });
      await searchRepositories(
        gitYAMLStepConfigurationDto.getData("type"),
        gitYAMLStepConfigurationDto.getData("gitToolId"),
        value.key
      );
      return;
    }
  };

  if (isLoading || gitYAMLStepConfigurationDto === undefined) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <>
      {gitYAMLStepConfigurationDto && (
        <>
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="left"
            overlay={pipelineHelpers.getRegistryPopover(
              argoList[argoList.findIndex((x) => x.id === gitYAMLStepConfigurationDto.getData("toolConfigId"))]
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
            setDataObject={setGitYAMLStepConfigurationDataDto}
            textField={"name"}
            valueField={"id"}
            dataObject={gitYAMLStepConfigurationDto}
            filter={"contains"}
            selectOptions={argoList ? argoList : []}
            fieldName={"toolConfigId"}
            busy={isArgoSearching}
          />
          <div>
            <DtoSelectInput
              setDataObject={setGitYAMLStepConfigurationDataDto}
              textField={"name"}
              valueField={"name"}
              dataObject={gitYAMLStepConfigurationDto}
              filter={"contains"}
              selectOptions={argoAppsList ? argoAppsList : []}
              fieldName={"applicationName"}
              busy={isArgoAppsSearching}
              disabled={gitYAMLStepConfigurationDto.getData("toolConfigId").length === 0 || isArgoAppsSearching}
            />
            {gitYAMLStepConfigurationDto && gitYAMLStepConfigurationDto.getData("toolConfigId") && (
              <Link
                className="ml-2"
                to={"/inventory/tools/details/" + gitYAMLStepConfigurationDto.getData("toolConfigId")}
              >
                <FontAwesomeIcon icon={faTools} className="mr-1" /> Create a new Argo application
              </Link>
            )}
          </div>
          <div>
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="left"
              overlay={
                <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
                  <Popover.Title as="h3">Docker/ECR Step </Popover.Title>

                  <Popover.Content>
                    <div className="text-muted mb-2">
                      This step must the corresponding ECR/Docker step being used in order to retrieve the Docker Image
                      URL generated by that step. If this is not selected properly the job may fail.
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
              setDataObject={setGitYAMLStepConfigurationDataDto}
              textField={"name"}
              valueField={"_id"}
              dataObject={gitYAMLStepConfigurationDto}
              filter={"contains"}
              selectOptions={listOfSteps ? listOfSteps : []}
              fieldName={"dockerStepID"}
              disabled={listOfSteps.length === 0 || gitYAMLStepConfigurationDto.getData("applicationName").length === 0}
            />
          </div>
          <DtoSelectInput
            setDataObject={setGitYAMLStepConfigurationDataDto}
            setDataFunction={handleDTOChange}
            textField={"name"}
            valueField={"value"}
            dataObject={gitYAMLStepConfigurationDto}
            filter={"contains"}
            selectOptions={YAML_SCM_TOOL ? YAML_SCM_TOOL : []}
            fieldName={"type"}
            disabled={gitYAMLStepConfigurationDto.getData("dockerStepID").length === 0}
          />

          <OverlayTrigger
            trigger="click"
            rootClose
            placement="left"
            overlay={pipelineHelpers.getRegistryPopover(
              SCMList[SCMList.findIndex((x) => x.id === gitYAMLStepConfigurationDto.getData("gitToolId"))]
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
            setDataObject={setGitYAMLStepConfigurationDataDto}
            textField={"name"}
            valueField={"id"}
            dataObject={gitYAMLStepConfigurationDto}
            filter={"contains"}
            selectOptions={SCMList ? SCMList : []}
            fieldName={"gitToolId"}
            busy={isGitSearching}
            disabled={gitYAMLStepConfigurationDto.getData("type").length === 0 || isGitSearching}
          />
          {gitYAMLStepConfigurationDto.getData("type") === "bitbucket" && (
            <DtoSelectInput
              setDataFunction={handleDTOChange}
              setDataObject={setGitYAMLStepConfigurationDataDto}
              textField={"name"}
              valueField={"value"}
              dataObject={gitYAMLStepConfigurationDto}
              filter={"contains"}
              selectOptions={workspacesList ? workspacesList : []}
              fieldName={"bitbucketWorkspaceName"}
              busy={isWorkspacesSearching}
              disabled={gitYAMLStepConfigurationDto.getData("gitToolId").length === 0 || isWorkspacesSearching}
            />
          )}
          <DtoSelectInput
            setDataFunction={handleDTOChange}
            setDataObject={setGitYAMLStepConfigurationDataDto}
            textField={"name"}
            valueField={"name"}
            dataObject={gitYAMLStepConfigurationDto}
            filter={"contains"}
            selectOptions={repoList ? repoList : []}
            fieldName={"gitRepository"}
            busy={isRepoSearching}
            disabled={
              gitYAMLStepConfigurationDto.getData("gitToolId").length === 0 ||
              isRepoSearching ||
              (gitYAMLStepConfigurationDto.getData("type") === "bitbucket" &&
                gitYAMLStepConfigurationDto.getData("bitbucketWorkspace").length === 0)
            }
          />

          <DtoSelectInput
            setDataObject={setGitYAMLStepConfigurationDataDto}
            textField={"name"}
            valueField={"value"}
            dataObject={gitYAMLStepConfigurationDto}
            filter={"contains"}
            selectOptions={branchList ? branchList : []}
            fieldName={"defaultBranch"}
            busy={isBranchSearching}
            disabled={gitYAMLStepConfigurationDto.getData("gitRepository").length === 0 || isBranchSearching}
          />
          <TextInputBase
            setDataObject={setGitYAMLStepConfigurationDataDto}
            dataObject={gitYAMLStepConfigurationDto}
            fieldName={"gitFilePath"}
            disabled={gitYAMLStepConfigurationDto && gitYAMLStepConfigurationDto.getData("defaultBranch").length === 0}
          />
          {gitYAMLStepConfigurationDto.getData("type") === "bitbucket" && (
            <TextInputBase
              setDataObject={setGitYAMLStepConfigurationDataDto}
              dataObject={gitYAMLStepConfigurationDto}
              fieldName={"gitWorkspace"}
              disabled={gitYAMLStepConfigurationDto && gitYAMLStepConfigurationDto.getData("gitFilePath").length === 0}
            />
          )}

          <Row className="mx-1 py-2">
            <SaveButtonBase
              lenient={true}
              recordDto={gitYAMLStepConfigurationDto}
              setRecordDto={setGitYAMLStepConfigurationDataDto}
              createRecord={callbackFunction}
              updateRecord={callbackFunction}
              disable={
                gitYAMLStepConfigurationDto.getData("type") === "bitbucket" &&
                gitYAMLStepConfigurationDto.getData("gitWorkspace").length === 0
              }
            />
            <CloseButton isLoading={isLoading} closeEditorCallback={closeEditorPanel} />
          </Row>
        </>
      )}
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </>
  );
}

ArgoCDStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  getToolsList: PropTypes.func,
  closeEditorPanel: PropTypes.func
};

export default ArgoCDStepConfiguration;
