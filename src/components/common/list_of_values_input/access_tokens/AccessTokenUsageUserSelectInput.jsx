import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetUsersByAccessTokenUsage from "hooks/access_tokens/logs/useGetUsersByAccessTokenUsage";

export default function AccessTokenUsageUserSelectInput(
  {
    model,
    setModel,
    fieldName,
    setDataFunction,
    clearDataFunction,
  }) {
  const { isSaasUser } = useComponentStateReference();
  const {
    error,
    users,
    isLoading,
    loadData,
  } = useGetUsersByAccessTokenUsage();

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
      loadDataFunction={loadData}
      error={error}
      selectOptions={users}
      textField={"owner_name"}
      isLoading={isLoading}
      valueField={"_id"}
    />
  );
}

AccessTokenUsageUserSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
};
