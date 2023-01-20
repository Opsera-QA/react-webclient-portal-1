import React from "react";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import PropTypes from "prop-types";
import AccountSettingsSubNavigationBarBase from "components/settings/AccountSettingsSubNavigationBarBase";

export default function AccountSettingsSubNavigationBar({activeTab}) {
  return (
    <NavigationTabContainer>
      <AccountSettingsSubNavigationBarBase
        activeTab={activeTab}
      />
    </NavigationTabContainer>
  );
}

AccountSettingsSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};
