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
        label: "Use Terraform Enterprise",
        id: "terraformEnterpriseFlag",
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