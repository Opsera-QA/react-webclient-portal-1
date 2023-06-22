import React from 'react';
import PropTypes from "prop-types";
import RoleRestrictedAwsAccountToolSelectInput from "components/common/list_of_values_input/tools/aws/tool/RoleRestrictedAwsAccountToolSelectInput";

const ArgoCdStepAwsToolSelectInput = ({ fieldName, model, setModel, disabled, textField, valueField }) => {

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = { ...model };
    newDataObject.setData(fieldName, selectedOption._id);
    newDataObject.setDefaultValue("ecrRepoName");
    newDataObject.setDefaultValue("repositoryTag");
    setModel({ ...newDataObject });
  };

  const clearDataFunction = () => {
    let newDataObject = { ...model };
    newDataObject.setDefaultValue("awsToolConfigId");
    newDataObject.setDefaultValue("ecrRepoName");
    newDataObject.setDefaultValue("repositoryTag");
    setModel({ ...newDataObject });
  };

  if (model?.getData("platform") !== "aws") {
    return null;
  }

  return (
    <RoleRestrictedAwsAccountToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
};

ArgoCdStepAwsToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

ArgoCdStepAwsToolSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "awsToolConfigId",
};

export default ArgoCdStepAwsToolSelectInput;