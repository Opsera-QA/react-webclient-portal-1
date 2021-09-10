import React from "react";
import PropTypes from "prop-types";
import GitTaskTypeSelectInput from "components/common/list_of_values_input/git_tasks/GitTaskTypeSelectInput";
import SFDCGitTaskEditorPanel from "./sfdc-org-sync/SFDCGitTaskConfigurationPanel";
import SFDCBranchStructuringTaskTypeConfigurationPanel from "./sfdc-branch-structure/SFDCBranchStructuringTaskTypeConfigurationPanel";
import BranchToBranchGitTaskConfigurationPanel from "./branch-to-branch/BranchToBranchGitTaskConfigurationPanel";
import SFDXCertGenTaskTypeConfigurationPanel from "./sfdx-cert-gen/SFDXCertGenTaskTypeConfigurationPanel";
import ECSCreationTaskConfigurationPanel from "./ecs-cluster-creation/ECSCreationTaskConfigurationPanel";
import ECSServiceCreationTaskConfigurationPanel from "./ecs-service-creation/ECSServiceCreationTaskConfigurationPanel";
import AwsLambdaConfigurationPanel from "./aws-lambda-creation/AwsLambdaConfigurationPanel";
import AzureClusterConfigurationPanel from "./azure-cluster-creation/AzureClusterConfigurationPanel";

function GitTasksConfigurationPanel({ gitTasksDataDto, setGitTasksDataDto, gitTasksConfigurationData, setGitTasksConfigurationData }) {
  const getConfigurationPanel = () => {
    switch (gitTasksDataDto.getData("type")) {
      case "sync-sfdc-repo":
        return (
          <SFDCGitTaskEditorPanel 
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case "sync-branch-structure":
        return (
          <SFDCBranchStructuringTaskTypeConfigurationPanel
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        ); 
      case "sync-git-branches":
        return (
          <BranchToBranchGitTaskConfigurationPanel 
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case "sfdc-cert-gen":
        return (
          <SFDXCertGenTaskTypeConfigurationPanel
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case "ecs_cluster_creation":
        return (
          <ECSCreationTaskConfigurationPanel
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
        case "ecs_service_creation":
        return (
          <ECSServiceCreationTaskConfigurationPanel
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case "lambda_function_creation":
        return (
          <AwsLambdaConfigurationPanel
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case "azure_cluster_creation":
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

  return (
    <div>
      {getConfigurationPanel()}
    </div>
  );
}

GitTasksConfigurationPanel.propTypes = {
  gitTaskType: PropTypes.string,
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
  setGitTasksDataDto: PropTypes.func
};

export default GitTasksConfigurationPanel;
