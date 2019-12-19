import React, { Component } from 'react';
import { generatePath } from 'react-router';
import { withAuth } from '@okta/okta-react';
import GitHub from './source_control/gitHub';
import GitLab from './source_control/gitLab';
import Jira from './defect_tracking/jira';

export default withAuth(class ApiConnector extends Component {
  urlId = this.props.match.params.id ? this.props.match.params.id.toLowerCase(): "";
  state = {
      selection: this.urlId
    }

  // TODO: Please make sure all selection values are lower case strings.
  // This new single function will accept the ID as a lowercase string to update the view and also 
  //   update the URL parameter path
  selectView= (id) => {
    this.setState({
      selection : id
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
            <a className={"nav-link " + (this.state.selection === "github" ? 'active' : '')} href="#/" onClick={()=>this.selectView("github")}>GitHub</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "gitlab" ? 'active' : '')} href="#/" onClick={()=>this.selectView("gitlab")}>GitLab</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "jira" ? 'active' : '')} href="#/" onClick={()=>this.selectView("jira")}>Jira</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "servicenow" ? 'active' : '')} href="#/" onClick={()=>this.selectView("servicenow")}>ServiceNow</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "openstack" ? 'active' : '')} href="#/">OpenStack</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "slack" ? 'active' : '')} href="#/">Slack</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "tableau" ? 'active' : '')} href="#/">Tableau</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "splunk" ? 'active' : '')} href="#/">Splunk</a>
          </li>
        </ul>

        { this.state.selection === "github" && <GitHub/> }
        { this.state.selection === "gitlab" && <GitLab/> }
        { this.state.selection === "jira" && <Jira/> }
        { this.state.selection === "" && 
          <div className="mt-5">
            Text displayed here is for when no option is selected.  If the user simply goes to the API Connector page, then show this text. 
            However If an above item is selected, hide this text and load the proper web compontent.  
          </div> 
        }

      </div>
    );
  }
});