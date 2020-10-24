export const ldapDepartmentMetaData = {
  idProperty: "name",
  type: "Department",
  fields: [
    {
      label: "Department Name",
      id: "name",
      isRequired: true
    },
    {
      label: "Owner",
      id: "ownerEmail",
    },
    {
      label: "Group Name",
      id: "departmentGroupName",
    },
    {
      label: "Department Group Members",
      id: "members",
    },
  ],
  newObjectFields: {
    name: "",
  }
};

export default ldapDepartmentMetaData;