import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function AwsEcsClusterCreationTaskHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer helpTopic={"AWS ECS Cluster Creation"} closeHelpPanel={closeHelpPanel}>
      <div className={"mb-1"}>When creating an AWS ECS Cluster, it is important to know the correct values in order to create a cluster. It is a nuanced operation and the chances for failures are high unless the user is experienced with AWS infrastructure creation. There are 2 steps to cluster creation. Template creation is a prerequisite to creating the cluster. Once the template has been created, you must select <b>Run Task</b> for the first cluster to be created.</div>
      <div className={"mt-2"}><h5>Task Setup Instructions:</h5></div>
      <ol>
        <li>Select <b>Create AWS ECS Cluster</b> from the Type drop down. Once this has been selected, the following values will be fetched for selection:
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