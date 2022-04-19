// TODO: Keep this in line with Node's /src/metadata/tasks/tasks.types.js
export const TASK_TYPES = {
  // Salesforce
  SYNC_SALESFORCE_REPO: "sync-sfdc-repo",
  SALESFORCE_CERTIFICATE_GENERATION: "sfdc-cert-gen",
  SYNC_SALESFORCE_BRANCH_STRUCTURE: "sync-branch-structure",
  SALESFORCE_BULK_MIGRATION: "sfdc-bulk-migration",
  SALESFORCE_TO_GIT_MERGE_SYNC: "SFDC_GIT_COMPARE_SYNC",
  SALESFORCE_QUICK_DEPLOY: "sfdc_quick_deploy",

  //Git
  SYNC_GIT_BRANCHES: "sync-git-branches",
  GIT_TO_GIT_MERGE_SYNC: "GIT_VS_GIT_SYNC",
  GITSCRAPER: "gitscraper",

  //AWS
  AWS_CREATE_ECS_CLUSTER: "ecs_cluster_creation",
  AWS_CREATE_ECS_SERVICE: "ecs_service_creation",
  AWS_CREATE_LAMBDA_FUNCTION: "lambda_function_creation",

  //AZURE
  AZURE_CLUSTER_CREATION: "azure_cluster_creation",
};

export const TASK_TYPE_LABELS = {
  // Salesforce
  SYNC_SALESFORCE_REPO: "Salesforce Organization Sync",
  SALESFORCE_CERTIFICATE_GENERATION: "Salesforce DX Certificate Generation",
  SYNC_SALESFORCE_BRANCH_STRUCTURE: "Salesforce Branch Structuring",
  SALESFORCE_BULK_MIGRATION: "Salesforce Bulk Migration",
  SALESFORCE_TO_GIT_MERGE_SYNC: "Salesforce to Git Merge Sync",
  SALESFORCE_QUICK_DEPLOY: "Salesforce Quick Deploy",

  // Git
  SYNC_GIT_BRANCHES: "Git to Git Sync",
  GIT_TO_GIT_MERGE_SYNC: "Git to Git Merge Sync",
  GITSCRAPER: "Gitscraper Scan",

  // AWS
  AWS_CREATE_ECS_CLUSTER: "AWS ECS Cluster Creation",
  AWS_CREATE_ECS_SERVICE: "AWS ECS Service Creation",
  AWS_CREATE_LAMBDA_FUNCTION: "AWS Lambda Function Creation",

  // Azure
  AZURE_CLUSTER_CREATION: "Azure AKS Cluster Creation",
};

export const getTaskTypeLabel = (taskType) => {
  switch (taskType) {
    // Salesforce
    case TASK_TYPES.SYNC_SALESFORCE_REPO:
      return TASK_TYPE_LABELS.SYNC_SALESFORCE_REPO;
    case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
      return TASK_TYPE_LABELS.SALESFORCE_CERTIFICATE_GENERATION;
    case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
      return TASK_TYPE_LABELS.SYNC_SALESFORCE_BRANCH_STRUCTURE;
    case TASK_TYPES.SALESFORCE_BULK_MIGRATION:
      return TASK_TYPE_LABELS.SALESFORCE_BULK_MIGRATION;
    case TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC:
      return TASK_TYPE_LABELS.SALESFORCE_TO_GIT_MERGE_SYNC;
    case TASK_TYPES.SALESFORCE_QUICK_DEPLOY:
      return TASK_TYPE_LABELS.SALESFORCE_QUICK_DEPLOY;

    // Git
    case TASK_TYPES.SYNC_GIT_BRANCHES:
      return TASK_TYPE_LABELS.SYNC_GIT_BRANCHES;
    case TASK_TYPES.GIT_TO_GIT_MERGE_SYNC:
      return TASK_TYPE_LABELS.GIT_TO_GIT_MERGE_SYNC;
    case TASK_TYPES.GITSCRAPER:
      return TASK_TYPE_LABELS.GITSCRAPER;

    // AWS
    case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
      return TASK_TYPE_LABELS.AWS_CREATE_ECS_CLUSTER;
    case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
      return TASK_TYPE_LABELS.AWS_CREATE_ECS_SERVICE;
    case TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION:
      return TASK_TYPE_LABELS.AWS_CREATE_LAMBDA_FUNCTION;

    // Azure
    case TASK_TYPES.AZURE_CLUSTER_CREATION:
      return TASK_TYPE_LABELS.AZURE_CLUSTER_CREATION;
    default:
      return taskType;
  }
};