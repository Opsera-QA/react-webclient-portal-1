import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function AwsEcsClusterCreationTaskHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer helpTopic={"AWS ECS Cluster"} closeHelpPanel={closeHelpPanel}>
      <div className={"ml-2 mt-2"}>When creating an AWS ECS Cluster, it is important to know the correct values to enter. The chance for failure is high unless the user is experienced with AWS infrastructure creation. Template creation is a prerequisite to creating the cluster. Once the template has been created, you must select <b>Run Task</b> for the first cluster to be created. Select the following values:
          <div className={"mt-2"}>
            <ul>
              <li><b>Type</b> - Select <b>Create AWS ECS Cluster</b> from the Type drop down menu.</li>
              <li><b>AWS Tool</b> - The drop down will provide <b>AWS Account</b> tools from the Opsera Tool Registry.</li>
              <li><b>Cluster Template</b> - Select <b>Networking</b> or <b>EC2</b>.</li>
              <li><b>Cluster Name</b> - Choose a name for the cluster.</li>
              <li><b>Image Type</b> - Select Windows or Linux/Unix</li>
              <li><b>Create VPC</b> - Either use an existing VPC or create new VPC by enabling the toggle. If creating a new VPC, give values to the given fields. In the AWS portal, view your default VPC and subnets using the Amazon VPC console or the command line. Open the <a href="https://console.aws.amazon.com/vpc" target="_blank" rel="noreferrer">Amazon VPC Console</a> and in the navigation pane, choose Your VPCs.</li>
              <li><b>EC2 Instance Type</b></li>
              <li><b>Key Pair</b> - Found in EC2</li>
              <li><b>VPC CIDR Block</b></li>
              <li><b>Public Subnet CIDR 1</b> - View your subnets using the Amazon VPC console or the command line.</li>
              <li><b>Public Subnet CIDR 2</b> - View your subnets using the Amazon VPC console or the command line.</li>
              <li><b>Private Subnet CIDR 1</b> - View your subnets using the Amazon VPC console or the command line.</li>
              <li><b>Private Subnet CIDR 2</b> - View your subnets using the Amazon VPC console or the command line.</li>
              <li><b>Security Group</b> - Found in EC2</li>
            </ul>
            <div>Select <b>Create</b> to save. A template in the tasks tab has now been created.</div>
            <div>To create a new cluster, select <b>Run Task</b> to trigger the creation.</div>
          </div>
          <div className={"mt-2"}>
            <div>Once the task and cluster have been created, the task can be linked to a Docker step in the pipeline.</div>
            <div>View Activity logs to view any data, including any errors, from the microservice. These are automatically refreshed.</div>
            <div>To create a new cluster, you must change the Cluster Name, as AWS does not support creating 2 clusters with the same name and configuration. This can be done by clicking the cog wheel icon on the top right of the tasks container.</div>
            <div>To edit existing templates, click on the cog wheel icon and edit the values</div>
          </div>
      </div>
    </HelpDocumentationContainer>
  );
}

AwsEcsClusterCreationTaskHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};


export default React.memo(AwsEcsClusterCreationTaskHelpDocumentation);