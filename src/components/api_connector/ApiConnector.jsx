import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import GitHub from './source_control/gitHub';
import GitLab from './source_control/gitLab';
import Jira from './defect_tracking/jira';

export default withAuth(class ApiConnector extends Component {
  state = {
    selection: ""
  }
  selectGithub= () => {
    this.setState({
      selection : "Github"
    })
  }
  selectGitLab = () => {
    this.setState({
      selection : "GitLab"
    })
  }
  selectJira = () => {
    this.setState({
      selection : "Jira"
    })
  }
  render() {
    return (
      <div>
        <h3>API Connectors</h3>
        <p>Configure your API connections here for the supported systems.</p>
        
        <ul className="nav">
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "Github" ? 'active' : '')} href="#/" onClick={()=>this.selectGithub()}>GitHub</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "GitLab" ? 'active' : '')} href="#/" onClick={()=>this.selectGitLab()}>GitLab</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "Jira" ? 'active' : '')} href="#/" onClick={()=>this.selectJira()}>Jira</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "ServiceNow" ? 'active' : '')} href="#/">ServiceNow</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "OpenStack" ? 'active' : '')} href="#/">OpenStack</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "Slack" ? 'active' : '')} href="#/">Slack</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "Tableau" ? 'active' : '')} href="#/">Tableau</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "Splunk" ? 'active' : '')} href="#/">Splunk</a>
          </li>
        </ul>

        { this.state.selection === "Github" && <GitHub/> }
        { this.state.selection === "GitLab" && <GitLab/> }
        { this.state.selection === "Jira" && <Jira/> }
        { this.state.selection === "" && 
          <div class="mt-5">
            Text displayed here is for when no option is slected.  If the user simply goes to the API Connector page, then show this text. 
            However If an above item is selected, hide this text and load the proper web compontent.  
          </div> 
        }

      </div>
    );
  }
});