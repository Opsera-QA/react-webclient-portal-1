import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetActiveSsoUsers from "components/common/list_of_values_input/users/sso/active/useGetActiveSsoUsers";

export default function ActiveSsoUserSelectInput(
  {
    model,
    setModel,
    fieldName,
    valueField,
    textField,
    showClearValueButton,
    setDataFunction,
    className,
  }) {
  const {
    activeSsoUsers,
    isLoading,
    error,
  } = useGetActiveSsoUsers();

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
      selectOptions={activeSsoUsers}
    />
  );
}

ActiveSsoUserSelectInput.propTypes = {
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
};

ActiveSsoUserSelectInput.defaultProps = {
  valueField: "_id",
  textField: "email",
  showClearValueButton: true,
};

