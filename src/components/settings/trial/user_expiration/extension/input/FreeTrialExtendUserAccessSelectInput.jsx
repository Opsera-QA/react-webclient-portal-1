import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import ExtendableFreeTrialSsoUserSelectInput
  from "components/common/list_of_values_input/users/sso/extendable/ExtendableFreeTrialSsoUserSelectInput";

export default function FreeTrialExtendUserAccessSelectInput(
  {
    className,
    fieldName,
    model,
    setModel,
    clearDataFunction,
  }) {
  const {
    userData,
  } = useComponentStateReference();

  const textFieldFunction = (user) => {
    return (`${user.firstName} ${userData.lastName} (${user.email})`);
  };

  const setDataFunction = (fieldName, selectedOption) => {
    model.setData(fieldName, selectedOption?._id);
    model.setData("alreadyExtended", selectedOption?.extended === true);
    setModel({...model});
  };

  return (
     <ExtendableFreeTrialSsoUserSelectInput
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

FreeTrialExtendUserAccessSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

FreeTrialExtendUserAccessSelectInput.defaultProps = {
  fieldName: "extendUserId",
};