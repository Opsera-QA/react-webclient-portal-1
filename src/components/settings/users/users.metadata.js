export const usersMetadata = {
  idProperty: "name",
  type: "User",
  // detailView: function (record) {
  //   return `/admin/organizations/details/${record.getData("name")}`;
  // },
  detailViewTitle: function (record) {
    return `${record?.getOriginalValue("name")}`;
  },
  fields: [
    {
      label: "Full User Name",
      id: "name",
    },
    {
      label: "Preferred Name",
      id: "preferredName",
      maxLength: 125,
      regexDefinitionName: "generalTextWithSpaces",
    },
    {
      label: "First Name",
      id: "firstName",
      isRequired: true
    },
    {
      label: "Last Name",
      id: "lastName",
      isRequired: true
    },
    {
      label: "Email Address",
      id: "emailAddress",
      isRequired: true,
      isEmail: true,
      lowercase: true,
    },
    {
      label: "Division",
      id: "division",
      maxLength: 50,
      regexDefinitionName: "generalTextWithSpaces",
    },
    {
      label: "Teams",
      id: "teams",
    },
    {
      label: "Department Name",
      id: "departmentName",
    },
    {
      label: "Title",
      id: "title",
    },
    {
      label: "Site",
      id: "site",
      maxLength: 50,
      regexDefinitionName: "generalTextWithSpaces",
    },
    {
      label: "Region",
      id: "region",
    },
    {
      label: "Groups",
      id: "groups",
    },
    {
      label: "Local Authentication Form (Opsera Okta)",
      id: "localAuth",
      formText: "Indicates if the customer is using federated authentication or Opsera Okta (local)"
    },
  ],
  newObjectFields: {
    name: "",
    title: "",
    firstName: "",
    lastName: "",
    preferredName: "",
    emailAddress: "",
    departmentName: "",
    teams: [],
    division: "",
    site: "",
    groups: [],
    cloudProvider: "EKS",
    cloudProviderRegion: "us-east-2",
    localAuth: "FALSE",
    active: true,
  }
};