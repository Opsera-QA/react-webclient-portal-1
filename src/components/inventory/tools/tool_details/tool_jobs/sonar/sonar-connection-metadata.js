const sonarConnectionMetadata = {
  type: "Sonar Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Sonar Edition",
      id: "sonarEdition",
      isRequired: true,
      maxLength: 100
    },
    {
      label: "Sonar URL",
      id: "sonarUrl",
      isRequired: true,
      maxLength: 100
    },
    {
      label: "Sonar Port",
      id: "sonarPort",
      maxLength: 5
    },
    {
      label: "Sonar User ID",
      id: "sonarUserId",
      isRequired: true,
      maxLength: 50
    },
    {
      label: "Sonar Authentication Token",
      id: "sonarAuthToken",
      isRequired: true,
      maxLength: 500
    }
  ],
  newObjectFields:
    {
      sonarEdition: "community",
      sonarUrl: "",
      sonarPort : "",
      sonarUserId : "",
      sonarAuthToken : "",
    }
};

export default sonarConnectionMetadata;