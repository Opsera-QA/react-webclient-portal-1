const TerraformCloudMetadata = {
    type: "Terraform Cloud Tool Configuration",
    idProperty: "_id",
    fields: [
      {
        label: "Terraform URL",
        id: "url",
        isRequired: true
      },
      {
        label: "Terraform Token",
        id: "token",
        isRequired: true
      },
      {
        label: "Is Terraform Cloud?",
        id: "terraformCloudFlag",
        isRequired: true
      },
    ],
    newObjectFields:
      {
       url: "",
       token: "",
       type: "terraform-cloud",
       terraformCloudFlag: false
      }
  };
  
  export default TerraformCloudMetadata;