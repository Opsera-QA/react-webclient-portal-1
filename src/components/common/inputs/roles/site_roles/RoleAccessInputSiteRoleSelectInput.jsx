import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

// TODO: Move to constants library
export const SITE_ROLE_SELECT_OPTIONS = [
  {text: "Power User", value: SiteRoleHelper.SITE_ROLES.POWER_USER},
  {text: "User", value: SiteRoleHelper.SITE_ROLES.USER},
  {text: "Security Manager", value: SiteRoleHelper.SITE_ROLES.SECURITY_MANAGER},
];

export default function RoleAccessInputSiteRoleSelectInput(
  {
    model,
    setModel,
    setDataFunction,
    fieldName,
    disabled,
    className,
    roles,
  }) {
  const getDisabledSiteRoles = () => {
    if (roles.length > 0) {
      const disabledGroups = [];

      roles.forEach((role) => {
        const siteRole = DataParsingHelper.parseString(role?.site_role);

        if (siteRole) {
          const foundGroup = SITE_ROLE_SELECT_OPTIONS?.find((siteRole) => siteRole?.value === siteRole);

          if (foundGroup) {
            disabledGroups.push(foundGroup);
          }
        }
      });

      return disabledGroups;
    }
  };

  return (
    <SelectInputBase
      dataObject={model}
      setDataObject={setModel}
      fieldName={fieldName}
      className={className}
      selectOptions={SITE_ROLE_SELECT_OPTIONS}
      disabled={disabled || getDisabledSiteRoles()}
      setDataFunction={setDataFunction}
      singularTopic={"Site Role"}
      pluralTopic={"Site Roles"}
      textField={"text"}
      valueField={"value"}
    />
  );
}

RoleAccessInputSiteRoleSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  roles: PropTypes.array,
};

RoleAccessInputSiteRoleSelectInput.defaultProps = {
  fieldName: "site_role",
};
