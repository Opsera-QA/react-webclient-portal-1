import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import ToolchainSidebarNavigationLink from "components/sidebar/links/ToolchainSidebarNavigationLink";
import PipelinesSidebarNavigationLink from "components/sidebar/links/PipelinesSidebarNavigationLink";
import InsightsSidebarNavigationLink from "components/sidebar/links/InsightsSidebarNavigationLink";
import HomeSidebarNavigationLink from "components/sidebar/links/HomeSidebarNavigationLink";
import AdminToolsSidebarNavigationLink from "components/sidebar/links/AdminToolsSidebarNavigationLink";
import useComponentStateReference from "hooks/useComponentStateReference";
import ToolRegistrySidebarNavigationLink from "components/sidebar/links/ToolRegistrySidebarNavigationLink";
import SettingsSidebarNavigationLink from "components/sidebar/links/SettingsSidebarNavigationLink";
import ReportsSidebarNavigationLink from "components/sidebar/links/ReportsSidebarNavigationLink";
import NotificationsSidebarNavigationLink from "components/sidebar/links/NotificationsSidebarNavigationLink";
import BlueprintsSidebarNavigationLink from "components/sidebar/links/BlueprintsSidebarNavigationLink";
import LogsSidebarNavigationLink from "components/sidebar/links/LogsSidebarNavigationLink";
import TasksSidebarNavigationLink from "components/sidebar/links/TasksSidebarNavigationLink";
import ToggleSidebarSizeIcon from "components/sidebar/ToggleSidebarSizeIcon";
import SidebarSubheaderText from "components/sidebar/SidebarSubheaderText";
import sessionHelper from "utils/session.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import GitCustodianSidebarNavigationLink from "components/sidebar/links/GitCustodianSidebarNavigationLink";
import useLocationReference from "hooks/useLocationReference";
import InnovationLabsNavigationLinks from "components/sidebar/links/InnovationLabsNavigationLinks";
import useGetOrganizationSettingsFeatureFlagModelByName
  from "hooks/settings/organization_settings/feature_flags/useGetOrganizationSettingsFeatureFlagModelByName";
import featureFlagConstants
  from "@opsera/definitions/constants/settings/organization-settings/feature_flags/featureFlag.constants";

export default function Sidebar({ hideSideBar }) {
  const { userData } = useComponentStateReference();
  const { isPublicPathState } = useLocationReference();
  const {
    isActive,
  } = useGetOrganizationSettingsFeatureFlagModelByName(featureFlagConstants.FEATURE_FLAG_NAMES.SHOW_INSIGHTS_VNEXT_SIDEBAR_LINK);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(DataParsingHelper.parseBooleanV2(sessionHelper.getCookie(sessionHelper.SUPPORTED_COOKIE_STORAGE_KEYS.COLLAPSE_SIDEBAR), true));

  useEffect(() => {}, [isSidebarCollapsed, hideSideBar, isActive]);
  const getVnextSidebarLink = () => {
    if (isActive === true) {
      return (
        <InnovationLabsNavigationLinks
          isSidebarCollapsed={isSidebarCollapsed}
        />
      );
    }
  };

  const getClassNames = () => {
    if (isSidebarCollapsed === true) {
      return "d-block sidebar-container mx-2";
    }

    if (isActive === true) {
      return "temp-sidebar-width d-block sidebar-container";
    }

    return "w-20 d-block sidebar-container";
  };

  if (
    userData == null
    || hideSideBar === true
    || isPublicPathState === true
  ) {
    return null;
  }

  return (
    <div
      className={getClassNames()}
    >
      <div className={"sticky-top py-3 sidebar-menu"}>
        <HomeSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <SidebarSubheaderText
          isSidebarCollapsed={isSidebarCollapsed}
          subheaderText={"Products"}
        />
        <ToolchainSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <PipelinesSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <InsightsSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {getVnextSidebarLink()}
        <SidebarSubheaderText
          isSidebarCollapsed={isSidebarCollapsed}
          subheaderText={"Operations"}
        />
        <ToolRegistrySidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <TasksSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <GitCustodianSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <LogsSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <BlueprintsSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <ReportsSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <NotificationsSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <SettingsSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <AdminToolsSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <ToggleSidebarSizeIcon
          isSidebarCollapsed={isSidebarCollapsed === true}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          className={"mt-3 collapse-icon"}
        />
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  hideSideBar: PropTypes.bool,
};
