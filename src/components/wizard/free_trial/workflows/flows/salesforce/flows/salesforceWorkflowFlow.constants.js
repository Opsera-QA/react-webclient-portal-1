import { constantsHelper } from "temp-library-components/helpers/constants/constants.helper";

export const salesforceWorkflowFlowConstants = {};

salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS = {
  SALESFORCE_ORGANIZATION_SYNC: "salesforce_organization_sync",
  SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING: "salesforce_organization_sync_with_unit_testing",
  SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP: "salesforce_organization_sync_with_unit_testing_and_backup",
  SALESFORCE_ORGANIZATION_SYNC_TASK: "salesforce_organization_sync_task",
  SALESFORCE_PROFILE_MIGRATION: "salesforce_profile_migration",
  SALESFORCE_PROFILE_MIGRATION_ORGANIZATION_SYNC: "salesforce_profile_migration_organization_sync",
  SALESFORCE_TO_GIT_MERGE_SYNC: "salesforce_to_git_merge_sync",
};

salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS = {
  SALESFORCE_ORGANIZATION_SYNC: "Salesforce Organization Sync: Basic",
  SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING: "Salesforce Organization Sync: Include Unit Testing",
  SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP: "Salesforce Organization Sync: Include Unit Testing and Backup Option",
  SALESFORCE_ORGANIZATION_SYNC_TASK: "Salesforce Organization Sync Task",
  SALESFORCE_PROFILE_MIGRATION: "Salesforce Profile Migration: Basic",
  SALESFORCE_PROFILE_MIGRATION_ORGANIZATION_SYNC: "Salesforce Profile Migration: Organization Sync",
  SALESFORCE_TO_GIT_MERGE_SYNC: "Salesforce to Git Merge Sync",
};

salesforceWorkflowFlowConstants.isSalesforceFlowValid = (potentialValue) => {
  return constantsHelper.isValueValid(salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS, potentialValue);
};

salesforceWorkflowFlowConstants.getLabelForSalesforceFlow = (flow) => {
  return constantsHelper.getLabelForValue(
    salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS,
    salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS,
    flow,
  );
};

salesforceWorkflowFlowConstants.getSelectOptionForWorkspaceType = (flow) => {
  if (salesforceWorkflowFlowConstants.isSalesforceFlowValid(flow) !== true) {
    return null;
  }

  return ({
    text: salesforceWorkflowFlowConstants.getLabelForSalesforceFlow(flow),
    value: flow,
  });
};