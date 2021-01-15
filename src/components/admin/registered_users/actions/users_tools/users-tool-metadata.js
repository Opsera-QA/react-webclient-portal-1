const usersToolMetadata = {
  idProperty: "_id",
  type: "User Tool",
  detailView: function(record) {
    return `/inventory/tools/details/${record.getData("_id")}`;
  },
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Status",
      id: "toolStatus",
    },
    {
      label: "DNS",
      id: "dnsName",
    },
  ],
  newObjectFields: {
    _id: "",
    name: "",
    toolStatus: "",
    dnsName: "",

  }
};

export default usersToolMetadata;