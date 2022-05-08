// TODO: Keep this in line with Node's /src/metadata/tasks/tasks.types.js
import {
  mergeSyncTaskConfigurationMetadata
} from "components/tasks/details/tasks/merge_sync_task/mergeSyncTaskConfiguration.metadata";
import sfdxCertGenTaskConfigurationMetadata
  from "components/tasks/details/tasks/sfdx-cert-gen/sfdx-cert-gen-task-configuration-metadata";
import salesforceOrganizationSyncTaskConfigurationMetadata
  from "components/tasks/details/tasks/sfdc-org-sync/salesforceOrganizationSyncTaskConfigurationMetadata";
import sfdcGitBranchTaskConfigurationMetadata
  from "components/tasks/details/tasks/sfdc-branch-structure/sfdc-git-branch-structuring-task-configuration-metadata";
import {
  salesforceBulkMigrationTaskConfigurationMetadata
} from "components/tasks/details/tasks/sfdc-bulk-migration/salesforceBulkMigrationTaskConfigurationMetadata";
import salesforceQuickDeployTaskConfigurationMetadata
  from "components/tasks/details/tasks/sfdc-quick-deploy/salesforceQuickDeployTaskConfigurationMetadata";
import branchToBranchGitTaskConfigurationMetadata
  from "components/tasks/details/tasks/branch-to-branch/branch-to-branch-git-task-configuration";
import gitscraperTaskConfigurationMetadata from "components/tasks/details/tasks/gitscraper/gitscraper-metadata";
import ec2ClusterCreationTaskConfigurationMetadata
  from "components/tasks/details/tasks/ecs-cluster-creation/ecs-creation-git-task-configuration";
import awsLambdaFunctionTaskConfigurationMetadata
  from "components/tasks/details/tasks/aws-lambda-creation/aws-lambda-metadata";
import ec2ServiceCreationTaskConfigurationMetadata
  from "components/tasks/details/tasks/ecs-service-creation/ecs-service-creation-git-task-configuration";
import azureAksClusterTaskConfigurationMetadata
  from "components/tasks/details/tasks/azure-cluster-creation/azure-cluster-metadata";

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
    case TASK_TYPES.SALESFORCE_QUICK_DEPLOY:
      return TASK_TYPE_LABELS.SALESFORCE_QUICK_DEPLOY;

    // Merge Sync
    case TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC:
      return TASK_TYPE_LABELS.SALESFORCE_TO_GIT_MERGE_SYNC;
    case TASK_TYPES.GIT_TO_GIT_MERGE_SYNC:
      return TASK_TYPE_LABELS.GIT_TO_GIT_MERGE_SYNC;

    // Git
    case TASK_TYPES.SYNC_GIT_BRANCHES:
      return TASK_TYPE_LABELS.SYNC_GIT_BRANCHES;

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

export const getTaskConfigurationMetadataForTaskType = (taskType) => {
  switch (taskType) {
    case TASK_TYPES.SYNC_SALESFORCE_REPO:
      return salesforceOrganizationSyncTaskConfigurationMetadata;
    case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
      return sfdxCertGenTaskConfigurationMetadata;
    case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
      return sfdcGitBranchTaskConfigurationMetadata;
    case TASK_TYPES.SALESFORCE_BULK_MIGRATION:
      return salesforceBulkMigrationTaskConfigurationMetadata;
    case TASK_TYPES.SALESFORCE_QUICK_DEPLOY:
      return salesforceQuickDeployTaskConfigurationMetadata;


    // Merge Sync
    case TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC:
    case TASK_TYPES.GIT_TO_GIT_MERGE_SYNC:
      return mergeSyncTaskConfigurationMetadata;

    // Git
    case TASK_TYPES.SYNC_GIT_BRANCHES:
      return branchToBranchGitTaskConfigurationMetadata;
    case TASK_TYPES.GITSCRAPER:
      return gitscraperTaskConfigurationMetadata;

    // AWS
    case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
      return ec2ClusterCreationTaskConfigurationMetadata;
    case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
      return ec2ServiceCreationTaskConfigurationMetadata;
    case TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION:
      return awsLambdaFunctionTaskConfigurationMetadata;

    // Azure
    case TASK_TYPES.AZURE_CLUSTER_CREATION:
      return azureAksClusterTaskConfigurationMetadata;
    default:
      return taskType;
  }
};