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
  groupType: {
    label: "Group Type",
    id: "groupType",
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
  members: {
    label: "User Count",
    id: "members",
    rules: {
      isRequired: false
    }
  },
  domain: {
    label: "Domain",
    id: "domain",
    rules: {
      isRequired: false
    }
  },
  ownerEmail: {
    label: "Owner Email",
    id: "ownerEmail",
    rules: {
      isRequired: false
    }
  },
};

export default ldapGroupFormFields;


export const ldapGroupFormFieldsArray = [
  {
    label: "Name",
    id: "name",
    rules: {
      isRequired: true
    }
  },
  {
    label: "Group Type",
    id: "groupType",
    rules: {
      isRequired: false
    }
  },
  {
    label: "External Sync Group",
    id: "externalSyncGroup",
    rules: {
      isRequired: false
    }
  },
  {
    label: "Sync",
    id: "isSync",
    rules: {
      isRequired: false
    }
  },
  {
    label: "User Count",
    id: "members",
    rules: {
      isRequired: false
    }
  },
  {
    label: "Domain",
    id: "domain",
    rules: {
      isRequired: false
    }
  },
  {
    label: "Owner Email",
    id: "ownerEmail",
    rules: {
      isRequired: false
    }
  }
]