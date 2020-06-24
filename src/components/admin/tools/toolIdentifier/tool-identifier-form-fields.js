const toolIdentifierFormFields = {
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
      isRequired: false 
    }
  },
  identifier: {
    label: "Identifier",
    id: "identifier",
    type: "",
    value: "",
    toShow: true,
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: true
    }
  }, 
  tool_type_identifier: {
    label: "Tool Type Identifier",
    id: "tool_type_identifier",
    type: "select",
    value: "",
    toShow: true,
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
    disabled: true,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  }, 
  properties: {
    label: "Properties",
    id: "properties",
    type: "multi-checkbox",
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


export default toolIdentifierFormFields;