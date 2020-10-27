import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import TerraformStepFormMetadata from "./terraform-stepForm-metadata";
import Model from "core/data_model/model";
import DtoSelectInput from "components/common/input/dto_input/dto-select-input";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import DtoTextInput from "components/common/input/dto_input/dto-text-input";
import { DialogToastContext, showServiceUnavailableDialog } from "contexts/DialogToastContext";
import SaveButton from "components/common/buttons/SaveButton";
import GitActionsHelper from "../../helpers/git-actions-helper.js";

const SCM_TOOL_LIST = [
  {
    name: "Gitlab",
    value: "gitlab",
  },
  // {
  //   name: "Github",
  //   value: "github",
  // },
  // {
  //   name: "Bitbucket",
  //   value: "bitbucket",
  // },
];

function TerraformStepConfiguration({ stepTool, plan, stepId, parentCallback, getToolsList }) {
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

  useEffect(() => {
    loadFormData(stepTool);
  }, []);

  const loadFormData = async (step) => {
    setIsLoading(true);
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
      setTerraformStepConfigurationDataDto(new Model(configuration, TerraformStepFormMetadata, false));
      await fetchSCMDetails(configuration);
      await searchRepositories(configuration.type, configuration.gitToolId);
      await searchBranches(configuration.type, configuration.gitToolId, configuration.gitRepositoryID);
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      setTerraformStepConfigurationDataDto(
        new Model({ ...TerraformStepFormMetadata.newModelBase }, TerraformStepFormMetadata, false)
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
    options.unshift({ value: "", name: "Select One",  isDisabled: "yes" });
    return options;
  };


  const searchRepositories = async (service, gitAccountId) => {
    setIsRepoSearching(true);
    try {
      const res = await GitActionsHelper.searchRepositories(service, gitAccountId, getAccessToken);
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

  const searchBranches = async (service, gitAccountId, repoId) => {
    setIsBranchSearching(true);
    try {
      const res = await GitActionsHelper.searchBranches(service, gitAccountId, repoId, getAccessToken);
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

  const callbackFunction = async () => {
    let newDataObject = terraformStepConfigurationDto;
    let keyMap = {};
    if (terraformStepConfigurationDto.getData("keyValueName").length > 0 && terraformStepConfigurationDto.getData("keyValue").length > 0) {
      keyMap[terraformStepConfigurationDto.getData("keyValueName")] = terraformStepConfigurationDto.getData("keyValue")
      newDataObject.setData("keyValueMap", keyMap);
      setTerraformStepConfigurationDataDto({ ...newDataObject });
    }
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
    if (fieldName === "type") {
      let newDataObject = terraformStepConfigurationDto;
      newDataObject.setData("type", value.value);
      newDataObject.setData("gitToolId", "");
      newDataObject.setData("gitRepository", "");
      newDataObject.setData("defaultBranch", "");
      newDataObject.setData("gitFilePath", "");
      setTerraformStepConfigurationDataDto({ ...newDataObject });
      fetchSCMDetails(terraformStepConfigurationDto.data);
      return;
    }
    if (fieldName === "gitToolId") {
      let newDataObject = terraformStepConfigurationDto;
      newDataObject.setData("gitToolId", value.id);
      setTerraformStepConfigurationDataDto({ ...newDataObject });
      searchRepositories(terraformStepConfigurationDto.getData("type"), terraformStepConfigurationDto.getData("gitToolId"));
      return;
    }
    if (fieldName === "gitRepository") {
      let newDataObject = terraformStepConfigurationDto;
      let repoName = value.name
      if (terraformStepConfigurationDto.getData("type") === "gitlab") {
        repoName = "opsera-repo/" + value.name
      }
      newDataObject.setData("gitRepository", repoName);
      newDataObject.setData("gitRepositoryID", value.value);
      setTerraformStepConfigurationDataDto({ ...newDataObject });
      searchBranches(
        terraformStepConfigurationDto.getData("type"),
        terraformStepConfigurationDto.getData("gitToolId"),
        terraformStepConfigurationDto.getData("gitRepositoryID"),
      );
      return;
      }
  };

  if (isLoading || terraformStepConfigurationDto === undefined) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <>
    { terraformStepConfigurationDto && 
    <>
      <DtoSelectInput
        setDataObject={setTerraformStepConfigurationDataDto}
        setDataFunction={handleDTOChange}
        textField={"name"}
        valueField={"value"}
        dataObject={terraformStepConfigurationDto}
        filter={"contains"}
        selectOptions={SCM_TOOL_LIST ? SCM_TOOL_LIST : []}
        fieldName={"type"}
      />

      <OverlayTrigger
        trigger="click"
        rootClose
        placement="left"
        overlay={pipelineHelpers.getRegistryPopover(
          SCMList[SCMList.findIndex((x) => x.id === terraformStepConfigurationDto.getData("gitToolId"))]
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
        setDataObject={setTerraformStepConfigurationDataDto}
        textField={"name"}
        valueField={"id"}
        dataObject={terraformStepConfigurationDto}
        filter={"contains"}
        selectOptions={SCMList ? SCMList : []}
        fieldName={"gitToolId"}
        busy={isGitSearching}
        disabled={terraformStepConfigurationDto.getData("type").length === 0 || isGitSearching}
      />

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
        disabled={terraformStepConfigurationDto.getData("gitToolId").length === 0 || isRepoSearching}
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
        disabled={terraformStepConfigurationDto.getData("gitRepository").length === 0 || isBranchSearching}
      />
      <DtoTextInput
        setDataObject={setTerraformStepConfigurationDataDto}
        dataObject={terraformStepConfigurationDto}
        fieldName={"gitFilePath"}
        disabled={terraformStepConfigurationDto && terraformStepConfigurationDto.getData("defaultBranch").length === 0}
      />
      <DtoTextInput
        setDataObject={setTerraformStepConfigurationDataDto}
        dataObject={terraformStepConfigurationDto}
        fieldName={"keyValueName"}
        disabled={terraformStepConfigurationDto && terraformStepConfigurationDto.getData("gitFilePath").length === 0}
      />
      <DtoTextInput
        setDataObject={setTerraformStepConfigurationDataDto}
        dataObject={terraformStepConfigurationDto}
        fieldName={"keyValue"}
        disabled={terraformStepConfigurationDto && terraformStepConfigurationDto.getData("gitFilePath").length === 0}
      />
      <SaveButton
        recordDto={terraformStepConfigurationDto}
        setRecordDto={setTerraformStepConfigurationDataDto}
        createRecord={callbackFunction}
        updateRecord={callbackFunction}
        disable={
          terraformStepConfigurationDto.getData("keyValueName").length > 0 && terraformStepConfigurationDto.getData("keyValue").length === 0 ||
    terraformStepConfigurationDto.getData("keyValueName").length === 0 && terraformStepConfigurationDto.getData("keyValue").length > 0
        }
      />
      </>
      }
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
};

export default TerraformStepConfiguration;
