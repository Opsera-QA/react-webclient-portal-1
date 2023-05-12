import React from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { hasStringValue } from "../common/helpers/string-helpers";
import {
  salesforceWorkflowFlowConstants,
} from "../wizard/portal/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { ReactLoggingHandler } from "temp-library-components/handler/reactLogging.handler";
import {TASK_TYPES} from "./task.types";

export const SalesforceTaskHelper = {};

// TODO: We shouldn't have to do this and instead should be setting fields directly on the models
SalesforceTaskHelper.configureSalesforceOrganizationSyncTask = (
  task,
  flow,
  salesforceToolId,
  gitToolId,
  gitToolOption,
  jenkinsToolId
) => {
  const parsedTask = DataParsingHelper.parseObject(task);

  if (!parsedTask) {
    throw ReactLoggingHandler.logErrorMessage(
      "salesforceTaskWizard",
      "configureSalesforceOrganizationSyncTask",
      "Cannot configure Organization Sync Task:",
      "Did not include the task to configure",
    );
  }

  if (isMongoDbId(salesforceToolId) !== true) {
    throw ReactLoggingHandler.logErrorMessage(
      "salesforceTaskWizard",
      "configureSalesforceOrganizationSyncTask",
      "Cannot configure Organization Sync Task:",
      "Invalid Salesforce Tool ID given",
    );
  }

  if (isMongoDbId(jenkinsToolId) !== true) {
    throw ReactLoggingHandler.logErrorMessage(
        "salesforceTaskWizard",
        "configureSalesforceOrganizationSyncTask",
        "Cannot configure Organization Sync Task:",
        "Invalid Jenkins Tool ID given",
    );
  }
  //
  // if (isMongoDbId(gitToolId) !== true) {
  //   throw ReactLoggingHandler.logErrorMessage(
  //     "salesforceTaskWizard",
  //     "configureSalesforceOrganizationSyncTask",
  //     "Cannot configure Organization Sync Task:",
  //     "The Git Tool ID was invalid",
  //   );
  // }

  let updatedTask = SalesforceTaskHelper.updateSfdcToolIdForSalesforceTask(task, salesforceToolId, flow);
  // updatedTask = SalesforceTaskHelper.updateGitToolIdForSalesforceTask(updatedTask, gitToolId, gitToolOption, flow, gitToolModel);
  updatedTask = SalesforceTaskHelper.updateJenkinsToolIdForSalesforceTask(updatedTask, jenkinsToolId, flow);
  return updatedTask;
};

// TODO: We shouldn't have to do this and instead should be setting fields directly on the models
SalesforceTaskHelper.configureSalesforceToGitMergeSyncTask = (
  task,
  flow,
  salesforceToolId,
  gitToolId,
  gitToolOption,
) => {
  const parsedTask = DataParsingHelper.parseObject(task);

  if (!parsedTask) {
    throw ReactLoggingHandler.logErrorMessage(
      "salesforceTaskWizard",
      "configureSalesforceToGitMergeSyncTask",
      "Cannot configure Salesforce to Git Merge Sync Task:",
      "Did not include the task to configure",
    );
  }

  if (isMongoDbId(gitToolId) !== true) {
    throw ReactLoggingHandler.logErrorMessage(
      "salesforceTaskWizard",
      "configureSalesforceToGitMergeSyncTask",
      "Cannot configure Salesforce to Git Merge Sync Task:",
      "Invalid Git Tool ID given",
    );
  }

  if (hasStringValue(gitToolOption) === false) {
    throw ReactLoggingHandler.logErrorMessage(
      "salesforceTaskWizard",
      "configureSalesforceToGitMergeSyncTask",
      "Cannot configure Salesforce to Git Merge Sync Task:",
      "Did not include the Git Service name",
    );
  }

  if (isMongoDbId(gitToolId) !== true) {
    throw ReactLoggingHandler.logErrorMessage(
      "salesforceTaskWizard",
      "configureSalesforceToGitMergeSyncTask",
      "Cannot configure Salesforce to Git Merge Sync Task:",
      "The Git Tool ID was invalid",
    );
  }

  if (isMongoDbId(salesforceToolId) !== true) {
    throw ReactLoggingHandler.logErrorMessage(
      "salesforceTaskWizard",
      "configureSalesforceToGitMergeSyncTask",
      "Cannot configure Salesforce to Git Merge Sync Task:",
      "The Salesforce Tool ID was invalid",
    );
  }

  let updatedTask = SalesforceTaskHelper.updateSfdcToolIdForSalesforceTask(task, salesforceToolId, flow);
  updatedTask = SalesforceTaskHelper.updateGitToolIdForSalesforceTask(updatedTask, gitToolId, gitToolOption, flow);
  return updatedTask;
};

// TODO: We shouldn't have to do this and instead should be setting fields directly on the models
SalesforceTaskHelper.configureSalesforceCertificateGenerationSyncTask = (
    task,
    flow,
    jenkinsToolId
) => {
  const parsedTask = DataParsingHelper.parseObject(task);

  if (!parsedTask) {
    throw ReactLoggingHandler.logErrorMessage(
        "salesforceTaskWizard",
        "configureSalesforceOrganizationSyncTask",
        "Cannot configure Organization Sync Task:",
        "Did not include the task to configure",
    );
  }

  if (isMongoDbId(jenkinsToolId) !== true) {
    throw ReactLoggingHandler.logErrorMessage(
        "salesforceTaskWizard",
        "configureSalesforceOrganizationSyncTask",
        "Cannot configure Organization Sync Task:",
        "Invalid Jenkins Tool ID given",
    );
  }

  let updatedTask = SalesforceTaskHelper.updateJenkinsToolIdForSalesforceTask(task, jenkinsToolId, flow);
  return updatedTask;
};

// TODO: We shouldn't have to do this and instead should be setting fields directly on the models
SalesforceTaskHelper.configureSalesforceBranchingStructureTask = (
    task,
    flow,
    salesforceToolId,
    gitToolId,
    gitToolOption,
    jenkinsToolId
) => {
  const parsedTask = DataParsingHelper.parseObject(task);

  if (!parsedTask) {
    throw ReactLoggingHandler.logErrorMessage(
        "salesforceTaskWizard",
        "configureSalesforceOrganizationSyncTask",
        "Cannot configure Organization Sync Task:",
        "Did not include the task to configure",
    );
  }

  if (isMongoDbId(gitToolId) !== true) {
    throw ReactLoggingHandler.logErrorMessage(
        "salesforceTaskWizard",
        "configureSalesforceOrganizationSyncTask",
        "Cannot configure Organization Sync Task:",
        "Invalid Git Tool ID given",
    );
  }

  if (hasStringValue(gitToolOption) === false) {
    throw ReactLoggingHandler.logErrorMessage(
        "salesforceTaskWizard",
        "configureSalesforceOrganizationSyncTask",
        "Cannot configure Organization Sync Task:",
        "Did not include the Git Service name",
    );
  }

  if (isMongoDbId(gitToolId) !== true) {
    throw ReactLoggingHandler.logErrorMessage(
        "salesforceTaskWizard",
        "configureSalesforceOrganizationSyncTask",
        "Cannot configure Organization Sync Task:",
        "The Git Tool ID was invalid",
    );
  }

  let updatedTask = SalesforceTaskHelper.updateSfdcToolIdForSalesforceTask(task, salesforceToolId, flow);
  updatedTask = SalesforceTaskHelper.updateGitToolIdForSalesforceTask(updatedTask, gitToolId, gitToolOption, flow);
  updatedTask = SalesforceTaskHelper.updateJenkinsToolIdForSalesforceTask(updatedTask, jenkinsToolId, flow);
  return updatedTask;
};


// TODO: We shouldn't have to do this and instead should be setting fields directly on the models
SalesforceTaskHelper.configureSalesforceBulkMigrationTask = (
    task,
    flow,
    salesforceToolId,
    gitToolId,
    gitToolOption,
    jenkinsToolId
) => {
  const parsedTask = DataParsingHelper.parseObject(task);

  if (!parsedTask) {
    throw ReactLoggingHandler.logErrorMessage(
        "salesforceTaskWizard",
        "configureSalesforceOrganizationSyncTask",
        "Cannot configure Organization Sync Task:",
        "Did not include the task to configure",
    );
  }

  if (isMongoDbId(jenkinsToolId) !== true) {
    throw ReactLoggingHandler.logErrorMessage(
        "salesforceTaskWizard",
        "configureSalesforceOrganizationSyncTask",
        "Cannot configure Organization Sync Task:",
        "Invalid Jenkins Tool ID given",
    );
  }

  // if (hasStringValue(gitToolOption) === false) {
  //   throw ReactLoggingHandler.logErrorMessage(
  //       "salesforceTaskWizard",
  //       "configureSalesforceOrganizationSyncTask",
  //       "Cannot configure Organization Sync Task:",
  //       "Did not include the Git Service name",
  //   );
  // }

  if (isMongoDbId(salesforceToolId) !== true) {
    throw ReactLoggingHandler.logErrorMessage(
        "salesforceTaskWizard",
        "configureSalesforceOrganizationSyncTask",
        "Cannot configure Organization Sync Task:",
        "The Salesforce Tool ID was invalid",
    );
  }

  let updatedTask = SalesforceTaskHelper.updateSfdcToolIdForSalesforceTask(task, salesforceToolId, flow);
  // updatedTask = SalesforceTaskHelper.updateGitToolIdForSalesforceTask(updatedTask, gitToolId, gitToolOption, flow,
  //     gitToolModel);
  updatedTask = SalesforceTaskHelper.updateJenkinsToolIdForSalesforceTask(updatedTask, jenkinsToolId, flow);
  return updatedTask;
};

// TODO: We shouldn't have to do this and instead should be setting fields directly on the models
SalesforceTaskHelper.configureSalesforceQuickDeployTask = (
    task,
    flow,
    salesforceToolId,
    sourceSalesforceToolModel
) => {
  const parsedTask = DataParsingHelper.parseObject(task);

  if (!parsedTask) {
    throw ReactLoggingHandler.logErrorMessage(
        "salesforceTaskWizard",
        "configureSalesforceOrganizationSyncTask",
        "Cannot configure Organization Sync Task:",
        "Did not include the task to configure",
    );
  }

  if (isMongoDbId(salesforceToolId) !== true) {
    throw ReactLoggingHandler.logErrorMessage(
        "salesforceTaskWizard",
        "configureSalesforceOrganizationSyncTask",
        "Cannot configure Organization Sync Task:",
        "Invalid Git Tool ID given",
    );
  }

  let updatedTask = SalesforceTaskHelper.updateSfdcToolIdForSalesforceTask(task, salesforceToolId, flow, sourceSalesforceToolModel);
  return updatedTask;
};

SalesforceTaskHelper.updateGitToolIdForSalesforceTask = (task, gitToolId, service, flow, gitToolModel) => {
  console.log(gitToolModel);
  if (isMongoDbId(gitToolId) !== true) {
    throw "Invalid Git Tool ID given";
  }

  if (hasStringValue(service) === false) {
    throw "Did not include a service.";
  }

  let updatedTask = { ...task };

  switch (flow) {
    case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_GIT_MERGE_SYNC:
      updatedTask.configuration.git.toolId = gitToolId;
      updatedTask.configuration.git.service = service;
      return updatedTask;
    case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_TASK:
      updatedTask.configuration.gitToolId = gitToolId;
      updatedTask.configuration.gitCredential = gitToolModel?.getData("name") ? gitToolModel?.getData("name") : gitToolId;
      updatedTask.configuration.service = service;
      updatedTask.tool_identifier = service;
      return updatedTask;
    case TASK_TYPES.SYNC_SALESFORCE_REPO:
    case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
    case TASK_TYPES.SALESFORCE_BULK_MIGRATION:
      updatedTask.configuration.gitToolId = gitToolId;
      updatedTask.configuration.gitCredential = gitToolModel?.getData("name")
        ? gitToolModel?.getData("name")
        : gitToolId;
      updatedTask.configuration.service = service;
      updatedTask.tool_identifier = service;
      return updatedTask;
    default:
      return task;
  }
};

SalesforceTaskHelper.updateSfdcToolIdForSalesforceTask = (task, salesforceToolId, flow, sourceSalesforceToolModel) => {
  if (isMongoDbId(salesforceToolId) !== true) {
    throw "Invalid Salesforce Tool ID given";
  }

  let updatedTask = { ...task };

  switch (flow) {
    case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_GIT_MERGE_SYNC:
      updatedTask.configuration.sfdc.sourceToolId = salesforceToolId;
      return updatedTask;
    case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_TASK:
      updatedTask.configuration.sfdcToolId = salesforceToolId;
      return updatedTask;
    case TASK_TYPES.SALESFORCE_QUICK_DEPLOY:
      updatedTask.configuration.sfdcToolId = salesforceToolId;
      updatedTask.configuration.accountUsername = sourceSalesforceToolModel?.getData("accountUsername");
      updatedTask.configuration.sfdcToolName = sourceSalesforceToolModel?.getData("sfdcToolName");
      return updatedTask;
    case TASK_TYPES.SYNC_SALESFORCE_REPO:
    case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
    case TASK_TYPES.SALESFORCE_BULK_MIGRATION:
      updatedTask.configuration.sfdcToolId = salesforceToolId;
      return updatedTask;
    default:
      return task;
  }
};

SalesforceTaskHelper.updateJenkinsToolIdForSalesforceTask = (task, jenkinsToolId, flow) => {
  if (isMongoDbId(jenkinsToolId) !== true) {
    throw "Invalid Salesforce Tool ID given";
  }

  let updatedTask = { ...task };

  switch (flow) {
    case TASK_TYPES.SYNC_SALESFORCE_REPO:
    case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
    case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
    case TASK_TYPES.SALESFORCE_BULK_MIGRATION:
      updatedTask.configuration.toolConfigId = jenkinsToolId;
      return updatedTask;
    default:
      return task;
  }
};
