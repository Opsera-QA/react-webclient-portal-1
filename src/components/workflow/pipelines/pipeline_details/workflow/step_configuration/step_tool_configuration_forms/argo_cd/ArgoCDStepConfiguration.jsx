import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import gitYAMLStepFormMetadata from "./argocd-stepForm-metadata";
import Model from "core/data_model/model";
import DtoSelectInput from "components/common/input/dto_input/dto-select-input";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import DtoTextInput from "components/common/input/dto_input/dto-text-input";
import { DialogToastContext, showServiceUnavailableDialog } from "contexts/DialogToastContext";
import SaveButton from "components/common/buttons/SaveButton";
import GitYamlStepActions from "./argocd-step-actions";

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

function ArgoCDStepConfiguration({ stepTool, plan, stepId, parentCallback, getToolsList }) {
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
      await searchRepositories(configuration.type, configuration.gitToolId);
      await searchBranches(configuration.type, configuration.gitToolId, configuration.gitRepositoryID);
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
        let arrOfObj = res.data.data ? res.data.data.applicationList : [];
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

  const searchRepositories = async (service, gitAccountId) => {
    setIsRepoSearching(true);
    try {
      const res = await GitYamlStepActions.searchRepositories(service, gitAccountId, getAccessToken);
      if (res.data && res.data.data) {
        let arrOfObj = res.data.data;
        if (arrOfObj) {
          let result = arrOfObj.map(function (el) {
            let o = Object.assign({});
            o.value = el.id;
            o.name = el.name;
            return o;
          });
          if (result) {
            setRepoList(formatOptions(result));
          }
          if (arrOfObj.length === 0) {
            setArgoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
            let errorMessage = "No Repositories Found!  Please check credentials or configure a repository.";
            toastContext.showErrorDialog(errorMessage);
          }
        }
      } else {
        setRepoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage = "Error fetching repositories!  Please validate credentials and configured repositories.";
        toastContext.showErrorDialog(errorMessage);
      }
    } catch (error) {
      setRepoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsRepoSearching(false);
    }
  };

  const searchBranches = async (service, gitAccountId, repoId) => {
    setIsBranchSearching(true);
    try {
      const res = await GitYamlStepActions.searchBranches(service, gitAccountId, repoId, getAccessToken);
      if (res.data && res.data.data) {
        let arrOfObj = res.data.data;
        if (typeof arrOfObj !== "object") {
          setBranchList([{ value: "", name: "Select One", isDisabled: "yes" }]);
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
            setBranchList([{ value: "", name: "Select One", isDisabled: "yes" }]);
            let errorMessage = "No Branches Found!  Please check credentials or configure a branch.";
            toastContext.showErrorDialog(errorMessage);
          }
        }
      } else {
        setBranchList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage = "Error fetching branches!  Please validate credentials and configured repositories.";
        toastContext.showErrorDialog(errorMessage);
      }
    } catch (error) {
      setBranchList([{ value: "", name: "Select One", isDisabled: "yes" }]);
      console.error(error);
      toastContext.showServiceUnavailableDialog();
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

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "type") {
      let newDataObject = gitYAMLStepConfigurationDto;
      newDataObject.setData("type", value.value);
      newDataObject.setData("gitToolId", "");
      newDataObject.setData("gitRepository", "");
      newDataObject.setData("defaultBranch", "");
      newDataObject.setData("gitFilePath", "");
      newDataObject.setData("gitWorkspace", "");
      setGitYAMLStepConfigurationDataDto({ ...newDataObject });
      fetchSCMDetails(gitYAMLStepConfigurationDto.data);
      return;
    }
    if (fieldName === "gitToolId") {
      let newDataObject = gitYAMLStepConfigurationDto;
      newDataObject.setData("gitToolId", value.id);
      setGitYAMLStepConfigurationDataDto({ ...newDataObject });
      searchRepositories(gitYAMLStepConfigurationDto.getData("type"), gitYAMLStepConfigurationDto.getData("gitToolId"));
      return;
    }
    if (fieldName === "gitRepository") {
      let newDataObject = gitYAMLStepConfigurationDto;
      let repoName = value.name
      if (gitYAMLStepConfigurationDto.getData("type") === "gitlab") {
        repoName = "opsera-repo/" + value.name
      }
      newDataObject.setData("gitRepository", repoName);
      newDataObject.setData("gitRepositoryID", value.value);
      setGitYAMLStepConfigurationDataDto({ ...newDataObject });
      searchBranches(
        gitYAMLStepConfigurationDto.getData("type"),
        gitYAMLStepConfigurationDto.getData("gitToolId"),
        gitYAMLStepConfigurationDto.getData("gitRepositoryID"),
      );
      return;
    }
    if (fieldName === "toolConfigId") {
      let newDataObject = gitYAMLStepConfigurationDto;
      newDataObject.setData("toolConfigId", value.id);
      newDataObject.setData("toolUrl", value.configuration.toolURL);
      newDataObject.setData("userName", value.configuration.userName);
      setGitYAMLStepConfigurationDataDto({ ...newDataObject });
      searchArgoAppsList(value.id);
      return;
    }
  };

  if (isLoading || gitYAMLStepConfigurationDto === undefined) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <>
    { gitYAMLStepConfigurationDto && 
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
        setDataObject={setGitYAMLStepConfigurationDataDto}
        textField={"name"}
        valueField={"_id"}
        dataObject={gitYAMLStepConfigurationDto}
        filter={"contains"}
        selectOptions={listOfSteps ? listOfSteps : []}
        fieldName={"dockerStepID"}
        disabled={listOfSteps.length === 0 || gitYAMLStepConfigurationDto.getData("applicationName").length === 0}
      />

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
        disabled={gitYAMLStepConfigurationDto.getData("gitToolId").length === 0 || isRepoSearching}
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
      <DtoTextInput
        setDataObject={setGitYAMLStepConfigurationDataDto}
        dataObject={gitYAMLStepConfigurationDto}
        fieldName={"gitFilePath"}
        disabled={gitYAMLStepConfigurationDto && gitYAMLStepConfigurationDto.getData("defaultBranch").length === 0}
      />
      {gitYAMLStepConfigurationDto.getData("type") === "bitbucket" && (
        <DtoTextInput
          setDataObject={setGitYAMLStepConfigurationDataDto}
          dataObject={gitYAMLStepConfigurationDto}
          fieldName={"gitWorkspace"}
        />
      )}
      <SaveButton
        recordDto={gitYAMLStepConfigurationDto}
        setRecordDto={setGitYAMLStepConfigurationDataDto}
        createRecord={callbackFunction}
        updateRecord={callbackFunction}
        disable={gitYAMLStepConfigurationDto.getData("type") === "bitbucket" && gitYAMLStepConfigurationDto.getData("gitWorkspace").length === 0}
      />
      </>
      }
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
};

export default ArgoCDStepConfiguration;
