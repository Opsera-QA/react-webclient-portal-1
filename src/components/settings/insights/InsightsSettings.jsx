import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AccountSettingsSubNavigationBar from "components/settings/AccountSettingsSubNavigationBar";
import InsightsSettingsHelpDocumentation
  from "components/common/help/documentation/settings/InsightsSettingsHelpDocumentation";
import InsightsSettingsPageLinkCards from "components/settings/insights/InsightsSettingsPageLinkCards";

export default function InsightsSettings() {
  return (
    <ScreenContainer
      breadcrumbDestination={"insightsSettings"}
      helpComponent={<InsightsSettingsHelpDocumentation />}
      navigationTabContainer={
        <AccountSettingsSubNavigationBar
          activeTab={"insightsSettings"}
        />
      }
    >
      <InsightsSettingsPageLinkCards />
    </ScreenContainer>
  );
}

