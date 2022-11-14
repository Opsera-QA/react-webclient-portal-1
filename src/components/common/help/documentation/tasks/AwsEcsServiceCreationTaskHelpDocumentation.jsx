import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";
import { getTaskTypeLabel, TASK_TYPES } from "../../../../tasks/task.types";

function AwsEcsServiceCreationTaskHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer helpTopic={getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_SERVICE)} closeHelpPanel={closeHelpPanel}>
      <div>This workflow requires setup in both Tasks and Pipeline. Service Creation and deployment require the latest image URL in order to deploy. This is generated during pipeline runtime. The workflow is separated into two parts where the user enters certain static information in the Tasks page and then links the task to the respective Docker step in the pipeline. For more detailed information on the {getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_SERVICE)} Task including pipeline configuration, view the <a href="https://docs.opsera.io/aws-native-support/aws-ecs#setup-aws-ecs-service-creation-task" target="_blank" rel="noreferrer"><b>AWS ECS Service Creation Task Documentation</b>.</a> </div>
      <div className={"mt-2"}><h5>Task Setup Instructions:</h5></div>
      <ol>
        <li>Select <b>{getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_SERVICE)}</b> from the Type drop down. Once this has been selected, the following values will be fetched for selection:
          <ul>
            <li><b>AWS Tool</b> - Select an established AWS tool from the Tool Registry.</li>
            <li><b>Required Compatibility</b> - Select Fargate or EC2.</li>
            <li><b>Cluster Name</b> - Select a Cluster Name fetched from the AWS portal.</li>
            <li><b>Existing VPC</b> - Select an existing VPC from the list of values fetched from the AWS portal. </li>
            <li><b>Desired Count</b> -  Select the amount of deployments desired.</li>
            <li><b>Load Balancer ARN</b> - Select a Load Balancer ARN from the list of values fetched from the AWS portal.</li>
            <li><b>Execution Role ARN</b> - Select a Load Balancer ARN from the list of values fetched from the AWS portal.</li>
            <li><b>Subnets</b> - Select 2 subnets from list of values fetched from the AWS portal. </li>
          </ul></li>
        <li> Select <b>Save</b> to create a template.</li>
      </ol>
      <div className={"mt-2"}>Once the task has been created, it can be linked to a Docker step in the pipeline.  </div>
    </HelpDocumentationContainer>
  );
}

AwsEcsServiceCreationTaskHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(AwsEcsServiceCreationTaskHelpDocumentation);