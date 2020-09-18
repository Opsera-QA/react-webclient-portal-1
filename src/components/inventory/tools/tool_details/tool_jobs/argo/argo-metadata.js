
// TODO: Shrey, this might need to be completely different or there might need to be multiple sets of metadata.
// If you need help wiring anything up, please message me.
const argoApplicationsMetadata = {
  type: "Argo Application",
  fields: [
  {
    label: "Name",
    id: "name",
    isRequired: true
  },
  {
    label: "Description",
    id: "description",
  },
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Active",
      id: "active",
    },
],
  newModelBase: {
    name: "",
    description: "",
    type: "",
    active: true,
  }
};

export default argoApplicationsMetadata;