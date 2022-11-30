import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import GitHub from "./source_control/gitHub";
import {faHome} from "@fortawesome/pro-solid-svg-icons";
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
import {Link} from "react-router-dom";

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
          <CustomTab icon={faHome} tabName={"home"} handleTabClick={handleTabClick} activeTab={activeTab}
                     tabText={"Home"}/>
          <CustomTab icon={faGithub} tabName={"github"} handleTabClick={handleTabClick} activeTab={activeTab}
                     tabText={"GitHub"}/>
          <CustomTab icon={faGitlab} tabName={"gitlab"} handleTabClick={handleTabClick} activeTab={activeTab}
                     tabText={"GitLab"}/>
          <CustomTab icon={faBitbucket} tabName={"bitbucket"} handleTabClick={handleTabClick} activeTab={activeTab}
                     tabText={"Bitbucket"}/>
          <CustomTab icon={faJira} tabName={"jira"} handleTabClick={handleTabClick} activeTab={activeTab}
                     tabText={"Jira"}/>
          <CustomTab icon={faSlack} tabName={"slack"} handleTabClick={handleTabClick} activeTab={activeTab}
                     tabText={"Slack"}/>
          <CustomTab icon={faMicrosoft} tabName={"teams"} handleTabClick={handleTabClick} activeTab={activeTab}
                     tabText={"Teams"}/>
        </CustomTabContainer>
        <div className="content-block-collapse px-2 pt-3 pb-4">
          <ApiConnectorTabView activeTab={activeTab}/>
        </div>
      </div>
    </div>
  );
}


function ApiConnectorTabView({activeTab}) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);

  if (activeTab) {
    switch (activeTab) {
      case "home":
        return (
          <div className="m-3">
            <div className="h5 mb-2 mt-2">Getting Started</div>
            OpsERA offers various out of the box API connectors which allow users to integrate their platforms and
            technologies with the OpsERA services. If your tool is
            not listed in the tabs above, please reach out to OpsERA to find out how we can meet your needs. For each
            tool available, different functionality is provided.
            <div className="header-text mt-4">Source Repositories</div>
            OpsERA connects to various GIT based repositories for your pipeline needs. Each supported platform has
            various configuration settings. In order to leverage a
            particular tool in an OpsERA Pipeline, Platform or Analytics solution, configure the necessary fields per
            tool. Users can run multiple source repositories with
            our platform.
            <div>
            </div>
            <div className="header-text mt-4">Planning Tools</div>
            At this time, OpsERA supports Atlassian&apos;s Jira Software for project planning and defect tracking.
            Configure your Jira solution here in order to link pipelines and
            developers to defects and sprints and leverage advanced analytics and analysis for SDLC pipelines.
            <div className="header-text mt-4">Collaboration Tools</div>
            OpsERA supports various forms of notification and collaboration for our solutions. Slack is the most popular
            and can be configured to send notifications per pipeline step to
            specific Slack channels. In order to leverage this feature, register your Slack Account Token here and then
            in your pipelines, enable Slack notification per
            step.

          </div>
        );
      case "github":
        return <GitHub/>;
      default:
        return (
          <div className="m-3">
            <div className="h5">{activeTab}</div>
            <div>You can connect to this tool using credentials stored on a per-tool basis in the <Link to="/inventory/tools">Tool
              Registry</Link>.
            </div>
            <div>To get started, create a tool with your credentials.</div>
          </div>
        );
    }
  }
}

ApiConnectorTabView.propTypes = {
  activeTab: PropTypes.string,
};

export default ApiConnector;