import React, { Component } from "react";
import GitHub from "./source_control/gitHub";
import GitLab from "./source_control/gitLab";
import Bitbucket from "./source_control/bitbucket";
import Jira from "./defect_tracking/jira";
import ServiceNow from "./itsm/serviceNow";
import OpenStack from "./cloud_management/openStack";
import Slack from "./collaboration/slack";
import Tableau from "./analytics/tableau";
import Splunk from "./analytics/splunk";
import Sonar from "./code_scan/sonar";
import JUnit from "./testing/jUnit";
import JMeter from "./testing/jMeter";
import Selenium from "./testing/selenium";
import Twistlock from "./container_scan/twistlock";
import JenkinsForm from "./automation_server/jenkinsForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faGitlab, faBitbucket, faJira, faSlack } from "@fortawesome/free-brands-svg-icons";

class ApiConnector extends Component {
  state = {
    selection: ""
  }

  handleClick = param => e => {
    // param is the argument you passed to the function
    // e is the event object that returned
    e.preventDefault();
    this.setState({
      selection: param
    });
  };


  render() {
    return (
      <div className="mt-3 max-content-width">
        <h4>Tools and Connectivity</h4>
        <div>Configure connection information for various platform and pipeline supported tools.</div>


        <ul className="nav nav-tabs mt-3">
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "" ? "active" : "")} href="#" onClick={this.handleClick("")}>
              <FontAwesomeIcon icon={faHome} className="mr-1"/> Home</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "github" ? "active" : "")} href="#" onClick={this.handleClick("github")}>
              <FontAwesomeIcon icon={faGithub} className="mr-1"/> GitHub</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "gitlab" ? "active" : "")} href="#" onClick={this.handleClick("gitlab")}>
              <FontAwesomeIcon icon={faGitlab} className="mr-1"/> GitLab</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "bitbucket" ? "active" : "")} href="#" onClick={this.handleClick("bitbucket")}>
              <FontAwesomeIcon icon={faBitbucket} className="mr-1"/> Bitbucket</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "jira" ? "active" : "")} href="#" onClick={this.handleClick("jira")}>
              <FontAwesomeIcon icon={faJira} className="mr-1"/> Jira</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "slack" ? "active" : "")} href="#" onClick={this.handleClick("slack")}>
              <FontAwesomeIcon icon={faSlack} className="mr-1"/> Slack</a>
          </li>
          {/* <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "jenkins" ? "active" : "")} href="#" onClick={this.handleClick("jenkins")}>Jenkins</a>
          </li>
          
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "sonar" ? "active" : "")} href="#" onClick={this.handleClick("sonar")}>Sonar</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "junit" ? "active" : "")} href="#" onClick={this.handleClick("junit")}>junit</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "jMeter" ? "active" : "")} href="#" onClick={this.handleClick("jMeter")}>jMeter</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "selenium" ? "active" : "")} href="#" onClick={this.handleClick("selenium")}>Selenium</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "twistlock" ? "active" : "")} href="#" onClick={this.handleClick("twistlock")}>Twistlock</a>
          </li> */}

          {/* <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
          </li> */}
        </ul>


        {this.state.selection === "github" && <GitHub />}
        {this.state.selection === "gitlab" && <GitLab />}
        {this.state.selection === "bitbucket" && <Bitbucket />}
        {this.state.selection === "jira" && <Jira />}

        {this.state.selection === "jenkins" && <JenkinsForm />}
        {this.state.selection === "sonar" && <Sonar />}
        {this.state.selection === "junit" && <JUnit />}
        {this.state.selection === "jMeter" && <JMeter />}
        {this.state.selection === "selenium" && <Selenium />}
        {this.state.selection === "twistlock" && <Twistlock />}

        {this.state.selection === "servicenow" && <ServiceNow />}
        {this.state.selection === "openstack" && <OpenStack />}
        {this.state.selection === "slack" && <Slack />}
        {this.state.selection === "tableau" && <Tableau />}
        {this.state.selection === "splunk" && <Splunk />}
        {this.state.selection === "" &&
          <div className="mt-4 ml-1">
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
            At this time, OpsERA supports Atlassian's Jira Software for project planning and defect tracking.  Configure your Jira solution here in order to link pipelines and 
            developers to defects and sprints and leverage advanced analytics and analysis for SDLC pipelines.

            <div className="header-text mt-4">Communication Tools</div>
            OpsERA supports various forms of notification for pipeline solutions.  Slack is the most popular and can be configured to send notifications per pipeline step to 
            step specific Slack channels.  In order to leverage this feature, register your Slack Account Token here and then in your pipelines, enable Slack notification per 
            step.  

          </div>
        }

      </div>
    );
  }
}

export default ApiConnector;