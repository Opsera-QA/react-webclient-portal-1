import regexHelpers from "utils/regexHelpers";

const sfdcComponentSelectorMetadata = {
  idProperty: "_id",
  type: "Sfdc Component Selector",
  activeField: "active",
  fields: [
    {
      label: "Customer ID",
      id: "customerId",
    },
    {
      label: "Name",
      id: "name",
      isRequired: true,
      maxLength: 25,
      regexValidator: regexHelpers.regexTypes.limitedTextWithSpaces
    },
  ],
  newObjectFields: {
    customerId: "", //ssoUsersID assigned at the Node layer
    // lastCommitTimeStamp: "", //asOfDate value as string
    lastCommitTimeFromStamp: "", //fromDate value as string
    lastCommitTimeToStamp: "", //toDate value as string
    pipelineId: "",
    stepId: "", //assume for now it's the first
    nameSpacePrefix: "", // prefix
    objectType: "", // type of objs managed custom or all
    componentTypes: [],
  }
};

export default sfdcComponentSelectorMetadata;