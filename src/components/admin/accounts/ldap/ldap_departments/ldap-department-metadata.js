export const ldapDepartmentMetaData = {
  idProperty: "name",
  type: "Department",
  // detailView: function(record) {
  //   return `/admin/departments/details/${record.getData("name")}`;
  // },
  detailViewTitle: function (record) {
    return `Department Details [${record.getOriginalValue("name")}]`;
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