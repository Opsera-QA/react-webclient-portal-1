import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {getTaskTypeLabel, TASK_TYPES} from "../../../../tasks/task.types";


function TasksHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>Create and manage the following Opsera related tasks. To view in depth documentation on Opsera Tasks Management view the <b><a href="https://opsera.atlassian.net/l/c/cd5ujPjA" target="_blank" rel="noreferrer">Opsera Task Management Help Documentation</a></b> or click the task below for a link to individual task help documentation.
        <div className={"mt-2 ml-3"}>
          <h5>Opsera Tasks</h5>
          <div>
            <ul style={{listStyleType: "none"}}>
              <li><b><a href="https://opsera.atlassian.net/l/c/bfaswunv" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_CLUSTER)}</a></b> - Create an AWS ECS Cluster template and run the task to create a cluster.</li>
              <li><b><a href="https://opsera.atlassian.net/l/c/xsDLErWs" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_SERVICE)}</a></b> - Create Amazon Elastic Container Service to integrate tasks and management, then publish the containers through Opsera pipelines. </li>
              <li><b><a href="https://opsera.atlassian.net/l/c/9hB3DPfP" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION)}</a></b> - Create an AWS Lambda Function template and run the task to create a cluster. </li>
              <li><b><a href="https://opsera.atlassian.net/l/c/p1D1mnbo" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.AZURE_CLUSTER_CREATION)}</a></b> - Create an AKS Azure Cluster template and run the task to create a cluster. </li>
              <li><b><a href="https://opsera.atlassian.net/l/c/dqYyf13n" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.SYNC_GIT_BRANCHES)}</a></b> - Use this task to sync up between 2 different Git branches and merge the changes. The resulting Merge Request can be configured to be approved by set of approvers before Merging. </li>
              <li><b>{getTaskTypeLabel(TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE)}</b> - Convert the Salesforce metadata components available in Git Branch from Ant to SFDX format or vice versa.</li>
              <li><b><a href="https://opsera.atlassian.net/l/c/8X7xNseS" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.SYNC_SALESFORCE_REPO)}</a></b> - Create and configure the Salesforce Organization Sync task to sync the changes in Salesforce Org with the configured Git branch. </li>
              <li><b><a href="https://opsera.atlassian.net/l/c/GKoC01mX" target="_blank" rel="noreferrer">{getTaskTypeLabel(TASK_TYPES.SALESFORCE_BULK_MIGRATION)}</a></b> - Migrate the entire SFDC org metadata components to a GIT repository branch.</li>
            </ul>
          </div>
        </div>
      </div>

    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Opsera Tasks"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(TasksHelpDocumentation);