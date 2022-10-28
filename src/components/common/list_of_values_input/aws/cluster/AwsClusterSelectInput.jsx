import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetAwsClusters from "components/common/list_of_values_input/aws/cluster/useGetAwsClusters";

export default function AwsClusterSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField,
    awsToolId,
    type,
    region,
  }) {
  const {
    awsClusters,
    isLoading,
    error,
  } = useGetAwsClusters(awsToolId, type, region);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={awsClusters}
      error={error}
      textField={textField}
      valueField={valueField}
      busy={isLoading}
      disabled={disabled}
      singularTopic={"Cluster"}
      pluralTopic={"Clusters"}
    />
  );
}

AwsClusterSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  awsToolId: PropTypes.string,
  region: PropTypes.string,
  type: PropTypes.string,
};

AwsClusterSelectInput.defaultProps = {
  textField: "clusterName",
  valueField: "clusterName",
};
