const KafkaConnectConnectionMetadata = {
  type: "Kafka Connect Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Username",
      id: "username",
      isRequired: true
    },
    {
      label: "Password",
      id: "password",
      isRequired: true
    },
    {
      label: "Tool URL",
      id: "toolURL",
      isRequired: true
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