import regexHelpers from "utils/regexHelpers";

const sfdxCertGenTaskConfigurationMetadata = {
  type: "SFDX Certificate Generation Task Configuration",
  fields: [
    {
      label: "Select Jenkins Tool",
      id: "toolConfigId",
      isRequired: true,
      maxLength: 24,
      regexValidator: regexHelpers.regexTypes.mongoId
    },
    {
      label: "Jenkins Tool Name",
      id: "toolName",
      isRequired: true,
      maxLength: 250,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },  
    {
      label: "Auto Scaling",
      id: "autoScaleEnable"
    },
    {
      label: "Agent Label",
      id: "agentLabels",
      regexValidator: regexHelpers.regexTypes.generalTextWithoutSpacesPeriod,
      maxLength: 50
    },  
    {
      label: "Jenkins Job Name",
      id: "jobName",
      maxLength: 100,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      label: "Country Name (2 letter code)",
      id: "countryName",
      isRequired: true,
      maxLength: 2,
      regexValidator: regexHelpers.regexTypes.alphanumeric
    },
    {
      label: "State or Province Name",
      isRequired: true,
      id: "state",
      maxLength: 100,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      label: "Locality Name",
      isRequired: true,
      id: "locality",
      maxLength: 100,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      label: "Organization Name",
      isRequired: true,
      id: "organization",
      maxLength: 100,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      label: "Organizational Unit Name (eg, section)",
      isRequired: true,
      id: "unitName",
      maxLength: 100,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      label: "Common Name (eg, fully qualified host name)",
      id: "commonName",
      isRequired: true,
      maxLength: 100,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      label: "Email Address",
      isRequired: true,
      id: "email",
      maxLength: 100,
      regexValidator: regexHelpers.regexTypes.email
    },
    {
      label: "Expiry Date",
      isRequired: true,
      id: "expiryDate",
    },
  ],
  newObjectFields:
    {
    toolConfigId: "",
    autoScaleEnable: false,
    toolName: "",
    jobName: "",
    agentLabels: "",
    countryName: "",
    state: "",
    locality: "",
    organization: "",
    unitName: "",
    commonName: "",
    email: "",
    expiryDate : new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    }
};

export default sfdxCertGenTaskConfigurationMetadata;