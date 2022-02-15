import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {getTaskTypeLabel, TASK_TYPES} from "../../../../../tasks/task.types";


function AzureAKSClusterCreationTaskDetailsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
      The {getTaskTypeLabel(TASK_TYPES.AZURE_CLUSTER_CREATION)} Functionality allows you to deploy images to the Azure cluster through Opsera pipelines. This workflow requires setup in both Tasks and Opsera Pipelines. Template creation is a prerequisite to creating the cluster. Once the template has been created in Opsera Tasks, you must select <b>Run Task</b> for the first cluster to be created in Azure. It can then be accessed in the Azure AKS Deploy pipeline step to deploy images to the Azure cluster. For more detailed information on the Azure AKS Functionality including pipeline setup, view the <a href="https://opsera.atlassian.net/l/c/sFZ1m56B" target="_blank" rel="noreferrer"><b>Azure AKS Functionality Help Documentation</b>.</a>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Azure AKS Cluster Creation Task Details"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(AzureAKSClusterCreationTaskDetailsHelpDocumentation);