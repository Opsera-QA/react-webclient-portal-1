const TerraformCloudMetadata = {
    type: "Terraform Cloud Tool Configuration",
    idProperty: "_id",
    fields: [
      {
        label: "Terraform Cloud URL",
        id: "terraformCloudUrl",
        isRequired: true
      },
      {
        label: "Terraform Token",
        id: "terraformToken",
        isRequired: true
      },
    ],
    newObjectFields:
      {
       terraformCloudUrl: "",
       terraformToken: "",
       type: "terraform-cloud"
      }
  };
  
  export default TerraformCloudMetadata;