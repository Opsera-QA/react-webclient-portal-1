import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetAwsCloudProviderRegions
  from "components/common/list_of_values_input/aws/regions/useGetAwsCloudProviderRegions";

export default function AwsCloudProviderRegionSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField,
  }) {
  const {
    cloudProviderRegions,
    isLoading,
    error,
  } = useGetAwsCloudProviderRegions();

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={cloudProviderRegions}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      error={error}
      disabled={disabled}
      pluralTopic={"AWS Cloud Provider Regions"}
      singularTopic={"AWS Cloud Provider Region"}
    />
  );
}

AwsCloudProviderRegionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

AwsCloudProviderRegionSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
};