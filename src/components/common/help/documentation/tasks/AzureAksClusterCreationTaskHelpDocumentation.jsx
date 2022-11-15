import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";
import { getTaskTypeLabel, TASK_TYPES } from "../../../../tasks/task.types";

function AzureAksClusterCreationTaskHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer helpTopic={getTaskTypeLabel(TASK_TYPES.AZURE_CLUSTER_CREATION)} closeHelpPanel={closeHelpPanel}>
      <div>This workflow requires setup in both Tasks and Opsera Pipelines. The workflow is separated into two parts where the user enters certain static information in the Tasks page and then links the task to the respective step in the pipeline.  Template creation is a prerequisite to creating the cluster. Once the template has been created, you must select <b>Run Task</b> for the first cluster to be created in Azure and for it to be accessed in the Azure pipeline step. For more detailed information on the Azure AKS Functionality including pipeline setup, view the <a href="https://docs.opsera.io/azure-native-support/azure-aks-cluster-creation-tasks-documentation" target="_blank" rel="noreferrer"><b>Azure AKS Functionality Help Documentation</b>.</a></div>
      <div className={"mt-2"}><h5>Task Setup Instructions:</h5></div>
      <ol>
        <li>Select <b>{getTaskTypeLabel(TASK_TYPES.AZURE_CLUSTER_CREATION)}</b> from the Type drop down. Once this has been selected, the following values will be available for selection:
          <ul>
            <li className={"mt-1"}><b>Azure Tool</b> - Select an established Azure tool from the Tool Registry.</li>
            <li><b>Azure Credential</b> - This field is fetched from Applications tab of the selected Azure tool.</li>
            <li><b>Azure Region</b> - The region selected is the location of the data center where the resources will operate. In selecting a region, consider that the region is close in proximity to customer (if necessary) and that it will meet all necessary legal or compliance needs.</li>
            <li><b>Machine Type</b> - Select the name of the desired virtual machine size.</li>
            <li><b>Azure Kubernetes Version</b> - Select the Kubernetes version. The default version will display for the region selected.</li>
            <li><b>Cluster Name</b> - Choose a unique name for the Azure cluster. Refer to this name in the pipeline setup.</li>
            <li><b>Disk Size</b> - Select the disk size for template. Disk size is in GB and ranges from 32-1000.</li>
            <li><b>Minimum Nodes</b> - Choose a minimum number of nodes.</li>
            <li><b>Maximum Nodes</b> - Choose a maximum number of nodes.</li>
            <li><b>VPC CIDR Block</b> - Select an existing VPC CIDR Block from the Azure portal.</li>
            <li><b>Subnet CIDR Block</b> - Select an existing Subnet CIDR Block from the Azure portal.</li>
          </ul></li>
        <li>Select <b>Create</b> to save. A task template has now been created.</li>
      </ol>
      <div className={"mt-1"}><h5>Cluster Creation Instructions:</h5></div>
      <ol>
        <li>Select <b>Run Task</b> to trigger the cluster creation.</li>
        <li>View the Activity Logs in Task Details to view status and confirm that creation was successful.</li>
      </ol>
      <div>If the Activity Logs indicate that cluster creation is complete, cluster has been created and can be accessed in Azure.</div>
      <div>Once the Task and cluster have been created, the task can be linked to the Azure pipeline step.</div>
    </HelpDocumentationContainer>
  );
}

AzureAksClusterCreationTaskHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(AzureAksClusterCreationTaskHelpDocumentation);