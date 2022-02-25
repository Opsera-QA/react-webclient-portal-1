import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {getTaskTypeLabel, TASK_TYPES} from "../../../../../tasks/task.types";


function AwsEcsServiceCreationTaskDetailsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div className={"ml-2"}>
        <div>Create Amazon Elastic Container Service to integrate tasks and management, then publish the containers through Opsera pipelines. {getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_SERVICE)} workflow requires setup in both Tasks and Pipeline. Service Creation and deployment require the latest image URL in order to deploy. This is generated during pipeline runtime. The workflow is separated into 2 parts in which the user enters certain static information in the Tasks page and then links the task to the respective Docker step in the pipeline. For more detailed information on the {getTaskTypeLabel(TASK_TYPES.AWS_CREATE_ECS_SERVICE)} Task including pipeline configuration, view the <a href="https://opsera.atlassian.net/l/c/YKypTA2E" target="_blank" rel="noreferrer"><b>AWS ECS Service Creation Task Documentation</b>.</a></div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"AWS ECS Service Creation Task Details"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(AwsEcsServiceCreationTaskDetailsHelpDocumentation);