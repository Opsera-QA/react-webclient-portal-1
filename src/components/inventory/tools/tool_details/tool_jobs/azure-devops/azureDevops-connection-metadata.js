import regexHelpers from "utils/regexHelpers";

const AzureDevopsConnectionMetadata = {
  type: "Azure Devops Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Personal Access Token",
      id: "accessToken",
      isRequired: true
    },
    {
      label: "Organization",
      id: "organization",
      isRequired: true,
      maxLength: 128,
      regexValidator: regexHelpers.regexTypes.alphanumericPlusSpaces
    }
  ],
  newObjectFields:
    {
      accessToken: ""
    }
};

export default AzureDevopsConnectionMetadata;
