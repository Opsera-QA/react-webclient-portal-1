import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropType from "prop-types";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";
import OrganizationSettingsEntitlementActivationConfirmationOverlay
  from "components/admin/organization_settings/details/entitlements/inactive/OrganizationSettingsEntitlementActivationConfirmationOverlay";

export default function OrganizationSettingsInactiveTestEntitlementPageLinkCard(
  {
    organizationDomain,
    organizationAccountId,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <OrganizationSettingsEntitlementActivationConfirmationOverlay
        entitlementName={entitlementConstants.ENTITLEMENT_NAME_LABELS.TEST_ENTITLEMENT}
        organizationDomain={organizationDomain}
        organizationAccountName={organizationAccountId}
      />
    );
  };

  const getBody = () => {
    return (
      <div>
        <div className={"mb-2"}>The {entitlementConstants.ENTITLEMENT_NAME_LABELS.TEST_ENTITLEMENT} Feature Flag is an optional Feature Flag that Opsera Administrators Administrators can enable.</div>
        <div className={"mb-2"}>This Entitlement does nothing but is used to test the CRUD functionality of Entitlements</div>
      </div>
    );
  };

  const title = (
    <div className={"d-flex justify-content-between"}>
      <div>{entitlementConstants.ENTITLEMENT_NAME_LABELS.TEST_ENTITLEMENT}</div>
    </div>
  );

  return (
    <SelectionCardBase
      className={"my-3"}
      titleText={title}
      inactive={true}
      body={getBody()}
      onClickFunction={launchActivationConfirmationOverlay}
    />
  );
}

OrganizationSettingsInactiveTestEntitlementPageLinkCard.propTypes = {
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
