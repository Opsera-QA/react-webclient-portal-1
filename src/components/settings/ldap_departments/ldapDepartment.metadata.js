export const ldapDepartmentMetadata = {
  type: "Department",
  // detailView: function(record) {
  //   return `/settings/departments/details/${record.getData("name")}`;
  // },
  detailViewTitle: function (record) {
    return `${record.getOriginalValue("name")}`;
  },
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
      label: "Internal Name",
      id: "departmentGroupName",
    },
    {
      label: "Department Group Members",
      id: "members",
    },
  ],
  newObjectFields: {
    name: "",
    ownerEmail: "",
    departmentGroupName: "",
    members: [],
  }
};

export default ldapDepartmentMetadata;