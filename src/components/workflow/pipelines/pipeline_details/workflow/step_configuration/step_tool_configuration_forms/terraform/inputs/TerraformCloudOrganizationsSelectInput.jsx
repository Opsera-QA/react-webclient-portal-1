import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedRegistryToolApplicationSelectInput
  from "components/common/list_of_values_input/tools/applications/RoleRestrictedRegistryToolApplicationSelectInput";

function TerraformCloudOrganizationsSelectInput({fieldName, model, setModel}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption._id);
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData(fieldName, "");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedRegistryToolApplicationSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      toolId={model?.getData("terraformCloudId")}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={"_id"}
      textField={'name'}
      placeholder={'Select Terraform Cloud Organization'}
    />
  );
}

TerraformCloudOrganizationsSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func
};

TerraformCloudOrganizationsSelectInput.defaultProps = {
  fieldName: "organizationName",
};

export default TerraformCloudOrganizationsSelectInput;
