import React  from "react";
import PropTypes from "prop-types";
import PageLinkCard from "components/common/card/link/PageLinkCard";
import {adminToolsTrails} from "components/admin/adminTools.trails";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {organizationSettingsHelper} from "components/admin/organization_settings/organizationSettings.helper";

export default function SpecificOrganizationAccountSettingsPageLinkCard(
  {
    visible,
    className,
    organizationDomain,
    organizationAccountId,
  }) {
  const link = organizationSettingsHelper.getDetailViewLink(organizationDomain, organizationAccountId);

  if (hasStringValue(link) !== true) {
    return null;
  }

  return (
    <PageLinkCard
      linkText={"Manage Feature Flags, Policies, and Customer Entitlements"}
      pageDescription={"Click here to manage Organization Settings for this account"}
      className={className}
      link={link}
      visible={visible}
      icon={adminToolsTrails.ldapOrganizationSettingsManagement.icon}
    />
  );
}

SpecificOrganizationAccountSettingsPageLinkCard.propTypes = {
  organizationDomain: PropTypes.string,
  organizationAccountId: PropTypes.string,
  visible: PropTypes.bool,
  className: PropTypes.string,
};
