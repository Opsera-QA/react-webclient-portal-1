export const dataSeedingFieldsMetadata = {
  type: "Data Seeding Fields",
  fields: [
    {
      label: "Label",
      id: "label",
    },
    {
      label: "API Name",
      id: "name",
    },
    {
      label: "Length",
      id: "length",
    },
    {
      label: "Unique",
      id: "unique",
    },
    {
      label: "Nillable",
      id: "nillable",
    },
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Mock",
      id: "isMock",
    },
    {
      label: "Filterable",
      id: "filterable",
    },
    {
      label: "Updateable",
      id: "updateable",
    },
    {
      label: "External Ref Id",
      id: "externalRefId",
    },
    {
      label: "Mock Disabled",
      id: "isMockDisabled",
    },
    {
      label: "External Id Disabled",
      id: "isExternalRefIdDisabled",
    },
  ],
  newObjectFields: {
    label: "",
    name: "",
    length: 0,
    unique: false,
    nillable: false,
    type: "boolean",
    isMock: false,
    autonumber: false,
    calculated: false,
    creatable: false,
    filterable: true,
    updateable: true,
    externalRefId: false,
    polymorphicForeignKey: false,
    referenceTo: [],
    isMockDisabled: false,
    isExternalRefIdDisabled: false,
  },
};
