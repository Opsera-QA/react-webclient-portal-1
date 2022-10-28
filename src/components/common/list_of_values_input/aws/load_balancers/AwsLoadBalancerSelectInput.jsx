import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetAwsLoadBalancers from "components/common/list_of_values_input/aws/load_balancers/useGetAwsLoadBalancers";

export default function AwsLoadBalancerSelectInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
    textField,
    valueField,
    awsToolId,
    vpcId,
    region,
  }) {
  const {
    loadBalancers,
    isLoading,
    error,
  } = useGetAwsLoadBalancers(awsToolId, vpcId, region);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={loadBalancers}
      textField={textField}
      valueField={valueField}
      busy={isLoading}
      error={error}
      singularTopic={"Load Balancer"}
      pluralTopic={"Load Balancers"}
      disabled={disabled}
    />
  );
}

AwsLoadBalancerSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  awsToolId: PropTypes.string,
  vpcId: PropTypes.string,
  region: PropTypes.string,
};

AwsLoadBalancerSelectInput.defaultProps = {
  fieldName: "ecsServiceLoadBalancerArn",
  textField: "value",
  valueField: "key",
};
