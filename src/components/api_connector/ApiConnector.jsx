import React, { Component } from 'react';
import { generatePath } from 'react-router';
import { withAuth } from '@okta/okta-react';
import GitHub from './source_control/gitHub';
import GitLab from './source_control/gitLab';
import Jira from './defect_tracking/jira';
import ServiceNow from './itsm/serviceNow';
import OpenStack from './cloud_management/openStack';
import Slack from './collaboration/slack';
import Tableau from './analytics/tableau';
import Splunk from './analytics/splunk';

export default withAuth(class ApiConnector extends Component {
  state = {
    selection: ""
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let selection = nextProps.match.params.id
    if (nextProps.match.params.id === undefined) {
      selection = ""
    }
    return {
      selection: selection
    }
  }

  selectView = (id) => {
    this.setState({
      selection: id
    })
    const path = generatePath(this.props.match.path, { id });
    this.props.history.replace(path);
  }

  render() {
    return (
      <div>
        <h3>API Connectors</h3>
        <p>Configure your API connections here for the supported systems.</p>

        <ul className="nav">
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "github" ? 'active' : '')} href="#/" onClick={() => this.selectView("github")}>GitHub</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "gitlab" ? 'active' : '')} href="#/" onClick={() => this.selectView("gitlab")}>GitLab</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "jira" ? 'active' : '')} href="#/" onClick={() => this.selectView("jira")}>Jira</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "servicenow" ? 'active' : '')} href="#/" onClick={() => this.selectView("servicenow")}>ServiceNow</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "openstack" ? 'active' : '')} href="#/" onClick={() => this.selectView("openstack")}>OpenStack</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "slack" ? 'active' : '')} href="#/" onClick={() => this.selectView("slack")}>Slack</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "tableau" ? 'active' : '')} href="#/" onClick={() => this.selectView("tableau")}>Tableau</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "splunk" ? 'active' : '')} href="#/" onClick={() => this.selectView("splunk")}>Splunk</a>
          </li>
        </ul>

        {this.state.selection === "github" && <GitHub />}
        {this.state.selection === "gitlab" && <GitLab />}
        {this.state.selection === "jira" && <Jira />}
        {this.state.selection === "servicenow" && <ServiceNow />}
        {this.state.selection === "openstack" && <OpenStack />}
        {this.state.selection === "slack" && <Slack />}
        {this.state.selection === "tableau" && <Tableau />}
        {this.state.selection === "splunk" && <Splunk />}
        {this.state.selection === "" &&
          <div className="mt-5">
            OpsERA offers out of the box API connectors which allow you to to integrate your internal platforms and add them to the pipeline and analytics.  
            
          </div>
        }

      </div>
    );
  }
});