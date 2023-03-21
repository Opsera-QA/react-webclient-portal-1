import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AccountSettingsSubNavigationBar from "components/settings/AccountSettingsSubNavigationBar";
import AccountSettingsPageLinkCards from "components/settings/AccountSettingsPageLinkCards";
import AccountSettingsHelpDocumentation from "../common/help/documentation/settings/AccountSettingsHelpDocumentation";
import FreeTrialAccountSettingsPageLinkCards from "components/settings/FreeTrialAccountSettingsPageLinkCards";

export default function AccountSettings() {
  return (
    <ScreenContainer
      breadcrumbDestination={"accountSettings"}
      helpComponent={<AccountSettingsHelpDocumentation/>}
      navigationTabContainer={<AccountSettingsSubNavigationBar activeTab={"accountSettings"} />}
    >
      <AccountSettingsPageLinkCards />
      <FreeTrialAccountSettingsPageLinkCards />
    </ScreenContainer>
  );
}

