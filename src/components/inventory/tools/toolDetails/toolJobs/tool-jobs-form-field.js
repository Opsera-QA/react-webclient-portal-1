const ToolJobFormFields = {
  tool_type_identifier: {
    label: "Job Type",
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
  }
};

export default ToolJobFormFields;