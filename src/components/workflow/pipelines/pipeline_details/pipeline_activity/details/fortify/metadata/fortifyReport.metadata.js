const fortifyReportMetaData = {
  type: "Fortify Report Metadata",
  fields: [
    {
      label: "Id",
      id: "id",
    },
    {
      label: "Scan Id",
      id: "scanId",
    },
    {
      label: "Release Id",
      id: "releaseId"
    },
    {
      label: "File Name",
      id: "fileName",
    },
    {
      label: "File Path",
      id: "filePath",
    },
    {
      label: "Severity",
      id: "severity"
    },
    {
      label: "Category",
      id: "category"
    },
    {
      label: "Status",
      id: "status"
    },
    {
      label: "Sub-Category",
      id: "subCategory"
    },
    {
      label: "Line Number",
      id: "lineNumber"
    },
  ],
  newObjectFields: {
    id: "",
    scanId: "",
    releaseId: "",
    fileName: "",
    filePath: "",
    severity: "",
    category: "",
    status: "",
    subCategory: "",
    lineNumber: "",    
  }
};

export default fortifyReportMetaData;
