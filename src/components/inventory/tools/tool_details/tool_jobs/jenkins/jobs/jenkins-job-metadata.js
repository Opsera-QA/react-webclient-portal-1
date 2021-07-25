import regexHelpers from "utils/regexHelpers";

const JenkinsJobMetadata = {
  idProperty: "_id",
  type: "Jenkins Job",
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
      isRequired: true,
      maxLength: 50,
      regexValidator: regexHelpers.regexTypes["generalTextWithSpaces"],
      formText:
        "Names can be up to 50 characters and can consist of letters, apostrophes, numbers, spaces, dashes, colons, underscores, and periods",
    },
    {
      label: "Configuration",
      id: "configuration",
    },
    {
      label: "Description",
      id: "description",
      maxLength: 1000,
      regexValidator: regexHelpers.regexTypes.expandedTextAndSymbolsWithSpaces,
      formText:
        "Description can be up to 1000 characters and can consist of letters, apostrophes, numbers, spaces, dashes, colons, underscores, and periods",
    },
    {
      label: "Job Type",
      id: "type",
    },
    {
      label: "Job Type",
      id: "jobType",
    },
    {
      label: "Active",
      id: "active",
    },
  ],
  newObjectFields: {
    name: "",
    description: "",
    type: ["BUILD"],
    configuration: {},
    jobType: "BUILD",
    active: true
  },
};

export default JenkinsJobMetadata;
