import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropType from "prop-types";
import featureFlagConstants from "@opsera/definitions/constants/settings/organization-settings/feature_flags/featureFlag.constants";
import OrganizationSettingsFeatureFlagActivationConfirmationOverlay from "components/admin/organization_settings/details/features/inactive/OrganizationSettingsFeatureFlagActivationConfirmationOverlay";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";

export default function OrganizationSettingsInactiveAiMlChatbotFeatureFlagPageLinkCard(
  {
    organizationDomain,
    organizationAccountId,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <OrganizationSettingsFeatureFlagActivationConfirmationOverlay
        featureFlagName={featureFlagConstants.FEATURE_FLAG_NAMES.AI_ML_CHATBOT}
        organizationDomain={organizationDomain}
        organizationAccountName={organizationAccountId}
      />
    );
  };

  const getBody = () => {
    return (
      <div>
        <div className={"mb-2"}>The {featureFlagConstants.FEATURE_FLAG_NAME_LABELS.AI_ML_CHATBOT} Feature Flag is an optional Feature Flag that Opsera Administrators Administrators can enable.</div>
        <div className={"mb-2"}>By activating this Feature Flag, you can enable the {featureFlagConstants.FEATURE_FLAG_NAME_LABELS.AI_ML_CHATBOT}.</div>
      </div>
    );
  };

  const title = (
    <div className={"d-flex justify-content-between"}>
      <div>{featureFlagConstants.FEATURE_FLAG_NAME_LABELS.AI_ML_CHATBOT}</div>
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

OrganizationSettingsInactiveAiMlChatbotFeatureFlagPageLinkCard.propTypes = {
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
