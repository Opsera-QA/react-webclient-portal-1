export const TASK_TYPES = {
  SYNC_SALESFORCE_REPO: "sync-sfdc-repo",
  SALESFORCE_CERTIFICATE_GENERATION: "sfdc-cert-gen",
  SYNC_SALESFORCE_BRANCH_STRUCTURE: "sync-branch-structure",
  SYNC_GIT_BRANCHES: "sync-git-branches",
  AWS_CREATE_ECS_CLUSTER: "ecs_cluster_creation",
  AWS_CREATE_ECS_SERVICE: "ecs_service_creation",
  AWS_CREATE_LAMBDA_FUNCTION: "lambda_function_creation",
  AZURE_CLUSTER_CREATION: "azure_cluster_creation",
};

export const TASK_TYPE_LABELS = {
  SYNC_SALESFORCE_REPO: "Salesforce: Organization Sync",
  SALESFORCE_CERTIFICATE_GENERATION: "Salesforce: Generate Certificate for SFDX",
  SYNC_SALESFORCE_BRANCH_STRUCTURE: "Salesforce: Branch Structuring",
  SYNC_GIT_BRANCHES: "Git: Git to Git Sync",
  AWS_CREATE_ECS_CLUSTER: "AWS: Create ECS Cluster",
  AWS_CREATE_ECS_SERVICE: "AWS: Create ECS Service",
  AWS_CREATE_LAMBDA_FUNCTION: "AWS: Create Lambda Function",
  AZURE_CLUSTER_CREATION: "Azure: Create AKS Cluster",
};

export const getTaskTypeLabel = (taskType) => {
  switch (taskType) {
    case TASK_TYPES.SYNC_SALESFORCE_REPO:
      return TASK_TYPE_LABELS.SYNC_SALESFORCE_REPO;
        case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
      return TASK_TYPE_LABELS.SALESFORCE_CERTIFICATE_GENERATION;
        case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
      return TASK_TYPE_LABELS.SYNC_SALESFORCE_BRANCH_STRUCTURE;
        case TASK_TYPES.SYNC_GIT_BRANCHES:
      return TASK_TYPE_LABELS.SYNC_GIT_BRANCHES;
        case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
      return TASK_TYPE_LABELS.AWS_CREATE_ECS_CLUSTER;
        case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
      return TASK_TYPE_LABELS.AWS_CREATE_ECS_SERVICE;
        case TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION:
      return TASK_TYPE_LABELS.AWS_CREATE_LAMBDA_FUNCTION;
        case TASK_TYPES.AZURE_CLUSTER_CREATION:
      return TASK_TYPE_LABELS.AZURE_CLUSTER_CREATION;
    default:
      return "";
  }
};