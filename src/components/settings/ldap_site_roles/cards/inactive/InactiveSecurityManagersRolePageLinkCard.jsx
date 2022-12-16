import React from "react";
import OptionCardBase from "components/common/card/option/OptionCardBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import SiteRoleActivationConfirmationOverlay
  from "components/settings/ldap_site_roles/cards/inactive/SiteRoleActivationConfirmationOverlay";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";

export default function InactiveSecurityManagersRolePageLinkCard() {
  const {
    toastContext,
  } = useComponentStateReference();

  const getBody = () => {
    return "This Site Role has not been activated yet. Click here to begin the activation process.";
  };

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <SiteRoleActivationConfirmationOverlay
        siteRoleName={SiteRoleHelper.SITE_ROLE_GROUP_NAMES.SECURITY_MANAGERS}
      />
    );
  };

  return (
    <OptionCardBase
      // className={className}
      body={getBody()}
      onClickFunction={launchActivationConfirmationOverlay}
    />
  );
}
