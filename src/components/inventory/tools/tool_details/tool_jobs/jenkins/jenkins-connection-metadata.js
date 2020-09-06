const jenkinsConnectionMetadata = {
  type: "Jenkins Tool Configuration",
  fields: [
  {
    label: "Jenkins Container URL",
    id: "jenkinsUrl",
    isRequired: true
  },
  {
    label: "Jenkins Port",
    id: "jenkinsPort",
  },
    {
      label: "Jenkins User ID",
      id: "jUserId",
      isRequired: true
    },
    {
      label: "Jenkins Token",
      id: "jAuthToken",
      isRequired: true
    },
    {
      label: "Proxy Enabled?",
      id: "proxyEnable",
    },
    {
      label: "Proxy Username",
      id: "proxyUserName",
      isRequired: true
    },
    {
      label: "Proxy Password",
      id: "proxyPassword",
      isRequired: true
    },
    {
      label: "Jenkins Password",
      id: "jPassword",
      isRequired: true
    },
],
  newModelBase: {
    jenkinsUrl: "",
    jenkinsPort: "",
    jUserId: "",
    jAuthToken: "",
    jPassword: "",
    proxyUserName: "",
    proxyPassword: "",
    proxyEnable: false
  }
};

export default jenkinsConnectionMetadata;