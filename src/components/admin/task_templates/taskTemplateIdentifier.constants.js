import constantsHelper from "@opsera/definitions/constants/constants.helper";

export const taskTemplateIdentifierConstants = {};

taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIERS = {
  FREE_TRIAL_ORGANIZATION_SYNC_TASK: "free-trial-organization-sync-task",
  FREE_TRIAL_GIT_CUSTODIAN: "free-trial-git-custodian-task",
  FREE_TRIAL_SALESFORCE_TO_GIT_MERGE_SYNC_TASK: "free-trial-salesforce-to-git-merge-sync-task",
  SALESFORCE_CERTIFICATE_GENERATION: "sfdc-cert-gen",
  SYNC_SALESFORCE_BRANCH_STRUCTURE: "sync-branch-structure",
  SALESFORCE_QUICK_DEPLOY: "sfdc_quick_deploy",
  SALESFORCE_BULK_MIGRATION: "sfdc-bulk-migration",
  SALESFORCE_TO_GIT_MERGE_SYNC_TASK: "salesforce-to-git-merge-sync-task",
};

taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIER_LABELS = {
  FREE_TRIAL_ORGANIZATION_SYNC_TASK: "Salesforce Organization Sync Task",
  FREE_TRIAL_GIT_CUSTODIAN: "Git Custodian Task",
  FREE_TRIAL_SALESFORCE_TO_GIT_MERGE_SYNC_TASK: "Salesforce to Git Merge Sync Task",
  SALESFORCE_CERTIFICATE_GENERATION: "Salesforce DX Certificate Generation",
  SYNC_SALESFORCE_BRANCH_STRUCTURE: "Salesforce Branch Structuring",
  SALESFORCE_QUICK_DEPLOY: "Salesforce Quick Deploy",
  SALESFORCE_BULK_MIGRATION: "Salesforce Bulk Migration",
  SALESFORCE_TO_GIT_MERGE_SYNC_TASK: "Salesforce to Git Merge Sync Task",

};

taskTemplateIdentifierConstants.getLabelForTaskTemplateIdentifier = (workspaceIdentifier) => {
  return constantsHelper.getLabelForValue(
    taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIERS,
    taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIER_LABELS,
    workspaceIdentifier,
  );
};