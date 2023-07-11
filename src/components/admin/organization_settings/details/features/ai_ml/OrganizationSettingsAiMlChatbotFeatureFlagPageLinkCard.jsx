import React from "react";
import PropType from "prop-types";
import OrganizationSettingsFeatureFlagsPageLinkCardBase
from "components/admin/organization_settings/details/features/OrganizationSettingsFeatureFlagsPageLinkCardBase";
import OrganizationSettingsInactiveAiMlChatbotFeatureFlagPageLinkCard
from "components/admin/organization_settings/details/features/ai_ml/OrganizationSettingsInactiveAiMlChatbotFeatureFlagPageLinkCard";

export default function OrganizationSettingsAiMlChatbotFeatureFlagPageLinkCard(
  {
    featureFlag,
    organizationDomain,
    organizationAccountId,
  }) {
  if (featureFlag == null) {
    return (
      <OrganizationSettingsInactiveAiMlChatbotFeatureFlagPageLinkCard
        organizationDomain={organizationDomain}
        organizationAccountId={organizationAccountId}
      />
    );
  }

  return (
    <OrganizationSettingsFeatureFlagsPageLinkCardBase
      featureFlag={featureFlag}
      organizationDomain={organizationDomain}
      organizationAccountId={organizationAccountId}
    />
  );
}

OrganizationSettingsAiMlChatbotFeatureFlagPageLinkCard.propTypes = {
  featureFlag: PropType.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
