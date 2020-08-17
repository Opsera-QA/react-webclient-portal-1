// TODO: put metadata on node server and pull down that way?
const tagEditorFormFields = {
  name: {
    label: "Name",
    id: "name",
    rules: {
      isRequired: true 
    }
  },
  description: {
    label: "Description",
    id: "description",
    rules: {
      isRequired: true 
    }
  },   
  tool_identifier: {
    label: "Tool Identifier",
    id: "tool_identifier",
    rules: {
      isRequired: true 
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