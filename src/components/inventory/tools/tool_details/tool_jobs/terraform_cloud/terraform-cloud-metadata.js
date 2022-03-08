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
        label: "Is Terraform Enterprise?",
        id: "terraformEnterpriseFlag",
        isRequired: true
      },
    ],
    newObjectFields:
      {
       url: "",
       token: "",
       type: "terraform-cloud",
       terraformEnterpriseFlag: false
      }
  };
  
  export default TerraformCloudMetadata;