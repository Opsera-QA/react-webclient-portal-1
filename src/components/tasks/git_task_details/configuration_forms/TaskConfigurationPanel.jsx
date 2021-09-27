import React from "react";
import PropTypes from "prop-types";
import GitTaskTypeSelectInput from "components/common/list_of_values_input/git_tasks/GitTaskTypeSelectInput";
import SFDCGitTaskEditorPanel from "./sfdc-org-sync/SFDCGitTaskConfigurationPanel";
import SFDXCertGenTaskTypeConfigurationPanel from "./sfdx-cert-gen/SFDXCertGenTaskTypeConfigurationPanel";
import SFDCBranchStructuringTaskTypeConfigurationPanel from "./sfdc-branch-structure/SFDCBranchStructuringTaskTypeConfigurationPanel";
import BranchToBranchGitTaskConfigurationPanel from "./branch-to-branch/BranchToBranchGitTaskConfigurationPanel";
import ECSCreationTaskConfigurationPanel from "./ecs-cluster-creation/ECSCreationTaskConfigurationPanel";
import ECSServiceCreationTaskConfigurationPanel from "./ecs-service-creation/ECSServiceCreationTaskConfigurationPanel";
import AwsLambdaConfigurationPanel from "./aws-lambda-creation/AwsLambdaConfigurationPanel";
import AzureClusterConfigurationPanel from "./azure-cluster-creation/AzureClusterConfigurationPanel";
import {TASK_TYPES} from "components/tasks/task.types";

function TaskConfigurationPanel({ gitTasksDataDto, setGitTasksDataDto, gitTasksConfigurationData, setGitTasksConfigurationData, taskType }) {
  const getConfigurationPanel = () => {
    switch (taskType) {
      case TASK_TYPES.SYNC_SALESFORCE_REPO:
        return (
          <SFDCGitTaskEditorPanel 
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
        return (
          <SFDXCertGenTaskTypeConfigurationPanel
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
        return (
          <SFDCBranchStructuringTaskTypeConfigurationPanel
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        ); 
      case TASK_TYPES.SYNC_GIT_BRANCHES:
        return (
          <BranchToBranchGitTaskConfigurationPanel 
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
        return (
          <ECSCreationTaskConfigurationPanel
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
        case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
        return (
          <ECSServiceCreationTaskConfigurationPanel
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION:
        return (
          <AwsLambdaConfigurationPanel
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case TASK_TYPES.AZURE_CLUSTER_CREATION:
        return (
          <AzureClusterConfigurationPanel
            gitTasksConfigurationData={gitTasksConfigurationData}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksDataDto={gitTasksDataDto}
            />
        );
      case "":
      default:
        return <div className="text-center text-muted p-5">You must select a task type before configuring task details.</div>;
    }
  };

  const handleTaskTypeChange = (fieldName, value) => {
    let newDataObject = gitTasksDataDto;
    newDataObject.setData("type", value.value);
    newDataObject.setData("configuration", {});
    setGitTasksConfigurationData(undefined);
    setGitTasksDataDto({...newDataObject});
  };

  return (
    <div>
      <div>
        <GitTaskTypeSelectInput setDataFunction={handleTaskTypeChange} dataObject={gitTasksDataDto} setDataObject={setGitTasksDataDto} />
      </div>
      {getConfigurationPanel()}
    </div>
  );
}

TaskConfigurationPanel.propTypes = {
  taskType: PropTypes.string,
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
  setGitTasksDataDto: PropTypes.func
};

export default TaskConfigurationPanel;
