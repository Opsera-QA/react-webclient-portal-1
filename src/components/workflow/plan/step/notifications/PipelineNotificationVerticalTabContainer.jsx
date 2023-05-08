import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {faMicrosoft, faSlack, faJira, faGoogle} from "@fortawesome/free-brands-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import {faEnvelope, faLightbulb} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function PipelineNotificationVerticalTabContainer(
  {
    handleTabClickFunction,
    activeTab,
    slackEnabled, 
    teamsEnabled,
    jiraEnabled,
    serviceNowEnabled,
    emailEnabled,
    gChatEnabled,
  }) {
  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faEnvelope}
        tabName={"email"}
        handleTabClick={handleTabClickFunction}
        activeTab={activeTab}
        tabText={emailEnabled ? <div className={"d-flex"}>Email<IconBase icon={faLightbulb} className={"ml-3"}/> </div> : "Email"}
      />
      <VanitySetVerticalTab
        icon={faJira}
        tabText={jiraEnabled ? <div className={"d-flex"}>Jira<IconBase icon={faLightbulb} className={"ml-3"}/> </div> : "Jira"}
        tabName={"jira"}
        handleTabClick={handleTabClickFunction}
        activeTab={activeTab}
      />
      <VanitySetVerticalTab
        icon={faMicrosoft}
        tabText={teamsEnabled ? <div className={"d-flex"}>Microsoft Teams<IconBase icon={faLightbulb} className={"ml-1"}/> </div> : "Microsoft Teams"}
        tabName={"teams"}
        handleTabClick={handleTabClickFunction}
        activeTab={activeTab}
      />
      <VanitySetVerticalTab
        icon={faEnvelope}
        tabText={serviceNowEnabled ? <div className={"d-flex"}>Service Now<IconBase icon={faLightbulb} className={"ml-3"}/> </div> : "Service Now"}
        tabName={"service-now"}
        handleTabClick={handleTabClickFunction}
        activeTab={activeTab}
      />
      <VanitySetVerticalTab
        icon={faSlack}
        tabText={slackEnabled ? <div className={"d-flex"}>Slack<IconBase icon={faLightbulb} className={"ml-3"}/> </div> : "Slack"}
        tabName={"slack"}
        handleTabClick={handleTabClickFunction}
        activeTab={activeTab}
      />
      <VanitySetVerticalTab
        icon={faGoogle}
        tabText={gChatEnabled ? <div className={"d-flex"}>Google Chat<IconBase icon={faLightbulb} className={"ml-3"}/> </div> : "Google Chat"}
        tabName={"gchat"}
        handleTabClick={handleTabClickFunction}
        activeTab={activeTab}
      />
    </VanitySetVerticalTabContainer>
  );
}

PipelineNotificationVerticalTabContainer.propTypes = {
  activeTab: PropTypes.string,
  handleTabClickFunction: PropTypes.func,
  slackEnabled: PropTypes.bool,
  jiraEnabled: PropTypes.bool, 
  teamsEnabled: PropTypes.bool, 
  serviceNowEnabled: PropTypes.bool,
  emailEnabled: PropTypes.bool,
  gChatEnabled: PropTypes.bool,
};

export default PipelineNotificationVerticalTabContainer;