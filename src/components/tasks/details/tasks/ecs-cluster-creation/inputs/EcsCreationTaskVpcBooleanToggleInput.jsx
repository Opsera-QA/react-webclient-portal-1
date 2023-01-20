import React  from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

export default function EcsCreationTaskVpcBooleanToggleInput(
  {
    model,
    setModel,
    fieldName,
    disabled,
  }) {
  const setDataFunction = (fieldName, newValue) => {
    model.setData(fieldName, newValue);

    if (model?.getData("clusterTemplate") === "fargate") {
      model.setData("vpcCidrBlock", "10.0.0.0/40");
      model.setData("public_subnet_1", "10.0.0.0/24");
      model.setData("public_subnet_2", "10.0.1.0/24");
    }

    setModel({ ...model });
  };

  return (
    <BooleanToggleInput
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

EcsCreationTaskVpcBooleanToggleInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

EcsCreationTaskVpcBooleanToggleInput.defaultProps = {
  fieldName: "createVpc",
};