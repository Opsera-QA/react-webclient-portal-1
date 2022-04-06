import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import ApiResponseBodyTypeSelectInput
  from "components/common/list_of_values_input/api/response/body/type/ApiResponseBodyTypeSelectInput";

function EndpointResponseBodyTypeSelectInput(
  {
    model,
    setModel,
    fieldName,
    disabled,
    resetFields,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel.setData(fieldName, selectedOption?.value);
    newModel.setDefaultValue("responseBodyFields");
    resetFields();
    setModel({...newModel});
  };

  return (
    <ApiResponseBodyTypeSelectInput
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      fieldName={fieldName}
      disabled={disabled}
    />
  );
}

EndpointResponseBodyTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
  resetFields: PropTypes.func,
};

export default EndpointResponseBodyTypeSelectInput;