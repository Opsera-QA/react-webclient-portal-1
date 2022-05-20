import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {faMicrosoft, faSlack, faJira } from "@fortawesome/free-brands-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";

function TaskNotificationVerticalTabContainer(
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
      {/*  tabText={"Service Now"}*/}
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
    </VanitySetVerticalTabContainer>
  );
}

TaskNotificationVerticalTabContainer.propTypes = {
  activeTab: PropTypes.string,
  handleTabClickFunction: PropTypes.func,
};

export default TaskNotificationVerticalTabContainer;