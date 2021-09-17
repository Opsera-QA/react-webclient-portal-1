import React, {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import GitTaskSummaryPanelBase from "components/tasks/git_task_details/GitTaskSummaryPanelBase";
import sfdcGitTaskConfigurationMetadata
  from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/sfdc-git-task-configuration-metadata";
import SFDCGitTaskTypeSummaryCard
  from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/SFDCGitTaskTypeSummaryCard";
import axios from "axios";
import SFDCBranchStructuringTaskTypeSummaryCard from "./configuration_forms/sfdc-branch-structure/SFDCBranchStructuringTaskTypeSummaryCard";
import sfdcGitBranchTaskConfigurationMetadata
  from "components/tasks/git_task_details/configuration_forms/sfdc-branch-structure/sfdc-git-branch-structuring-task-configuration-metadata";
import branchToBranchGitTaskConfigurationMetadata from "components/tasks/git_task_details/configuration_forms/branch-to-branch/branch-to-branch-git-task-configuration";
import BranchToBranchGitTaskTypeSummaryCard from "components/tasks/git_task_details/configuration_forms/branch-to-branch/BranchToBranchGitTaskTypeSummaryCard";
import ECSCreationTaskTypeSummaryCard from "./configuration_forms/ecs-cluster-creation/ECSCreationTaskTypeSummaryCard";
import ec2ClusterCreationTaskConfigurationMetadata
  from "./configuration_forms/ecs-cluster-creation/ecs-creation-git-task-configuration";
import ECSServiceCreationTaskTypeSummaryCard
  from "./configuration_forms/ecs-service-creation/ECSServiceCreationTaskTypeSummaryCard";
import ec2ServiceCreationTaskConfigurationMetadata
  from "./configuration_forms/ecs-service-creation/ecs-service-creation-git-task-configuration";
import sfdxCertGenTaskConfigurationMetadata from "components/tasks/git_task_details/configuration_forms/sfdx-cert-gen/sfdx-cert-gen-task-configuration-metadata";
import SFDXCertGenTaskTypeSummaryCard from "./configuration_forms/sfdx-cert-gen/SFDXCertGenTaskTypeSummaryCard";
import AwsLambdaTaskTypeSummaryCard from "./configuration_forms/aws-lambda-creation/AwsLambdaSummaryPanel";
import awsLambdaFunctionTaskConfigurationMetadata
  from "./configuration_forms/aws-lambda-creation/aws-lambda-metadata";

function TaskSummaryPanel({ gitTasksData, setGitTasksData, setActiveTab, loadData, accessRoleData }) {
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const wrapGitTaskType = (metaData) => {
    return new Model(gitTasksData.getData("configuration"), metaData, false);
  };

  // TODO: Make these panels more similar to the pipeline summary cards
  const getTaskTypeSummaryPanel = () => {
    switch (gitTasksData.getData("type")) {
      case "sync-sfdc-repo":
        return (
          <SFDCGitTaskTypeSummaryCard
            gitTaskConfigurationData={wrapGitTaskType(sfdcGitTaskConfigurationMetadata)}
            gitTasksData={gitTasksData}
          />
        );
      case "sfdc-cert-gen":
        return (
          <SFDXCertGenTaskTypeSummaryCard
            gitTaskConfigurationData={wrapGitTaskType(sfdxCertGenTaskConfigurationMetadata)}
            gitTasksData={gitTasksData}
          />
        );    
      case "sync-branch-structure":
        return (
          <SFDCBranchStructuringTaskTypeSummaryCard
            gitTaskConfigurationData={wrapGitTaskType(sfdcGitBranchTaskConfigurationMetadata)}
            gitTasksData={gitTasksData}
          />
        );
      case "sync-git-branches":
        return (
          <BranchToBranchGitTaskTypeSummaryCard
            gitTaskConfigurationData={wrapGitTaskType(branchToBranchGitTaskConfigurationMetadata)}
            gitTasksData={gitTasksData}
          />
        );
      case "ecs_cluster_creation":
        return (
          <ECSCreationTaskTypeSummaryCard
            gitTaskConfigurationData={wrapGitTaskType(ec2ClusterCreationTaskConfigurationMetadata)}
            gitTasksData={gitTasksData}
          />
        );
      case "ecs_service_creation":
        return (
          <ECSServiceCreationTaskTypeSummaryCard
            gitTaskConfigurationData={wrapGitTaskType(ec2ServiceCreationTaskConfigurationMetadata)}
            gitTasksData={gitTasksData}
          />
        );
      case "lambda_function_creation":
        return (
          <AwsLambdaTaskTypeSummaryCard
            gitTaskConfigurationData={wrapGitTaskType(awsLambdaFunctionTaskConfigurationMetadata)}
            gitTasksData={gitTasksData}
          />
        );
      default:
        return (<div>No type is associated with this Task</div>);
    }
  };

  if (gitTasksData == null || accessRoleData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <GitTaskSummaryPanelBase
      gitTasksData={gitTasksData}
      setActiveTab={setActiveTab}
      gitTaskTypeSummaryCard={getTaskTypeSummaryPanel()}
      setGitTasksData={setGitTasksData}
      accessRoleData={accessRoleData}
      loadData={loadData}
    />
  );
}

TaskSummaryPanel.propTypes = {
  gitTasksData: PropTypes.object,
  setActiveTab: PropTypes.func,
  setGitTasksData: PropTypes.func,
  loadData: PropTypes.func,
  accessRoleData: PropTypes.object
};

export default TaskSummaryPanel;