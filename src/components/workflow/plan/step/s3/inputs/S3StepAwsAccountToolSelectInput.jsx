import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAwsAccountToolSelectInput
  from "components/common/list_of_values_input/tools/aws/tool/RoleRestrictedAwsAccountToolSelectInput";

function S3StepAwsAccountToolSelectInput({className, fieldName, model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("awsToolConfigId", selectedOption?._id);
    newModel.setData("accessKey", selectedOption?.configuration?.accessKey);
    newModel.setData("secretKey", selectedOption?.configuration?.secretKey);
    newModel.setData("regions", selectedOption?.configuration?.regions);
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setDefaultValue("awsToolConfigId");
    newModel.setDefaultValue("accessKey");
    newModel.setDefaultValue("secretKey");
    newModel.setDefaultValue("regions");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedAwsAccountToolSelectInput
      fieldName={fieldName}
      configurationRequired={true}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
      className={className}
    />
  );
}

S3StepAwsAccountToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
};

S3StepAwsAccountToolSelectInput.defaultProps = {
  fieldName: "awsToolConfigId",
};

export default S3StepAwsAccountToolSelectInput;