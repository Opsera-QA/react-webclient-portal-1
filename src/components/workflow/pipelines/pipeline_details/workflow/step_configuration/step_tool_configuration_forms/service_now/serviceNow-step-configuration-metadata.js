const ServiceNowPipelineStepConfigurationMetadata = {
  type: "Service Now Pipeline Configuration",
  fields: [
    {
      label: "Service Now Tool",
      id: "serviceNowToolId",
      isRequired: true,
    },
    {
      label: "Request Type",
      id: "type",
      isRequired: true,
    },
    {
      label: "Existing Change Request",
      id: "existingChangeRequest",
    },
    {
      label: "Change Request",
      id: "changeRequestNumber",
      isRequiredFunction: (model) => {
        return model?.getData("existingChangeRequest") === true;
      },
    },
    {
      id: "changeRequestSysId",
    },
    {
      label: "Short Description",
      id: "changeRequestShortDescription",
    },
    {
      label: "Approval",
      id: "changeRequestApproval",
    },
    {
      label: "Start Date",
      id: "changeRequestStartDate",
    },
    {
      label: "End Date",
      id: "changeRequestEndDate",
    },
    {
      label: "State",
      id: "changeRequestState",
    },
    {
      label: "Assignment Group",
      id: "assignmentGroupId",
      isRequiredFunction: (model) => {
        return model?.getData("existingChangeRequest") === false;
      },
    },
    {
      label:"Assignment Group Name",
      id: "assignmentGroupName",
    },
    {
      label: "Description",
      id: "changeRequestDescription",
    },
  ],
  newObjectFields: {
    serviceNowToolId: "",
    type: "",
    existingChangeRequest: false,
    changeRequestNumber: "",
    assignmentGroupId: "",
    assignmentGroupName: "",
    changeRequestDescription: "",
    changeRequestSysId: "",
    changeRequestShortDescription: "",
    changeRequestApproval: "",
    changeRequestStartDate: "",
    changeRequestEndDate: "",
    changeRequestState: "",
  }
};

export default ServiceNowPipelineStepConfigurationMetadata;
