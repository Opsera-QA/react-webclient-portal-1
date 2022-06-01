const BlackduckMetadata = {
  type: "BlackDuck Tool Configuration",
  idProperty: "_id",
  fields: [    
    {
      label: "BlackDuck URL",
      id: "url",
      isRequired: true
    },
    {
      label: "BlackDuck Token",
      id: "token",
      isRequired: true
    },
  ],
  newObjectFields:
  {
    url: "",
    token: "",    
  }
};

export default BlackduckMetadata;
