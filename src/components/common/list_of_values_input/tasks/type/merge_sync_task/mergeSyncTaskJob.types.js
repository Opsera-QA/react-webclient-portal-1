export const MERGE_SYNC_TASK_JOB_TYPES = {
  GIT_VS_GIT_SYNC: "GIT_VS_GIT_SYNC",
  SFDC_GIT_COMPARE_SYNC: "SFDC_GIT_COMPARE_SYNC",
};

export const MERGE_SYNC_TASK_JOB_TYPE_LABELS = {
  GIT_VS_GIT_SYNC: "Git to Git Merge Sync",
  SFDC_GIT_COMPARE_SYNC: "Salesforce Organization to Salesforce Organization Merge Sync",
};

export const getMergeSyncTaskJobTypeLabel = (jobType = "") => {
  switch (jobType) {
    case MERGE_SYNC_TASK_JOB_TYPES.GIT_VS_GIT_SYNC:
      return MERGE_SYNC_TASK_JOB_TYPE_LABELS.GIT_VS_GIT_SYNC;
    case MERGE_SYNC_TASK_JOB_TYPES.SFDC_GIT_COMPARE_SYNC:
      return MERGE_SYNC_TASK_JOB_TYPE_LABELS.SFDC_GIT_COMPARE_SYNC;
    default:
      return jobType;
  }
};

export const MERGE_SYNC_TASK_JOB_TYPE_SELECT_OPTIONS = [
  {
    id: MERGE_SYNC_TASK_JOB_TYPES.GIT_VS_GIT_SYNC,
    label: MERGE_SYNC_TASK_JOB_TYPE_LABELS.GIT_VS_GIT_SYNC,
  },
  {
    id: MERGE_SYNC_TASK_JOB_TYPES.SFDC_GIT_COMPARE_SYNC,
    label: MERGE_SYNC_TASK_JOB_TYPE_LABELS.SFDC_GIT_COMPARE_SYNC,
  },
];