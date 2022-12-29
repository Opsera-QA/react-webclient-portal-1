import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import SiteRoleActivationConfirmationOverlay
  from "components/settings/ldap_site_roles/cards/inactive/SiteRoleActivationConfirmationOverlay";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import {accountSettingsTrails} from "components/settings/accountSettings.trails";

export default function InactiveAuditorsRolePageLinkCard() {
  const {
    toastContext,
  } = useComponentStateReference();

  const getBody = () => {
    return (
      <div>
        <div>{accountSettingsTrails.ldapAuditorsSiteRoleDetailView.pageDescription}</div>
        <div className={"mt-2"}>{`This Site Role has not been activated yet. Click here to begin the activation process.`}</div>
      </div>
    );
  };

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <SiteRoleActivationConfirmationOverlay
        siteRoleName={SiteRoleHelper.SITE_ROLE_GROUP_NAMES.AUDITORS}
        siteRole={SiteRoleHelper.SITE_ROLES.AUDITOR}
      />
    );
  };

  return (
    <SelectionCardBase
      className={"my-3"}
      titleText={accountSettingsTrails.ldapAuditorsSiteRoleDetailView.title}
      inactive={true}
      body={getBody()}
      onClickFunction={launchActivationConfirmationOverlay}
    />
  );
}
