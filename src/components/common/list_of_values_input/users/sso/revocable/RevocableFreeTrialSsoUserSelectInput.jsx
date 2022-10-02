import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetRevocableFreeTrialSsoUsers
  from "components/common/list_of_values_input/users/sso/revocable/useGetRevocableFreeTrialSsoUsers";

export default function RevocableFreeTrialSsoUserSelectInput(
  {
    model,
    setModel,
    fieldName,
    valueField,
    textField,
    showClearValueButton,
    setDataFunction,
    className,
    disabled,
  }) {
  const {
    revocableFreeTrialUsers,
    isLoading,
    error,
  } = useGetRevocableFreeTrialSsoUsers();

  return (
    <SelectInputBase
      fieldName={fieldName}
      busy={isLoading}
      valueField={valueField}
      className={className}
      error={error}
      textField={textField}
      showClearValueButton={showClearValueButton}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      dataObject={model}
      selectOptions={revocableFreeTrialUsers}
      disabled={disabled}
    />
  );
}

RevocableFreeTrialSsoUserSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  valueField: PropTypes.string,
  showClearValueButton: PropTypes.bool,
  textField: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
};

RevocableFreeTrialSsoUserSelectInput.defaultProps = {
  valueField: "_id",
  textField: "email",
  showClearValueButton: true,
};

