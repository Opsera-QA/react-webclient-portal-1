import React from "react";
import PropTypes from "prop-types";
import AccessTokenUsageUserSelectInput
  from "components/common/list_of_values_input/access_tokens/AccessTokenUsageUserSelectInput";

export default function InlineAccessTokenUsageUserSelectInput(
  {
    model,
    fieldName,
    loadDataFunction,
  }) {
  const setDataFunction = (fieldName, user) => {
    model.setData(fieldName, user?._id);
    loadDataFunction(model);
  };

  const clearDataFunction = () => {
    model.setDefaultValue(fieldName);
    loadDataFunction(model);
  };

  return (
    <AccessTokenUsageUserSelectInput
      model={model}
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
}

InlineAccessTokenUsageUserSelectInput.propTypes = {
  model: PropTypes.object,
  loadDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
};
