import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetExtendableFreeTrialSsoUsers
  from "components/common/list_of_values_input/users/sso/extendable/useGetExtendableFreeTrialSsoUsers";

export default function ExtendableFreeTrialSsoUserSelectInput(
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
    extendableSsoUsers,
    isLoading,
    error,
  } = useGetExtendableFreeTrialSsoUsers();

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
      selectOptions={extendableSsoUsers}
      disabled={disabled}
    />
  );
}

ExtendableFreeTrialSsoUserSelectInput.propTypes = {
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

ExtendableFreeTrialSsoUserSelectInput.defaultProps = {
  valueField: "_id",
  textField: "email",
  showClearValueButton: true,
};

