// TODO: put metadata on node server and pull down that way?
const tagEditorFormFields = {
  key: {
    label: "Type",
    id: "type",
    rules: {
      isRequired: true 
    }
  },
  value: {
    label: "Value",
    id: "value",
    rules: {
      isRequired: true 
    }
  },  
  configuration: {
    label: "Configuration Properties",
    id: "configuration",
    type: "multi",
    toShow: true,
    value: {},
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
    label: "Status",
    id: "active",
    // value: true,
    // type: "switch",
    // toShow: true,
    // disabled: false,
    // touched: false,
    // isValid: false,
    // errorMessage: "",
    rules: {
      isRequired: false 
    }
  },
};

export default tagEditorFormFields;