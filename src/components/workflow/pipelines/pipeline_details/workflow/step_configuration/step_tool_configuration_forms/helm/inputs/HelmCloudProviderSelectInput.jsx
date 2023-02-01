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

function HelmCloudProviderSelectInput({dataObject, setDataObject, disabled, fieldName}) {

  const setDataFunction = (fieldName, value) => {
    let newModel = {...dataObject};
    newModel.setDefaultValue("azureToolConfigId");
    newModel.setDefaultValue("azureCredentialId");
    newModel.setDefaultValue("accessKeyParamName");
    newModel.setDefaultValue("secretKeyParamName");
    newModel.setDefaultValue("regionParamName");
    newModel.setDefaultValue("awsToolConfigId");
    newModel.setDefaultValue("clusterName");
    newModel.setDefaultValue("namespace");
    newModel.setDefaultValue("resoureceGroup");
    newModel.setData(fieldName, value.value);
    setDataObject({...newModel});
    return newModel;
  };

  const clearDataFunction = (fieldName, value) => {
    let newModel = {...dataObject};
    newModel.setDefaultValue("azureToolConfigId");
    newModel.setDefaultValue("azureCredentialId");
    newModel.setDefaultValue("accessKeyParamName");
    newModel.setDefaultValue("secretKeyParamName");
    newModel.setDefaultValue("regionParamName");
    newModel.setDefaultValue("awsToolConfigId");
    newModel.setDefaultValue("clusterName");
    newModel.setDefaultValue("namespace");
    newModel.setDefaultValue("resourceGroup");
    newModel.setDefaultValue(fieldName);
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

HelmCloudProviderSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

export default HelmCloudProviderSelectInput;
