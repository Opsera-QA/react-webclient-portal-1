import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedApigeeToolSelectInput from "components/common/list_of_values_input/tools/apigee/RoleRestrictedApigeeToolSelectInput";

function ApigeeExportOrgSelectInput(
  {
    className,
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  return (
    <RoleRestrictedApigeeToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      disabled={disabled}
      className={className}
    />
  );
}

ApigeeExportOrgSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string
};

ApigeeExportOrgSelectInput.defaultProps = {
  fieldName: "targetToolConfigId",
};

export default ApigeeExportOrgSelectInput;
