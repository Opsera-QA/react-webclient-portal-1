import React, { useEffect, useState } from "react";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import taskActions from "components/tasks/task.actions";
import tasksMetadata from "components/tasks/details/tasks/task-metadata";

export default function CreateWorkflowWizardTaskInitializationScreen(
  {
    type,
    setTaskFunction,
    templateIdentifier,
  }) {
  const [status, setStatus] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    getAccessToken,
    cancelTokenSource,
    isMounted,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    initializeSalesforceTaskTemplate().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);


  const initializeSalesforceTaskTemplate = async () => {
    try {
      setStatus(buttonLabelHelper.BUTTON_STATES.BUSY);
      // TODO: Lookup via task template identifier when implemented
      // const response = await pipelineActions.deployTemplateV2(
      //   getAccessToken,
      //   cancelTokenSource,
      //   // templateId,
      //   templateIdentifier, // TODO: how to dynamically pull this?
      // );

      // template for org-sync task
      const template = {
        "name" : "Freetrial : Sync Org Task",
        "description" : "",
        "type" : "sync-sfdc-repo",
        "tool_identifier" : "",
        "active" : true,
        "status" : "created",
        "configuration" : {
          "type" : "",
          "jobType" : "SFDC_GIT_SYNC",
          "toolConfigId" : "60c307fb5ac28205e841343b", // this is hardcoded, TODO make it more dynamic
          "autoScaleEnable" : false,
          "jobName" : "",
          "projectId" : "",
          "buildType" : "ant",
          "gitToolId" : "",
          "gitUrl" : "",
          "sshUrl" : "",
          "service" : "",
          "workspace" : "",
          "repository" : "",
          "gitBranch" : "",
          "sourceBranch" : "",
          "defaultBranch" : "",
          "dependencyType" : "",
          "sfdcToolId" : "",
        }
      };

      const newTaskTemplateModel = modelHelpers.parseObjectIntoModel(template, tasksMetadata);
      const response = await taskActions.createTaskV2(getAccessToken, cancelTokenSource, newTaskTemplateModel);
      const newTask = response?.data;

      if (isMongoDbId(newTask?._id)) {
        setStatus(buttonLabelHelper.BUTTON_STATES.SUCCESS);
        setTaskFunction(newTask);
      }
    }
    catch (error) {
      if (isMounted.current === true) {
        setStatus(buttonLabelHelper.BUTTON_STATES.ERROR);
        toastContext.showInlineErrorMessage(error, `Error Initializing ${type} Workflow:`);
      }
    }
  };

  const getLabel = () => {
    return buttonLabelHelper.getLabelForStatus(
      status,
      `Initializing ${type} Workflow`,
      `Initializing ${type} Workflow`,
      `Initialized ${type} Workflow!`,
      `Error Initializing ${type} Workflow!`,
    );
  };

  if (setTaskFunction == null) {
    return null;
  }

  return (
    <div>
      <CenterLoadingIndicator customMessage={getLabel()} />
    </div>
  );
}

CreateWorkflowWizardTaskInitializationScreen.propTypes = {
  type: PropTypes.string,
  setTaskFunction: PropTypes.func,
  templateIdentifier: PropTypes.string,
};

