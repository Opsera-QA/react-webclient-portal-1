const InformaticaIdqConnectionMetadata = {
  type: "Informatica IDQ Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Domain Name",
      id: "domainName",
      isRequired: true,
      regexDefinitionName: "generalText",
      formText: "The Domain Domain Name.",
    },
    {
      label: "Domain Gateway",
      id: "domainGateway",
      isRequired: true,
      regexDefinitionName: "generalText",
      formText: "The Domain Gateway URL. should be a valid URL along with the port in the below format https://domain-url:port.",
    },
    {
      label: "User Name",
      id: "accountUsername",
      isRequired: true,
      regexDefinitionName: "generalText",
      formText: " ",
    },
    {
      label: "Password",
      id: "accountPassword",
      isRequired: true,
      formText: " ",
    },
    {
      label: "Security Group",
      id: "securityGroup",
      isRequired: true,
      regexDefinitionName: "generalText",
      formText: "Security Group used for Authentication.",
    },
    {
      label: "Repository Service",
      id: "repositoryService",
      isRequired: true,
      regexDefinitionName: "generalText",
      formText: "Repository Service Name to export/import objects from.",
    },
    {
      label: "Data Integration Server(DIS)",
      id: "dataIntegrationServer",
      isRequired: true,
      regexDefinitionName: "generalText",
      formText: "Data Integration Server",
    }
  ],
  newObjectFields:
    {
      domainName: "",
      domainGateway: "",
      accountUsername: "",
      accountPassword: "",
      securityGroup: "",
      repositoryService: "",
      dataIntegrationServer: ""
    }
};

export default InformaticaIdqConnectionMetadata;