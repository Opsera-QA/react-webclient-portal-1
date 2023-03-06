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
      id: "changeRequestShortDescription",
    },
    {
      id: "changeRequestApproval",
    },
    {
      id: "changeRequestStartDate",
    },
    {
      id: "changeRequestEndDate",
    },
    {
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
