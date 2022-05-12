export const mergeSyncTaskWizardSelectedDeltaCommitMetadata = {
  type: "Delta Selected Commit",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Ignore Incoming Changes",
      id: "ignoreIncoming",
    },
  ],
  newObjectFields: {
    file: "",
    ignoreIncoming: "",
  }
};