import React from "react";
import PropTypes from "prop-types";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";
import OrganizationSettingsActivateEntitlementButton
  from "components/admin/organization_settings/details/entitlements/inactive/OrganizationSettingsActivateEntitlementButton";
import useGetNewEntitlementModel from "hooks/settings/organization_settings/entitlements/useGetNewEntitlementModel";

export default function OrganizationSettingsEntitlementActivationConfirmationOverlay(
  {
    entitlementName,
    organizationDomain,
    organizationAccountName,
  }) {
  const {
    entitlementModel,
  } = useGetNewEntitlementModel();
  entitlementModel?.setData("name", entitlementName);
  const {
    toastContext,
  } = useComponentStateReference();

  const getFormattedRoleLabel = () => {
    const label = DataParsingHelper.parseString(entitlementConstants.getEntitlementNameLabel(entitlementName));

    if (label) {
      return (
        <b>{label}</b>
      );
    }
  };

  const closeOverlayFunction = () => {
    toastContext.clearOverlayPanel();
  };

  return (
    <ConfirmationOverlay
      closePanel={closeOverlayFunction}
      showPanel={true}
      titleText={`Activate Entitlement?`}
      titleIcon={faQuestionCircle}
      showToasts={true}
      showCloseButton={false}
    >
      <OverlayPanelBodyContainer
        hideCloseButton={true}
      >
        <div className={"mx-3 mb-3 mt-2"}>
          <div>Are you sure you would like to activate the {getFormattedRoleLabel()} Entitlement?</div>
          <div
            style={{
              marginTop: "150px",
            }}
          />
          <ButtonContainerBase>
            <OrganizationSettingsActivateEntitlementButton
              entitlementModel={entitlementModel}
              organizationDomain={organizationDomain}
              organizationAccountName={organizationAccountName}
              closeOverlayFunction={closeOverlayFunction}
            />
          </ButtonContainerBase>
        </div>
      </OverlayPanelBodyContainer>
    </ConfirmationOverlay>
  );
}

OrganizationSettingsEntitlementActivationConfirmationOverlay.propTypes = {
  entitlementName: PropTypes.string,
  organizationDomain: PropTypes.string,
  organizationAccountName: PropTypes.string,
};
