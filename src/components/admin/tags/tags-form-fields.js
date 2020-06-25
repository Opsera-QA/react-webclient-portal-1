const tagEditorFormFields = {
  key: {
    label: "Key",
    id: "key",
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
  value: {
    label: "Value",
    id: "value",
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
  configuration: {
    label: "Configuration",
    id: "configuration",
    type: "multi",
    toShow: true,
    value: [],
    fields: ["name", "value"],
    showEditButton: true,
    disabled: true,
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
};

export default tagEditorFormFields;