import React, {Component, useEffect, useState} from "react";
import PropTypes from "prop-types";
import GitHub from "./source_control/gitHub";
// import GitLab from "./source_control/gitLab";
import Bitbucket from "./source_control/bitbucket";
import Jira from "./defect_tracking/jira";
import ServiceNow from "./itsm/serviceNow";
import OpenStack from "./cloud_management/openStack";
import Tableau from "./analytics/tableau";
import Splunk from "./analytics/splunk";
import Sonar from "./code_scan/sonar";
import JUnit from "./testing/jUnit";
import JMeter from "./testing/jMeter";
import Selenium from "./testing/selenium";
import Twistlock from "./container_scan/twistlock";
import JenkinsForm from "./automation_server/jenkinsForm";
import { faHome } from "@fortawesome/pro-solid-svg-icons";
import {
  faGithub,
  faGitlab,
  faBitbucket,
  faJira,
  faSlack,
  faMicrosoft
} from "@fortawesome/free-brands-svg-icons";
import CustomTabContainer from "../common/tabs/CustomTabContainer";
import CustomTab from "../common/tabs/CustomTab";
import MicrosoftTeamsApiConnector from "./microsoft_teams/MicrosoftTeamsApiConnector";
import SlackToolConfiguration from "../inventory/tools/tool_details/tool_jobs/slack/SlackToolConfiguration";

// TODO: This is legacy and should be removed
function ApiConnector() {
  const [activeTab, setTabSelection] = useState("home");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setTabSelection(activeTab);
  };


    return (
      <div className="max-content-width">
        <h4>API Tools and Connectivity</h4>
        <div>Configure connection information for various platform and pipeline supported tools.</div>
        <div className="py-3">
          <CustomTabContainer>
            <CustomTab icon={faHome} tabName={"home"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Home"} />
            <CustomTab icon={faGithub} tabName={"github"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"GitHub"} />
            <CustomTab icon={faGitlab} tabName={"gitlab"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"GitLab"} />
            <CustomTab icon={faBitbucket} tabName={"bitbucket"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Bitbucket"} />
            <CustomTab icon={faJira} tabName={"jira"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Jira"} />
            <CustomTab icon={faSlack} tabName={"slack"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Slack"} />
            <CustomTab icon={faMicrosoft} tabName={"teams"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Teams"} />
            {/*<CustomTab icon={faJenkins} tabName={"jenkins"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Jenkins"} />*/}
            {/*<CustomTab icon={faCogs} tabName={"sonar"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Sonar"} />*/}
            {/*<CustomTab icon={faCogs} tabName={"junit"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"JUnit"} />*/}
            {/*<CustomTab icon={faCogs} tabName={"jMeter"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"jMeter"} />*/}
            {/*<CustomTab icon={faCogs} tabName={"selenium"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Selenium"} />*/}
            {/*<CustomTab icon={faCogs} tabName={"twistlock"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Twistlock"} />*/}
          </CustomTabContainer>
          <div className="content-block-collapse px-2 pt-3 pb-4">
              <ApiConnectorTabView activeTab={activeTab} />
          </div>
        </div>
      </div>
    );
}


function ApiConnectorTabView({ activeTab }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);

  if (activeTab) {
    switch (activeTab) {
      case "home":
        return (
          <div className="m-3">
            <div className="h5 mb-2 mt-2">Getting Started</div>
            OpsERA offers various out of the box API connectors which allow users to integrate their platforms and technologies with the OpsERA services. If your tool is
            not listed in the tabs above, please reach out to OpsERA to find out how we can meet your needs.  For each tool available, different functionality is provided.
            <div className="header-text mt-4">Source Repositories</div>
            OpsERA connects to various GIT based repositories for your pipeline needs.  Each supported platform has various configuration settings.  In order to leverage a
            particular tool in an OpsERA Pipeline, Platform or Analytics solution, configure the necessary fields per tool.  Users can run multiple source repositories with
            our platform.
            <div>
            </div>
            <div className="header-text mt-4">Planning Tools</div>
            At this time, OpsERA supports Atlassian&apos;s Jira Software for project planning and defect tracking.  Configure your Jira solution here in order to link pipelines and
            developers to defects and sprints and leverage advanced analytics and analysis for SDLC pipelines.
            <div className="header-text mt-4">Collaboration Tools</div>
            OpsERA supports various forms of notification and collaboration for our solutions.  Slack is the most popular and can be configured to send notifications per pipeline step to
            specific Slack channels.  In order to leverage this feature, register your Slack Account Token here and then in your pipelines, enable Slack notification per
            step.

          </div>
        );
      case "github":
        return <GitHub />;
      // case "gitlab":
        // return <GitLab />;
      case "bitbucket":
        return <Bitbucket />;
      case "jira":
        return <Jira />;
      case "jenkins":
        return <JenkinsForm />;
      case "sonar":
        return <Sonar />;
      case "junit":
        return <JUnit />;
      case "jMeter":
        return <JMeter />;
      case "selenium":
        return <Selenium />;
      case "twistlock":
        return <Twistlock />;
      case "servicenow":
        return <ServiceNow />;
      case "openstack":
        return <OpenStack />;
      case "slack":
        return <SlackToolConfiguration />;
      case "tableau":
        return <Tableau />;
      case "teams":
        return <MicrosoftTeamsApiConnector />;
      case "splunk":
        return <Splunk />;
      default:
        return null;
    }
  }
}
ApiConnectorTabView.propTypes = {
  activeTab: PropTypes.string,
};

export default ApiConnector;