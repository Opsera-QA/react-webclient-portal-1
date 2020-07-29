const ldapGroupFormFields = {
  name: {
    label: "Name",
    id: "name",
    type: "",
    toShow: true,
    value: "",
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",
    rules: {
      isRequired: true 
    }
  },
  configGroupType: {
    label: "Config Group Type",
    id: "configGroupType",
    type: "select",
    toShow: true,
    value: "",
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",
    options: [
      {
        name: "Role",
        value: "role"
      },
    ],
    rules: {
      isRequired: false 
    }
  },
  externalSyncGroup: {
    label: "External Sync Group",
    id: "externalSyncGroup",
    type: "",
    toShow: true,
    value: "",
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",
    rules: {
      isRequired: false 
    }
  },  
  isSync: {
    label: "Sync",
    id: "isSync",
    value: true,
    type: "switch",
    toShow: true,
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  },
};

export default ldapGroupFormFields;