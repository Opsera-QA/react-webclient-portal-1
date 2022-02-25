import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faUserPlus} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function LdapCustomerOnboardingSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
      case "customerOnboarding":
        history.push(`/accounts/create`);
        return;
    }
  };

  return (
    <NavigationTabContainer>
      <NavigationTab
        icon={faArrowLeft}
        tabName={"adminTools"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Back to Admin Tools"}
      />
      <NavigationTab
        icon={faUserPlus}
        tabName={"customerOnboarding"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Customer Onboarding"}
      />
    </NavigationTabContainer>
  );
}

LdapCustomerOnboardingSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default LdapCustomerOnboardingSubNavigationBar;
