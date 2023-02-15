// TODO: This is a workaround for using the single select to input a value in an array field. Eventually it should be removed.
export const pipelineTypeMetadata = {
  fields: [
    {
      label: "Type",
      id: "type",
      isRequired: true,
    },
  ],
  newObjectFields: {
    type: "",
  }
};
