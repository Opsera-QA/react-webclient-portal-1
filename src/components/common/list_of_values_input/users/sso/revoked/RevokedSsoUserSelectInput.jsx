import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetRevokedSsoUsers from "components/common/list_of_values_input/users/sso/revoked/useGetRevokedSsoUsers";

export default function RevokedSsoUserSelectInput(
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
    revokedSsoUsers,
    isLoading,
    error,
  } = useGetRevokedSsoUsers();

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
      selectOptions={revokedSsoUsers}
    />
  );
}

RevokedSsoUserSelectInput.propTypes = {
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

RevokedSsoUserSelectInput.defaultProps = {
  valueField: "_id",
  textField: "email",
  showClearValueButton: true,
};

