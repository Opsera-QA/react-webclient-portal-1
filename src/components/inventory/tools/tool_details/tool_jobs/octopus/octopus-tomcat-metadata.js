const OctopusTomcatMetadata = {
    type: "Octopus Tomcat Manager",
    fields: [
      {
        label: "Tomcat Manager Instance Name",
        id: "name",
        isRequired: true
      },
      {
        label: "Space Name",
        id: "spaceName",
        isRequired: true
      },
      {
        label: "Space ID",
        id: "spaceId",
        isRequired: true
      },
      {
        label: "Tomcat Manager URL",
        id: "managerUrl",
        isRequired: true
      },
      {
        label: "Username",
        id: "userName",
        isRequired: true
      },
      {
        label: "Password",
        id: "password",
        isRequired: true
      },
      {
        label: "Active",
        id: "active",
      },
    ],
    newObjectFields: {
      name: "",
      spaceName : "",
      spaceId : "",    
      managerUrl : "",
      userName : "",
      password: "",
      active: true,
    }
};
  
export default OctopusTomcatMetadata;
