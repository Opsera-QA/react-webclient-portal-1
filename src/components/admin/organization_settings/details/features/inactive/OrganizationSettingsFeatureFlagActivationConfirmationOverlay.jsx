import React from "react";
import PropTypes from "prop-types";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import featureFlagConstants
  from "@opsera/definitions/constants/settings/organization-settings/feature_flags/featureFlag.constants";
import useGetNewFeatureFlagModel from "hooks/settings/organization_settings/feature_flags/useGetNewFeatureFlagModel";
import OrganizationSettingsActivateFeatureFlagButton
  from "components/admin/organization_settings/details/features/inactive/OrganizationSettingsActivateFeatureFlagButton";

export default function OrganizationSettingsFeatureFlagActivationConfirmationOverlay(
  {
    featureFlagName,
    organizationDomain,
    organizationAccountName,
  }) {
  const {
    featureFlagModel,
    setFeatureFlagModel,
  } = useGetNewFeatureFlagModel();
  featureFlagModel?.setData("name", featureFlagName);
  const {
    toastContext,
  } = useComponentStateReference();

  const getFormattedRoleLabel = () => {
    const label = DataParsingHelper.parseString(featureFlagConstants.getFeatureFlagNameLabel(featureFlagName));

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
      titleText={`Activate Feature Flag?`}
      titleIcon={faQuestionCircle}
      showToasts={true}
      showCloseButton={false}
    >
      <OverlayPanelBodyContainer
        hideCloseButton={true}
      >
        <div className={"mx-3 mb-3 mt-2"}>
          <div>Are you sure you would like to activate the {getFormattedRoleLabel()} Feature Flag?</div>
          <div
            style={{
              marginTop: "150px",
            }}
          />
          <ButtonContainerBase>
            <OrganizationSettingsActivateFeatureFlagButton
              featureFlagModel={featureFlagModel}
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

OrganizationSettingsFeatureFlagActivationConfirmationOverlay.propTypes = {
  featureFlagName: PropTypes.string,
  organizationDomain: PropTypes.string,
  organizationAccountName: PropTypes.string,
};
