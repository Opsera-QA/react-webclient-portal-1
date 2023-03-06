export const customApplicationJsonMetadata = {
  type: "CustomApplication",
  fields: [
    {
      label: "Application",
      id: "application",
    },
    {
      label: "Default",
      id: "default",
    },
    {
      label: "Visible",
      id: "visible",
    },
  ],
  newObjectFields: {
    application: "",
    default: false,
    visible: false,
  },
};

export const dataCategoryGrpJsonMetadata = {
  type: "DataCategoryGroup",
  fields: [
    {
      label: "Data Category Group",
      id: "dataCategoryGroup",
    },
    {
      label: "Visibility",
      id: "visibility",
    },
  ],
  newObjectFields: {
    dataCategoryGroup: "",
    visibility: "ALL",
  },
};

export const apexClassFileJsonMetadata = {
  type: "Apex Class File",
  fields: [
    {
      label: "Apex Class",
      id: "apexClass",
    },
    {
      label: "Enabled",
      id: "enabled",
    },
  ],
  newObjectFields: {
    apexClass: "",
    enabled: false,
  },
};

export const customMetadataJsonMetadata = {
  type: "CustomMetadata",
  fields: [
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Enabled",
      id: "enabled",
    },
  ],
  newObjectFields: {
    name: "",
    enabled: false,
  },
};

export const customPermissionJsonMetadata = {
  type: "CustomPermission",
  fields: [
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Enabled",
      id: "enabled",
    },
  ],
  newObjectFields: {
    name: "",
    enabled: false,
  },
};

export const customSettingJsonMetadata = {
  type: "CustomSetting",
  fields: [
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Enabled",
      id: "enabled",
    },
  ],
  newObjectFields: {
    name: "",
    enabled: false,
  },
};

export const externalDataSourceJsonMetadata = {
  type: "ExternalDataSource",
  fields: [
    {
      label: "External Data Source",
      id: "externalDataSource",
    },
    {
      label: "Enabled",
      id: "enabled",
    },
  ],
  newObjectFields: {
    externalDataSource: "",
    enabled: false,
  },
};

export const customFieldJsonMetadata = {
  type: "CustomField",
  fields: [
    {
      label: "Field",
      id: "field",
    },
    {
      label: "Editable",
      id: "editable",
    },
    {
      label: "Readable",
      id: "readable",
    },
  ],
  newObjectFields: {
    field: "",
    editable: false,
    readable: false,
  },
};
export const flowJsonMetadata = {
  type: "Flow",
  fields: [
    {
      label: "Flow",
      id: "flow",
    },
    {
      label: "enabled",
      id: "enabled",
    },
  ],
  newObjectFields: {
    flow: "",
    enabled: false,
  },
};
export const layoutJsonMetadata = {
  type: "Layout",
  fields: [
    {
      label: "Layout",
      id: "layout",
    },
    {
      label: "Record Type",
      id: "recordType",
    },
  ],
  newObjectFields: {
    layout: "",
    recordType: "",
  },
};
export const customObjectJsonMetadata = {
  type: "CustomObject",
  fields: [
    {
      label: "Object",
      id: "object",
    },
    {
      label: "Allow Create",
      id: "allowCreate",
      formText: "Can be set true only if Read is set as true.",
    },
    {
      label: "Allow Delete",
      id: "allowDelete",
      formText: "Can be set true only if Read and Edit is set as true.",
    },
    {
      label: "Allow Edit",
      id: "allowEdit",
      formText: "Can be set true only if Read is set as true.",
    },
    {
      label: "Allow Read",
      id: "allowRead",
    },
    {
      label: "Modify All Records",
      id: "modifyAllRecords",
      formText: "Can be set true only if Read, Edit, Delete and View all Records are set as true.",
    },
    {
      label: "View All Records",
      id: "viewAllRecords",
      formText: "Can be set true only if Read is set as true.",
    },
  ],
  newObjectFields: {
    object: "",
    allowCreate: false,
    allowDelete: false,
    allowEdit: false,
    allowRead: true,
    modifyAllRecords: false,
    viewAllRecords: false,
  },
};

export const apexPageJsonMetadata = {
  type: "ApexPage",
  fields: [
    {
      label: "Apex Page",
      id: "apexPage",
    },
    {
      label: "Enabled",
      id: "enabled",
    },
  ],
  newObjectFields: {
    apexPage: "",
    enabled: false,
  },
};

export const recordTypeJsonMetadata = {
  type: "RecordType",
  fields: [
    {
      label: "Record Type",
      id: "recordType",
    },
    {
      label: "Default",
      id: "default",
    },
    {
      label: "Visible",
      id: "visible",
    },
  ],
  newObjectFields: {
    recordType: "",
    default: false,
    visible: false,
  },
};
export const customTabJsonMetadata = {
  type: "CustomTab",
  fields: [
    {
      label: "Tab",
      id: "tab",
    },
    {
      label: "visibility",
      id: "visibility",
    },
  ],
  newObjectFields: {
    tab: "",
    visibility: "",
  },
};
