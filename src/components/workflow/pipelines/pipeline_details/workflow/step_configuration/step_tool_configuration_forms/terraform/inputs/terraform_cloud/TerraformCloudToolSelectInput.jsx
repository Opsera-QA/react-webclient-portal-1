import React from "react";
import PropTypes from "prop-types";

import RoleRestrictedToolByIdentifierInputBase from "../../../../../../../../../common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function TerraformCloudToolSelectInput({ fieldName, model, setModel, disabled, textField, valueField }) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...model };
    newModel.setData("organizationName", "");
    newModel.setData(fieldName, selectedOption?._id);
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    let newModel = { ...model };
    newModel.setData("organizationName", "");
    newModel.setData(fieldName, "");
    setModel({ ...newModel });
  };

  const filterDataFunction = (tools) => {
    return tools.filter(tool => tool?.configuration && !tool?.configuration?.terraformEnterpriseFlag);
  };

  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"terraform-cloud"}
      toolFriendlyName={"Terraform Cloud"}
      fieldName={fieldName}
      configurationRequired={true}
      placeholderText={"Select Terraform Tool"}
      model={model}
      textField={textField}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
      filterDataFunction={filterDataFunction}
    />
  );
}

TerraformCloudToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

TerraformCloudToolSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "terraformCloudId",
  disabled: false
};

export default TerraformCloudToolSelectInput;
