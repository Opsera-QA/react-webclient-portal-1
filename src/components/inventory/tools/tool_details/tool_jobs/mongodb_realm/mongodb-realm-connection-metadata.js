const mongodbeRealmConnectionMetadata = {
    type: "MongoDB Realm Tool Configuration",
    idProperty: "_id",
    fields: [
      {
        label: "Mongo Realm Access Key ID",
        id: "accessKey",
        maxLength: 256,
        isRequired: true
      },
      {
        label: "Mongo Realm Secret Access Key",
        id: "secretKey",
        maxLength: 256,
        isRequired: true
      }
    ],
    newObjectFields:
      {
        accessKey: "",
        secretKey: "",      
      }
  };
  
  export default mongodbeRealmConnectionMetadata;
  