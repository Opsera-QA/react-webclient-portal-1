import React from "react";
import PropTypes from "prop-types";
import PlatformSsoUserSelectInput
  from "components/common/list_of_values_input/users/sso/platform/PlatformSsoUserSelectInput";

export default function FreeTrialUserActivityReportPlatformSsoUserSelectInput(
  {
    model,
    loadDataFunction,
    fieldName,
    valueField,
    textField,
    className,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    model?.setData(fieldName, selectedOption?._id);
    loadDataFunction(model);
  };

  return (
    <PlatformSsoUserSelectInput
      model={model}
      fieldName={fieldName}
      valueField={valueField}
      className={className}
      textField={textField}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

FreeTrialUserActivityReportPlatformSsoUserSelectInput.propTypes = {
  model: PropTypes.object,
  loadDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
  valueField: PropTypes.string,
  showClearValueButton: PropTypes.bool,
  textField: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

FreeTrialUserActivityReportPlatformSsoUserSelectInput.defaultProps = {
  fieldName: "userId",
};