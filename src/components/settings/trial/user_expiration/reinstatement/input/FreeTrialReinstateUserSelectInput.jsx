import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import ActiveSsoUserSelectInput from "components/common/list_of_values_input/users/sso/active/ActiveSsoUserSelectInput";
import RevokedSsoUserSelectInput
  from "components/common/list_of_values_input/users/sso/revoked/RevokedSsoUserSelectInput";

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
     <RevokedSsoUserSelectInput
       fieldName={fieldName}
       model={model}
       setModel={setModel}
       setDataFunction={setDataFunction}
       clearDataFunction={clearDataFunction}
       textField={textFieldFunction}
       disabled={[userData?._id]}
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
  fieldName: "activeUserId",
};