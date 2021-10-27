const salesforceSummaryLogFlowCoverage = {
  type: "Salesforce Summary Log Run Test Results",
  fields: [
    {
      label: "Number of Elements",
      id: "numElements",
    },
    {
      label: "Elements Not Covered",
      id: "elementsNotCovered",
    },
    {
      label: "Flow ID",
      id: "flowId"
    },
    {
      label: "Process Type",
      id: "processType"
    },
    {
      label: "Flow Name",
      id: "flowName"
    },
    {
      label: "Number of Elements Not Covered",
      id: "numElementsNotCovered"
    },
    {
      label: "Flow Namespace",
      id: "flowNamespace"
    },
  ],
  newObjectFields: {
    numElements: 0,
    elementsNotCovered: [],
    flowId: "",
    processType: "",
    flowName: "",
    numElementsNotCovered: 0,
    flowNamespace: "",
  }
};

export default salesforceSummaryLogFlowCoverage;