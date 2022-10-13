import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetPlatformSsoUsers from "components/common/list_of_values_input/users/sso/platform/useGetPlatformSsoUsers";

export default function PlatformSsoUserSelectInput(
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
    platformSsoUsers,
    isLoading,
    error,
  } = useGetPlatformSsoUsers();

  return (
    <SelectInputBase
      fieldName={fieldName}
      busy={isLoading}
      error={error}
      valueField={valueField}
      className={className}
      textField={textField}
      showClearValueButton={showClearValueButton}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      dataObject={model}
      selectOptions={platformSsoUsers}
      pluralTopic={"Users"}
      singularTopic={"User"}
      disabled={disabled}
    />
  );
}

PlatformSsoUserSelectInput.propTypes = {
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
  disabled: PropTypes.bool,
};

PlatformSsoUserSelectInput.defaultProps = {
  valueField: "_id",
  textField: "email",
  showClearValueButton: true,
};

