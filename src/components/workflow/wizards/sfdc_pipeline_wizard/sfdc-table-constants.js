// TODO: Use regular metadata
//  We should have separate sets per table
const sfdcTableConstants = {};

sfdcTableConstants.fields = [
  {
    label: "Component Type",
    id: "componentType"
  },
  {
    label: "Component Name",
    id: "componentName"
  },
  {
    label: "File",
    id: "committedFile"
  },
  {
    label: "Last Modified Time",
    id: "committedTime"
  },
  {
    label: "Last Modified By",
    id: "committedBy"
  },
  {
    label: "Commit Action",
    id: "commitAction"
  },
  {
    label: "Salesforce Component ID",
    id: "committedFileId"
  },
  {
    label: "Commit ID",
    id: "commitID"
  },
  {
    label: "Count",
    id: "componentCount"
  },
  {
    label: "Reason",
    id: "errorReason"
  },
  {
    label: "Ref Component Name",
    id: "refComponentName"
  },
  {
    label: "Ref Component Type",
    id: "refComponentType"
  },
];

export default sfdcTableConstants;