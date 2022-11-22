import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";
import { TASK_TYPES, getTaskTypeLabel } from "components/tasks/task.types";

function AwsEcsClusterCreationTaskHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer helpTopic={getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_CLUSTER)} closeHelpPanel={closeHelpPanel}>
      <div className={"mb-1"}>When creating an ECS Cluster, it is important to know the correct values to enter. It is a nuanced operation and prior knowledge is essential. There are 2 steps to cluster creation including template creation. Once the template is created, you must select <b>Run Task</b>. If the Activity Logs indicate that cluster creation is successful, the cluster has been created in AWS and the task can be linked to a pipeline step. For more detailed information on the {getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_CLUSTER)} Task including pipeline configuration, view the <a href="https://docs.opsera.io/aws-native-support/aws-ecs#setup-aws-ecs-service-creation-task" target="_blank" rel="noreferrer"><b>AWS ECS Cluster Creation Task Documentation</b>.</a></div>
      <div className={"mt-2"}><h5>Task Setup Instructions:</h5></div>
      <ol>
        <li>Select <b>{getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_CLUSTER)}</b> from the Type drop down. Once this has been selected, the following values will be fetched for selection:
          <ul>
            <li><b>AWS Tool</b> - Select an established AWS tool from the Tool Registry.</li>
            <li><b>Cluster Template</b> - Select Networking/Fargate or EC2.</li>
            <li><b>Cluster Name</b> - Create a unique name for your cluster. </li>
            <li><b>Image Type</b> - Select Windows or Linux/Unix </li>
            <li><b>Create VPC</b> - Either use an existing VPC from the AWS VPC console or create a new one by enabling the toggle. </li>
            <li><b>EC2 Instance Type</b> - Select a value from the list fetched from the AWS portal. </li>
            <li><b>Key Pair</b> - Find this value in the AWS portal in EC2.</li>
            <li><b>Existing VPC</b> - Select an existing VPC from the list of values fetched from the AWS portal. </li>
            <li><b>Private Subnets</b> - Both subnets should be from different availability zones. Maximum 2 subnets preferred.</li>
            <li><b>Security Group</b> - Select a value from the list fetched from the AWS portal. </li>
          </ul></li>
        <li>Select <b>Create</b> to save. A task template has now been created.</li>
      </ol>
      <div className={"mt-1"}><h5>Cluster Creation Instructions:</h5></div>
      <ol>
        <li>Select <b>Run Task</b> to trigger the cluster creation.</li>
        <li>View the Activity Logs in Task Details to view status and confirm that creation was successful.</li>
      </ol>
      <div>If the Activity Logs indicate that cluster creation is complete, cluster has been created and can be accessed in AWS.</div>
      <div>To create a new cluster from an existing template, edit the Cluster Name, as AWS does not support creating 2 clusters with the same name.</div>
      <div>To edit an existing task template, click on the cog wheel icon.</div>
      <div>Once the Task and cluster have been created, the task can be linked to a Docker step in the pipeline.</div>
    </HelpDocumentationContainer>
  );
}

AwsEcsClusterCreationTaskHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(AwsEcsClusterCreationTaskHelpDocumentation);