const newToolFormFields = {
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
  tool_identifier: {
    label: "Tool",
    id: "tool_identifier",
    type: "select",
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
    label: "Tool Type",
    id: "tool_type_identifier",
    type: "select",
    value: "",
    toShow: true,
    disabled: true,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  }, 
  compliance: {
    label: "Compliance",
    id: "compliance",
    toShow: true,
    value: [],
    fields: ["name", "value"],
    disabled: true,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  },
  licensing: {
    label: "Licensing",
    id: "licensing",
    toShow: true,
    value: [],
    fields: ["name", "value"],
    disabled: true,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  },
  location: {
    label: "Location",
    id: "location",
    type: "multi",
    toShow: true,
    showEditButton: true,
    value: [],
    fields: ["name", "value"],
    disabled: true,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  }, 
  projects: {
    label: "Project",
    id: "projects",
    type: "multi",
    toShow: true,
    value: [],
    showEditButton: true,
    fields: ["name", "value"],
    disabled: true,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  },
  contacts: {
    label: "Contacts",
    id: "contacts",
    type: "multi",
    toShow: true,
    value: [],
    showEditButton: true,
    fields: ["name", "email", "user_id"],
    disabled: true,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  },
  applications: {
    label: "Application",
    id: "applications",
    type: "multi",
    toShow: true,
    value: [],
    showEditButton: true,
    fields: ["name", "value"],
    disabled: true,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  },
  organization: {
    label: "Organization",
    id: "organization",
    type: "multi",
    toShow: true,
    value: [],
    showEditButton: true,
    fields: ["name", "value"],
    disabled: true,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  },
  external_reference: {
    label: "External Reference",
    id: "external_reference",
    type: "multi",
    toShow: false,
    value: [],
    showEditButton: true,
    touched: false,
    fields: ["name", "description", "identifier"],
    disabled: true,
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
  roles: {
    label: "Roles",
    id: "roles",
    value: [],
    type: "",
    toShow: false,
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  },
  configuration: {
    label: "Configuration",
    id: "configuration",
    value: {},
    type: "",
    toShow: false,
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  },  
  status: {
    label: "Status",
    id: "status",
    value: "",
    type: "",
    toShow: false, 
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
  }
};

export default newToolFormFields;