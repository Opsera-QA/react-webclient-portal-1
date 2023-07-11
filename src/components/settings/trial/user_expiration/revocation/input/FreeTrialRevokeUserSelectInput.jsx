import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import RevocableFreeTrialSsoUserSelectInput
from "components/common/list_of_values_input/users/sso/revocable/RevocableFreeTrialSsoUserSelectInput";

export default function FreeTrialRevokeUserSelectInput(
  {
    className,
    fieldName,
    model,
    setModel,
    setDataFunction,
    clearDataFunction,
  }) {
  const {
    userData,
  } = useComponentStateReference();

  const textFieldFunction = (user) => {
    return (`${user.firstName} ${userData.lastName} (${user.email})`);
  };

  return (
    <RevocableFreeTrialSsoUserSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      textField={textFieldFunction}
      className={className}
    />
  );
}

FreeTrialRevokeUserSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

FreeTrialRevokeUserSelectInput.defaultProps = {
  fieldName: "revokeUserId",
};