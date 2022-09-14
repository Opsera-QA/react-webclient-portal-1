import { hasStringValue } from "components/common/helpers/string-helpers";
import { faAws, faGit, faGitAlt, faMicrosoft, faSalesforce } from "@fortawesome/free-brands-svg-icons";

// TODO: Rewrite to follow current standards
export const taskTypeConstants = {};

taskTypeConstants.getIconForTaskType = (taskType) => {
  if (hasStringValue(taskType) === false) {
    return null;
  }

  const category = taskTypeConstants.getTaskCategoryForType(taskType);

  switch (category) {
    case TASK_TYPE_CATEGORIES.SALESFORCE:
      return faSalesforce;
    case TASK_TYPE_CATEGORIES.GIT:
      return faGit;
    case TASK_TYPE_CATEGORIES.AWS:
      return faAws;
    case TASK_TYPE_CATEGORIES.COMPLIANCE:
      return faGitAlt;
    case TASK_TYPE_CATEGORIES.AZURE:
      return faMicrosoft;
  }
};

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

  //snaplogic
  SNAPLOGIC_TASK: "snaplogic",
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
  GITSCRAPER: "Git Custodian",

  // AWS
  AWS_CREATE_ECS_CLUSTER: "AWS ECS Cluster Creation",
  AWS_CREATE_ECS_SERVICE: "AWS ECS Service Creation",
  AWS_CREATE_LAMBDA_FUNCTION: "AWS Lambda Function Creation",

  // Azure
  AZURE_CLUSTER_CREATION: "Azure AKS Cluster Creation",

  //snaplogic
  SNAPLOGIC_TASK: "Snaplogic Task",
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

    case TASK_TYPES.SNAPLOGIC_TASK:
      return TASK_TYPE_LABELS.SNAPLOGIC_TASK;
    default:
      return taskType;
  }
};


export const TASK_TYPE_CATEGORIES = {
  AWS: "AWS",
  AZURE: "Azure",
  GIT: "Git",
  COMPLIANCE: "Compliance",
  SALESFORCE: "Salesforce",
};

export const PRODUCTION_TASK_TYPE_SELECT_OPTIONS = [
  // AWS
  { text: TASK_TYPE_LABELS.AWS_CREATE_ECS_CLUSTER, value: TASK_TYPES.AWS_CREATE_ECS_CLUSTER, category: "AWS" },
  { text: TASK_TYPE_LABELS.AWS_CREATE_ECS_SERVICE, value: TASK_TYPES.AWS_CREATE_ECS_SERVICE, category: "AWS" },
  { text: TASK_TYPE_LABELS.AWS_CREATE_LAMBDA_FUNCTION, value: TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION, category: "AWS" },

  // Azure
  { text: TASK_TYPE_LABELS.AZURE_CLUSTER_CREATION, value: TASK_TYPES.AZURE_CLUSTER_CREATION, category: "Azure" },

  // Git
  { text: TASK_TYPE_LABELS.GIT_TO_GIT_MERGE_SYNC, value: TASK_TYPES.GIT_TO_GIT_MERGE_SYNC, category: "Git" },
  { text: TASK_TYPE_LABELS.SYNC_GIT_BRANCHES, value: TASK_TYPES.SYNC_GIT_BRANCHES, category: "Git" },
  { text: TASK_TYPE_LABELS.GITSCRAPER, value: TASK_TYPES.GITSCRAPER, category: "Compliance" },

  // Salesforce
  {
    text: TASK_TYPE_LABELS.SYNC_SALESFORCE_BRANCH_STRUCTURE,
    value: TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE,
    category: "Salesforce",
  },
  { text: TASK_TYPE_LABELS.SYNC_SALESFORCE_REPO, value: TASK_TYPES.SYNC_SALESFORCE_REPO, category: "Salesforce" },
  {
    text: TASK_TYPE_LABELS.SALESFORCE_BULK_MIGRATION,
    value: TASK_TYPES.SALESFORCE_BULK_MIGRATION,
    category: "Salesforce",
  },
  {
    text: TASK_TYPE_LABELS.SALESFORCE_TO_GIT_MERGE_SYNC,
    value: TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC,
    category: "Salesforce",
  },
  { text: TASK_TYPE_LABELS.SALESFORCE_QUICK_DEPLOY, value: TASK_TYPES.SALESFORCE_QUICK_DEPLOY, category: "Salesforce" },

  //snaplogic
  { text: TASK_TYPE_LABELS.SNAPLOGIC_TASK, value: TASK_TYPES.SNAPLOGIC_TASK, category: "Git" },
];

export const NON_PRODUCTION_TASK_TYPE_SELECT_OPTIONS = [
  // AWS
  { text: TASK_TYPE_LABELS.AWS_CREATE_ECS_CLUSTER, value: TASK_TYPES.AWS_CREATE_ECS_CLUSTER, category: "AWS" },
  { text: TASK_TYPE_LABELS.AWS_CREATE_ECS_SERVICE, value: TASK_TYPES.AWS_CREATE_ECS_SERVICE, category: "AWS" },
  { text: TASK_TYPE_LABELS.AWS_CREATE_LAMBDA_FUNCTION, value: TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION, category: "AWS" },

  // Azure
  { text: TASK_TYPE_LABELS.AZURE_CLUSTER_CREATION, value: TASK_TYPES.AZURE_CLUSTER_CREATION, category: "Azure" },

  // Git
  { text: TASK_TYPE_LABELS.GIT_TO_GIT_MERGE_SYNC, value: TASK_TYPES.GIT_TO_GIT_MERGE_SYNC, category: "Git" },
  { text: TASK_TYPE_LABELS.SYNC_GIT_BRANCHES, value: TASK_TYPES.SYNC_GIT_BRANCHES, category: "Git" },
  { text: TASK_TYPE_LABELS.GITSCRAPER, value: TASK_TYPES.GITSCRAPER, category: "Compliance" },

  // Salesforce
  {
    text: TASK_TYPE_LABELS.SYNC_SALESFORCE_BRANCH_STRUCTURE,
    value: TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE,
    category: "Salesforce",
  },
  {
    text: TASK_TYPE_LABELS.SALESFORCE_BULK_MIGRATION,
    value: TASK_TYPES.SALESFORCE_BULK_MIGRATION,
    category: "Salesforce",
  },
  {
    text: TASK_TYPE_LABELS.SALESFORCE_CERTIFICATE_GENERATION,
    value: TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION,
    category: "Salesforce",
  },
  { text: TASK_TYPE_LABELS.SYNC_SALESFORCE_REPO, value: TASK_TYPES.SYNC_SALESFORCE_REPO, category: "Salesforce" },
  {
    text: TASK_TYPE_LABELS.SALESFORCE_TO_GIT_MERGE_SYNC,
    value: TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC,
    category: "Salesforce",
  },
  { text: TASK_TYPE_LABELS.SALESFORCE_QUICK_DEPLOY, value: TASK_TYPES.SALESFORCE_QUICK_DEPLOY, category: "Salesforce" },

  //snaplogic
  { text: TASK_TYPE_LABELS.SNAPLOGIC_TASK, value: TASK_TYPES.SNAPLOGIC_TASK, category: "Git" },
];

taskTypeConstants.getTaskCategoryForType = (taskType) => {
  if (hasStringValue(taskType) !== true) {
    return "";
  }

  const taskTypeDefinition = NON_PRODUCTION_TASK_TYPE_SELECT_OPTIONS.find((taskTypeDefinition) => {
    return taskTypeDefinition.value === taskType;
  });

  return taskTypeDefinition?.category;
};

export const isTaskTypeOfCategory = (taskType, category, allowNullCategory = true) => {
  if (
    hasStringValue(category) !== true
    || hasStringValue(taskType) !== true
    || category === "owner"
  ) {
    return true;
  }

  const taskTypeDefinition = NON_PRODUCTION_TASK_TYPE_SELECT_OPTIONS.find((taskTypeDefinition) => {
    return taskTypeDefinition.value === taskType;
  });
  const taskTypeDefinitionCategory = taskTypeDefinition?.category;

  if (allowNullCategory === false) {
    return hasStringValue(taskTypeDefinitionCategory) === true && taskTypeDefinitionCategory?.toLowerCase() === category?.toLowerCase();
  }

  return hasStringValue(taskTypeDefinitionCategory) !== true || taskTypeDefinitionCategory?.toLowerCase() === category;
};

export const getProductionTaskTypesForCategory = (category) => {
  if (hasStringValue(category) !== true || category === "owner") {
    return PRODUCTION_TASK_TYPE_SELECT_OPTIONS;
  }

  return PRODUCTION_TASK_TYPE_SELECT_OPTIONS.filter((taskTypeDefinition) => {
    const taskTypeDefinitionCategory = taskTypeDefinition.category;
    return hasStringValue(taskTypeDefinitionCategory) !== true || taskTypeDefinitionCategory.toLowerCase() === category.toLowerCase();
  });
};

export const getNonProductionTaskTypesForCategory = (category) => {
  if (hasStringValue(category) !== true || category === "owner") {
    return NON_PRODUCTION_TASK_TYPE_SELECT_OPTIONS;
  }

  return NON_PRODUCTION_TASK_TYPE_SELECT_OPTIONS.filter((taskTypeDefinition) => {
    const taskTypeDefinitionCategory = taskTypeDefinition.category;
    return hasStringValue(taskTypeDefinitionCategory) !== true || taskTypeDefinitionCategory.toLowerCase() === category.toLowerCase();
  });
};