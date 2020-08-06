const templateEditorFormFields = {
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
      minLength: 3,
      isRequired: true 
    }
  },
  description: {
    label: "Description",
    id: "description",
    type: "",
    toShow: true,
    value: "",
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",
    rules: {
      minLength: 3, 
      isRequired: true 
    }
  },  
  type: {
    label: "Type",
    id: "type",
    type: "tags",
    toShow: true,
    value: [],
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  }, 
  roles: {
    label: "Roles",
    id: "roles",
    type: "tags",
    toShow: true,
    value: ["opsera", "everyone"],
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  },
  account: { //this should be a dropdown that lists Org Accounts (showing domain in UI) but saving orgAccount name in fields
    label: "LDAP Account",
    id: "account",
    type: "",
    toShow: true,
    value: "",
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",
    rules: {
      minLength: 3,
      isRequired: true
    }
  },
  tags: {
    label: "Tags",
    id: "tags",
    type: "tags",
    toShow: true,
    value: [],
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  }, 
  active: {
    label: "Status",
    id: "active",
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
  plan: {
    label: "Plan",
    id: "plan",
    type: "JSON",
    toShow: true,
    value: [
      {
        "tool": {},
        "trigger": [],
        "type": [],
        "notification": [],
        "name": "",
        "description": "",
        "active": true
      }
    ],
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  }, 
};

export default templateEditorFormFields;