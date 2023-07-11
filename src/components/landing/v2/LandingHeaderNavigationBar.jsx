import React, {useEffect} from "react";
import { Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";
import useLocationReference from "hooks/useLocationReference";
import {SubMenuContainer, SubMenuItem} from "@opsera/react-vanity-set";
import GitCustodianRoleHelper from "@opsera/know-your-role/roles/compliance/git_custodian/gitCustodianRole.helper";
import useGetPlatformSettingsFeatureFlagByName from "hooks/platform/settings/useGetPlatformSettingsFeatureFlagByName";
import platformSettingFeatureConstants
from "@opsera/definitions/constants/platform/settings/features/platformSettingFeature.constants";
import sessionHelper from "utils/session.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import entitlementConstants
from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";
import useGetOrganizationSettingsEntitlementByName
from "hooks/settings/organization_settings/entitlements/useGetOrganizationSettingsEntitlementByName";
import useGetSalesforceFeatureOrganizationSettingsEntitlement
from "hooks/settings/organization_settings/entitlements/useGetSalesforceFeatureOrganizationSettingsEntitlement";

const HEADER_NAVIGATION_SCREENS = {
  HOME: "home",
  WORKSPACE: "workspace",
  UNIFIED_INSIGHTS: "insights",
  GIT_CUSTODIAN: "gitCustodian",
  SALESFORCE_LANDING: "salesforceLanding",
};

const getActiveScreen = (currentPath) => {
  if (currentPath === "/") {
    return HEADER_NAVIGATION_SCREENS.HOME;
  }

  if (currentPath?.startsWith("/workspace")) {
    return HEADER_NAVIGATION_SCREENS.WORKSPACE;
  }

  if (currentPath?.startsWith("/salesforce")) {
    return HEADER_NAVIGATION_SCREENS.SALESFORCE_LANDING;
  }

  // if (currentPath?.startsWith("/unified-insights")) {
  if (currentPath?.startsWith("/insights")) {
    return HEADER_NAVIGATION_SCREENS.UNIFIED_INSIGHTS;
  }

  if (currentPath === "/git-custodian") {
    return HEADER_NAVIGATION_SCREENS.GIT_CUSTODIAN;
  }

  return "other";
};

export default function LandingHeaderNavigationBar() {
  const history = useHistory();
  const {
    currentPath,
    isPublicPathState
  } = useLocationReference();
  const {
    themeConstants,
    userData,
  } = useComponentStateReference();
  const {isActive} = useGetPlatformSettingsFeatureFlagByName(platformSettingFeatureConstants.IN_USE_PLATFORM_SETTING_FEATURE_NAMES.NEXT_GENERATION_TOP_NAVIGATION_BAR);
  const nextGenerationWorkspace = useGetPlatformSettingsFeatureFlagByName(platformSettingFeatureConstants.IN_USE_PLATFORM_SETTING_FEATURE_NAMES.NEXT_GENERATION_WORKSPACE);
  const {isSalesforceLandingPageEnabled} = useGetSalesforceFeatureOrganizationSettingsEntitlement();
  const fromWorkspaceUrlParameter = sessionHelper.getStoredUrlParameter("fromWorkspace");
  const fromWorkspace = DataParsingHelper.parseBooleanV2(fromWorkspaceUrlParameter);

  useEffect(() => {}, [currentPath]);

  const handleScreenClick = (newScreen) => {
    switch (newScreen) {
      case HEADER_NAVIGATION_SCREENS.HOME:
        if (currentPath !== "/") {
          history.push("/");
        }
        break;
      case HEADER_NAVIGATION_SCREENS.WORKSPACE:
        if (currentPath !== "/workspace") {
          history.push("/workspace");
        }
        break;
      case HEADER_NAVIGATION_SCREENS.SALESFORCE_LANDING:
      // if (currentPath !== "/unified-insights") {
      //   history.push("/unified-insights");
      // }
        if (currentPath !== "/salesforce") {
          history.push("/salesforce");
        }
        break;
      case HEADER_NAVIGATION_SCREENS.UNIFIED_INSIGHTS:
      // if (currentPath !== "/unified-insights") {
      //   history.push("/unified-insights");
      // }
        if (currentPath !== "/insights") {
          history.push("/insights");
        }
        break;
      case HEADER_NAVIGATION_SCREENS.GIT_CUSTODIAN:
        if (currentPath !== "/git-custodian") {
          history.push("/git-custodian");
        }
        break;
    }
  };

  if (!userData || isPublicPathState === true || isActive !== true) {
    return null;
  }

  return (
    <Navbar.Collapse className={"h-100 d-flex mx-2"}>
      <SubMenuContainer className={"mx-auto"}>
        <SubMenuItem
          className={"px-3"}
          itemKey={HEADER_NAVIGATION_SCREENS.HOME}
          activeKey={getActiveScreen(currentPath)}
          setActiveKey={handleScreenClick}
          label={"Home"}
          disabled={currentPath === "/"}
        />
        <SubMenuItem
          className={"px-3"}
          activeKey={fromWorkspace === true ? HEADER_NAVIGATION_SCREENS.WORKSPACE : getActiveScreen(currentPath)}
          setActiveKey={handleScreenClick}
          label={"Workspace"}
          itemKey={HEADER_NAVIGATION_SCREENS.WORKSPACE}
          disabled={currentPath?.startsWith("/workspace") === true}
          visible={nextGenerationWorkspace?.platformSettingsFeatureFlag?.active === true}
        />
        <SubMenuItem
          className={"px-3"}
          activeKey={getActiveScreen(currentPath)}
          setActiveKey={handleScreenClick}
          label={<div>Salesforce</div>}
          itemKey={HEADER_NAVIGATION_SCREENS.SALESFORCE_LANDING}
          disabled={currentPath?.startsWith("/salesforce") === true}
          visible={isSalesforceLandingPageEnabled === true}
        />
        <SubMenuItem
          className={"px-3"}
          activeKey={getActiveScreen(currentPath)}
          setActiveKey={handleScreenClick}
          label={<div className={"no-wrap-inline"}><span className={"no-wrap d-none d-lg-inline-block mr-1"}>{`Unified`}</span>Insights</div>}
          itemKey={HEADER_NAVIGATION_SCREENS.UNIFIED_INSIGHTS}
          disabled={currentPath?.startsWith("/unified-insights") === true}
        />
        <SubMenuItem
          className={"px-3"}
          activeKey={getActiveScreen(currentPath)}
          setActiveKey={handleScreenClick}
          label={<div>Git Custodian</div>}
          itemKey={HEADER_NAVIGATION_SCREENS.GIT_CUSTODIAN}
          disabled={currentPath?.startsWith("/git-custodian") === true}
          visible={GitCustodianRoleHelper.canViewGitCustodian(userData) === true}
        />
      </SubMenuContainer>
    </Navbar.Collapse>
  );
}

