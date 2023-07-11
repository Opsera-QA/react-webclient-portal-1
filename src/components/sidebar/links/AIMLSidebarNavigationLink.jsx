import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faMicrochipAi} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetOrganizationSettingsFeatureFlagModelByName
from "../../../hooks/settings/organization_settings/feature_flags/useGetOrganizationSettingsFeatureFlagModelByName";
import featureFlagConstants
from "@opsera/definitions/constants/settings/organization-settings/feature_flags/featureFlag.constants";

export default function AIMLSidebarNavigationLink({ isSidebarCollapsed, }) {
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    isActive
  } = useGetOrganizationSettingsFeatureFlagModelByName(featureFlagConstants.FEATURE_FLAG_NAMES.AI_ML_CHATBOT);

  if (isOpseraAdministrator !== true) {
    return null;
  }

  if (!isActive) {
    return null;
  }

  return (
    <SidebarNavigationLinkBase
      link={`/ai`}
      label={"AI Chatbot"}
      icon={faMicrochipAi}
      isSidebarCollapsed={isSidebarCollapsed}
    />
  );
}

AIMLSidebarNavigationLink.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};
