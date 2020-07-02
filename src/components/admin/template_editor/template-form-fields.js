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
    label: "",
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