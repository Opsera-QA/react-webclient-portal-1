import React from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "../common/helpers/string-helpers";
import {
  salesforceWorkflowFlowConstants
} from "../wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";

export const taskHelper = {};

taskHelper.getDetailViewLink = (taskId) => {
  if (isMongoDbId(taskId) !== true) {
    return null;
  }

  return `/task/details/${taskId}`;
};

// TODO: We shouldn't have to do this and instead should be setting fields directly on the models
taskHelper.configureSalesforceOrganizationSyncTask = (
  task,
  flow,
  salesforceToolId,
  gitToolId,
  gitToolOption,
  ) => {
  let updatedTask = taskHelper.updateSfdcToolIdForSalesforceTask(task, salesforceToolId, flow);
  updatedTask = taskHelper.updateGitToolIdForSalesforceTask(updatedTask, gitToolId, gitToolOption, flow);
  return updatedTask;
};

taskHelper.updateGitToolIdForSalesforceTask = (task, gitToolId, service, flow) => {

  if (isMongoDbId(gitToolId) !== true && gitToolId !== "") {
    throw "Invalid Git Tool ID given";
  }

  if (hasStringValue(service) === false) {
    throw "Did not include a service.";
  }

  let updatedTask = {...task};

  switch (flow) {
    case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_GIT_MERGE_SYNC :
      updatedTask.configuration.git.toolId = gitToolId;
      updatedTask.configuration.git.service = service;
      return updatedTask;
    case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_TASK :
      updatedTask.configuration.gitToolId = gitToolId;
      updatedTask.configuration.gitCredential = gitToolId;
      updatedTask.configuration.service = service;
      updatedTask.tool_identifier = service;
      return updatedTask;
    default :
      return task;
  }
};

taskHelper.updateSfdcToolIdForSalesforceTask = (task, salesforceToolId, flow) => {

  if (isMongoDbId(salesforceToolId) !== true && salesforceToolId !== "") {
    throw "Invalid Git Tool ID given";
  }

  let updatedTask = {...task};

  switch (flow) {
    case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_GIT_MERGE_SYNC :
      updatedTask.configuration.sfdc.toolId = salesforceToolId;
      return updatedTask;
    case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_TASK :
      updatedTask.configuration.sfdcToolId = salesforceToolId;
      return updatedTask;
    default :
      return task;
  }
};

