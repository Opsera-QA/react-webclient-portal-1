import React from "react";
import PropTypes from "prop-types";
import SiteRoleMultiSelectCheckboxInput
  from "components/common/list_of_values_input/ldap/site_roles/SiteRoleMultiSelectCheckboxInput";

export default function InlineSiteRoleMultiSelectCheckboxFilterInput(
  {
    fieldName,
    className,
    model,
    setModel,
    disabled,
    visible,
    loadDataFunction,
  }) {
  const setDataFunction = (fieldName, newValue) => {
    model?.setData(fieldName, newValue);
    loadDataFunction(model);
  };

  return (
    <SiteRoleMultiSelectCheckboxInput
      model={model}
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      setModel={setModel}
      className={className}
      disabled={disabled}
      visible={visible}
    />
  );
}

InlineSiteRoleMultiSelectCheckboxFilterInput.propTypes = {
  fieldName: PropTypes.string,
  className: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  loadDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};