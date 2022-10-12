import React from "react";
import PropTypes from "prop-types";
import PlatformSsoUserSelectFilterSelectInput
  from "components/common/list_of_values_input/users/sso/platform/PlatformSsoUserSelectFilterSelectInput";
import { useHistory } from "react-router-dom";

export default function FreeTrialUserActivityReportInlinePlatformSsoUserFilterSelectInput(
  {
    filterModel,
    fieldName,
    valueField,
    textField,
    className,
    loadDataFunction,
    disabled,
  }) {
  const history = useHistory();

  const setDataFunction = (fieldName, selectedOption) => {
    history.push(`/settings/trial/user/activity-report/users/${selectedOption?._id}`);
  };

  if (loadDataFunction == null) {
    return null;
  }

  return (
    <PlatformSsoUserSelectFilterSelectInput
      fieldName={fieldName}
      valueField={valueField}
      className={className}
      textField={textField}
      setDataFunction={setDataFunction}
      filterModel={filterModel}
      inline={true}
      disabled={disabled}
    />
  );
}

FreeTrialUserActivityReportInlinePlatformSsoUserFilterSelectInput.propTypes = {
  filterModel: PropTypes.object,
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
