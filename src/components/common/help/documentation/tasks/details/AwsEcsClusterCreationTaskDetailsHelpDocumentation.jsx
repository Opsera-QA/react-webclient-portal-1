import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {getTaskTypeLabel, TASK_TYPES} from "../../../../../tasks/task.types";


function AwsEcsClusterCreationTaskDetailsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div className={"ml-2"}>
        <div>There are 2 steps to {getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_CLUSTER)}: Creating an {getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_CLUSTER)} Task template then running the task in order to create a cluster in AWS. Setup requires experience with AWS infrastructure creation. Once the template has been created, select <b>Run Task</b> for the first cluster to be created. If the Activity Logs indicate that cluster creation was successful, the cluster has been created in AWS and the task can be linked to a Docker step in a pipeline. To create a new cluster from an existing template, edit the Cluster Name, as AWS does not support creating 2 clusters with the same name. For more detailed information on the {getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_CLUSTER)} Task including pipeline configuration, view the <a href="https://opsera.atlassian.net/l/c/Zxrv21tU" target="_blank" rel="noreferrer"><b>AWS ECS Cluster Creation Task Documentation</b>.</a> </div>

      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"AWS ECS Cluster Creation Task Details"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(AwsEcsClusterCreationTaskDetailsHelpDocumentation);