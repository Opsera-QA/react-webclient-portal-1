export const ldapDepartmentMetaData = {
  idProperty: "name",
  type: "Department",
  fields: [
    {
      label: "Department Name",
      id: "name",
      isRequired: true
    }
  ],
  newObjectFields: {
    name: "",
  }
};

export default ldapDepartmentMetaData;