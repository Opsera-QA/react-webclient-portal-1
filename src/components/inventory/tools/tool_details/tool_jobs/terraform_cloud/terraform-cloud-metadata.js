const TerraformCloudMetadata = {
    type: "Terraform Cloud Tool Configuration",
    idProperty: "_id",
    fields: [
      {
        label: "Terraform Cloud URL",
        id: "url",
        isRequired: true
      },
      {
        label: "Terraform Token",
        id: "token",
        isRequired: true
      },
    ],
    newObjectFields:
      {
       url: "",
       token: "",
       type: "terraform-cloud"
      }
  };
  
  export default TerraformCloudMetadata;