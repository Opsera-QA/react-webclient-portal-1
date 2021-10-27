const salesforceSummaryLogComponentMetadata = {
  type: "Salesforce Summary Log Component Metadata",
  fields: [
    {
      label: "Component Type",
      id: "componentType",
    },
    {
      label: "File Name",
      id: "fileName",
    },
    {
      label: "Full Name",
      id: "fullName"
    },
    {
      label: "Problem",
      id: "problem"
    },
    {
      label: "Success",
      id: "success"
    },
    {
      label: "Warning",
      id: "warning"
    },
    {
      label: "Created",
      id: "created"
    },
    {
      label: "Changed",
      id: "changed"
    },
    {
      label: "Deleted",
      id: "deleted"
    },
    {
      label: "Line Number",
      id: "lineNumber"
    },
    {
      label: "Column Number",
      id: "columnNumber"
    },
    {
      label: "Requires Production Test Run",
      id: "requiresProductionTestRun"
    },
    {
      label: "Creation Date",
      id: "createdDate"
    },
    {
      label: "Known Packaging Problem",
      id: "knownPackagingProblem"
    },
    {
      label: "For Package Manifest File",
      id: "forPackageManifestFile"
    },
    {
      label: "Problem Type",
      id: "problemType"
    },
  ],
  newObjectFields: {
    componentType: "",
    fileName: "",
    fullName: "",
    problem: "",
    success: false,
    warning: false,
    created: false,
    changed: false,
    deleted: false,
    lineNumber: "",
    columnNumber: "",
    requiresProductionTestRun: false,
    createdDate: "",
    knownPackagingProblem: false,
    forPackageManifestFile: false,
    problemType: "",
  }
};

export default salesforceSummaryLogComponentMetadata;