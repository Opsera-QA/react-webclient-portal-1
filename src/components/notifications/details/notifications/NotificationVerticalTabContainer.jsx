import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";
import {faGoogle, faJira, faMicrosoft, faSlack} from "@fortawesome/free-brands-svg-icons";

function NotificationVerticalTabContainer(
  {
    handleTabClickFunction,
    activeTab,
  }) {
  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faEnvelope}
        tabText={"Email"}
        tabName={"email"}
        handleTabClick={handleTabClickFunction}
        activeTab={activeTab}
      />
      {/*<VanitySetVerticalTab*/}
      {/*  icon={faJira}*/}
      {/*  tabText={"Jira"}*/}
      {/*  tabName={"jira"}*/}
      {/*  handleTabClick={handleTabClickFunction}*/}
      {/*  activeTab={activeTab}*/}
      {/*/>*/}
      <VanitySetVerticalTab
        icon={faMicrosoft}
        tabText={"Microsoft Teams"}
        tabName={"teams"}
        handleTabClick={handleTabClickFunction}
        activeTab={activeTab}
      />
      {/*<VanitySetVerticalTab*/}
      {/*  icon={faEnvelope}*/}
      {/*  tabText={"ServiceNow"}*/}
      {/*  tabName={"service-now"}*/}
      {/*  handleTabClick={handleTabClickFunction}*/}
      {/*  activeTab={activeTab}*/}
      {/*/>*/}
      <VanitySetVerticalTab
        icon={faSlack}
        tabText={"Slack"}
        tabName={"slack"}
        handleTabClick={handleTabClickFunction}
        activeTab={activeTab}
      />
      <VanitySetVerticalTab
        icon={faGoogle}
        tabText={"Google Chat"}
        tabName={"gchat"}
        handleTabClick={handleTabClickFunction}
        activeTab={activeTab}
      />
    </VanitySetVerticalTabContainer>
  );
}

NotificationVerticalTabContainer.propTypes = {
  activeTab: PropTypes.string,
  handleTabClickFunction: PropTypes.func,
};

export default NotificationVerticalTabContainer;