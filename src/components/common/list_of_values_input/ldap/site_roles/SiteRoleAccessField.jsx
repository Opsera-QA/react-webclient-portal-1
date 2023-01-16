import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import siteRoleConstants from "@opsera/know-your-role/constants/siteRole.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import BooleanFieldBase from "components/common/fields/boolean/BooleanFieldBase";

export default function SiteRoleAccessField(
  {
    fieldName,
    className,
    model,
  }) {
  const field = model?.getFieldById(fieldName);
  const siteRoles = DataParsingHelper.parseArray(model?.getData(fieldName), []);
  const {
    isSaasUser,
  } = useComponentStateReference();

  if (isSaasUser !== false || field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel
        field={field}
      />
      <BooleanFieldBase
        label={siteRoleConstants.SITE_ROLE_LABELS.ADMINISTRATOR}
        value={siteRoles?.includes(siteRoleConstants.SITE_ROLES.ADMINISTRATOR)}
      />
      <BooleanFieldBase
        label={siteRoleConstants.SITE_ROLE_LABELS.POWER_USER}
        value={siteRoles?.includes(siteRoleConstants.SITE_ROLES.POWER_USER)}
      />
      <BooleanFieldBase
        label={siteRoleConstants.SITE_ROLE_LABELS.USER}
        value={siteRoles?.includes(siteRoleConstants.SITE_ROLES.USER)}
      />
      <BooleanFieldBase
        label={siteRoleConstants.SITE_ROLE_LABELS.SECURITY_MANAGER}
        value={siteRoles?.includes(siteRoleConstants.SITE_ROLES.SECURITY_MANAGER)}
      />
      <BooleanFieldBase
        label={siteRoleConstants.SITE_ROLE_LABELS.AUDITOR}
        value={siteRoles?.includes(siteRoleConstants.SITE_ROLES.AUDITOR)}
      />
      <BooleanFieldBase
        label={siteRoleConstants.SITE_ROLE_LABELS.GUEST}
        value={siteRoles?.includes(siteRoleConstants.SITE_ROLES.GUEST)}
      />
    </FieldContainer>
  );
}

SiteRoleAccessField.propTypes = {
  fieldName: PropTypes.string,
  className: PropTypes.string,
  model: PropTypes.object,
};