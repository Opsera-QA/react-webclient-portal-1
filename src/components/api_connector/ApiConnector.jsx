import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

export default withAuth(class ApiConnector extends Component {

  render() {
    return (
      <div>
        <h3>API Connectors</h3>
        <p>Configure your API connections here for the supported systems.</p>
        
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link active" href="#">GitHub</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">GitLab</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Jira</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>


        <div class="mt-5">
          Text displayed here is for when no option is slected.  If the user simply goes to the API Connector page, then show this text. 
          However If an above item is selected, hide this text and load the proper web compontent.  
        </div>
      </div>
    );
  }
});