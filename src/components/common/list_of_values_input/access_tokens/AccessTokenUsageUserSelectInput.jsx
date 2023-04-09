import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export default function AccessTokenUsageUserSelectInput(
  {
    model,
    setModel,
    fieldName,
    setDataFunction,
    clearDataFunction,
    loadDataFunction,
  }) {
  const { isSaasUser } = useComponentStateReference();

  if (isSaasUser === true) {
    return null;
  }

  return (
    <SelectInputBase
      dataObject={model}
      setDataObject={setModel}
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      loadDataFunction={loadDataFunction}
    />
  );
}

AccessTokenUsageUserSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  loadDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
};
