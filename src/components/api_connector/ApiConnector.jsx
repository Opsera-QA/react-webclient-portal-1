import React, { Component } from "react";
import GitHub from "./source_control/gitHub";
import GitLab from "./source_control/gitLab";
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
import Jenkins from "./automation_server/Jenkins";

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
        <h4>API Connectors</h4>
        <div>Configure connection information for various supported tools.</div>


        <ul className="nav nav-tabs mt-3">
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "github" ? "active" : "")} href="#" onClick={this.handleClick("github")}>GitHub</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "gitlab" ? "active" : "")} href="#" onClick={this.handleClick("gitlab")}>GitLab</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "jira" ? "active" : "")} href="#" onClick={this.handleClick("jira")}>Jira</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "jenkins" ? "active" : "")} href="#" onClick={this.handleClick("jenkins")}>Jenkins</a>
          </li>
          
          {/* <li className="nav-item">
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
        {this.state.selection === "jira" && <Jira />}

        {this.state.selection === "jenkins" && <Jenkins />}
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
          <div className="m-5">
            OpsERA offers out of the box API connectors which allow you to to integrate your internal platforms for inclusion in pipelines and platform configurations.
          </div>
        }

      </div>
    );
  }
}

export default ApiConnector;