import React from "react";
import PropTypes from "prop-types";
import MultiSelectCheckboxInputBase from "components/common/inputs/boolean/checkbox/MultiSelectCheckboxInputBase";
import siteRoleGroupConstants from "@opsera/know-your-role/constants/siteRoleGroup.constants";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function SiteRoleMultiSelectCheckboxInput(
  {
    fieldName,
    className,
    model,
    setModel,
    setDataFunction,
    disabled,
    visible,
  }) {
  const {
    isSaasUser,
  } = useComponentStateReference();

  if (isSaasUser !== false) {
    return null;
  }

  return (
    <MultiSelectCheckboxInputBase
      model={model}
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      checkboxOptions={siteRoleGroupConstants.SITE_ROLE_GROUP_SELECT_OPTIONS}
      setModel={setModel}
      className={className}
      singularTopic={"Site Role"}
      pluralTopic={"Site Roles"}
      disabled={disabled}
      visible={visible}
    />
  );
}

SiteRoleMultiSelectCheckboxInput.propTypes = {
  fieldName: PropTypes.string,
  className: PropTypes.string,
  model: PropTypes.object,
  setDataFunction: PropTypes.func,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};