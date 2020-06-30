const tagEditorFormFields = {
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