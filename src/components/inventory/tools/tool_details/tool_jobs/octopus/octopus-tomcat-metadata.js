const OctopusTomcatMetadata = {
    type: "Octopus Tomcat Manager",
    fields: [
      {
        label: "Tomcat Manager Instance Name",
        id: "name",
        isRequired: true
      },
      {
        label: "Tomcat Manager URL",
        id: "tomcatManagerUrl",
        isRequired: true
      },
      {
        label: "Username",
        id: "tomcatUserName",
        isRequired: true
      },
      {
        label: "Password",
        id: "tomcatPassword",
        isRequired: true
      },
      {
        label: "Active",
        id: "active",
      },
    ],
    newModelBase: {
      name: "",    
      managerUrl : "",
      userName : "",
      password: "",
      active: true,
    }
};
  
export default OctopusTomcatMetadata;
