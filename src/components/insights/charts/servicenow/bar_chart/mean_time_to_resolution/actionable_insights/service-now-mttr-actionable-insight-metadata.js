const ServiceNowMTTRActionableMetadata = {
  idProperty: "_id",
  type: "Service Now Issues by Severity Report",
  fields: [
    {
      label: "Incident Number",
      id: "_id",
    },
    {
      label: "Description",
      id: "taskDescription",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Date Opened",
      id: "dateOpened",
    },
    {
      label: "Date Closed",
      id: "dateClosed",
    },
    {
      label: "Incident Category",
      id: "assignmentGroup",
    },
    {
      label: "Opened By",
      id: "openedBy",
    },
  ],
  newObjectFields: {},
};

export default ServiceNowMTTRActionableMetadata;