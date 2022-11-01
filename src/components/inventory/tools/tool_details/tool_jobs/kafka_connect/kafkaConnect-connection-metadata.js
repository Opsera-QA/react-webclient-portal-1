const KafkaConnectConnectionMetadata = {
  type: "Kafka Connect Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Username",
      id: "username",
    },
    {
      label: "Password",
      id: "password",
    },
    {
      label: "Tool URL",
      id: "toolURL",
      isRequired: true,
      isSecureUrl: true,
    }
  ],
  newObjectFields:
    {
      username: "",
      password: "",
      toolURL: ""
    }
};

export default KafkaConnectConnectionMetadata;