import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const CLOUD_PROVIDER_OPTIONS = [
  {
    name: "AWS",
    value: "aws"
  },
  {
    name: "Azure",
    value: "azure"
  }
];

function TerraformCloudProviderSelectInput({dataObject, setDataObject, disabled, fieldName}) {

  const setDataFunction = (fieldName, value) => {
    let newModel = {...dataObject};
    newModel.setData("azureToolConfigId", "");
    newModel.setData("azureCredentialId", "");
    newModel.setData("accessKeyParamName", "");
    newModel.setData("secretKeyParamName", "");
    newModel.setData("regionParamName", "");
    newModel.setData("awsToolConfigId", "");
    newModel.setData("roleArn", "");
    newModel.setData("iamRoleFlag", false);
    newModel.setData(fieldName, value.value);
    setDataObject({...newModel});
    return newModel;
  };

  const clearDataFunction = (fieldName, value) => {
    let newModel = {...dataObject};
    newModel.setData("azureToolConfigId", "");
    newModel.setData("azureCredentialId", "");
    newModel.setData("accessKeyParamName", "");
    newModel.setData("secretKeyParamName", "");
    newModel.setData("regionParamName", "");
    newModel.setData("awsToolConfigId", "");
    newModel.setData("roleArn", "");
    newModel.setData("iamRoleFlag", false);
    newModel.setData(fieldName, "");
    setDataObject({...newModel});
    return newModel;
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataFunction={setDataFunction}
      setDataObject={setDataObject}
      clearDataFunction={clearDataFunction}
      selectOptions={CLOUD_PROVIDER_OPTIONS}
      valueField="value"
      textField="name"
      disabled={disabled}
  />
  );
}

TerraformCloudProviderSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

export default TerraformCloudProviderSelectInput;
