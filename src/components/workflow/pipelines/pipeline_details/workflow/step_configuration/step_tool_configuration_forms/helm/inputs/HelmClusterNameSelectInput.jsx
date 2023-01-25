import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetAwsClusters from "components/common/list_of_values_input/aws/cluster/useGetAwsClusters";
import AwsClusterSelectInput from "components/common/list_of_values_input/aws/cluster/AwsClusterSelectInput";

export default function HelmClusterNameSelectInput(
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

    if(model.getData("cloudProvider") === "aws") {
      return (
        <AwsClusterSelectInput
          fieldName={fieldName}
          model={model}
          setModel={setModel}
          disabled={disabled}
          textField={textField}
          valueField={valueField}
          awsToolId={awsToolId}
          type={type}
          region={region}
        />
      );
    }
return null;
}

HelmClusterNameSelectInput.propTypes = {
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

HelmClusterNameSelectInput.defaultProps = {
  textField: "clusterName",
  valueField: "clusterName",
};
