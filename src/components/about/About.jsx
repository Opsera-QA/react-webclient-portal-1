import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';

export default withAuth(class About extends Component {

  render () {
    return (
      <div>
        <h3>ABOUT US</h3>
        <div>This is a basic content area for some information about the organization and contacint us.</div>
      </div>
    )
  }
})