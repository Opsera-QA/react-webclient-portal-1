import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';

export default withAuth(class About extends Component {

  render () {
    return (
      <div>
        <h3>Pricing</h3>
        <div>Coming Soon.</div>
      </div>
    )
  }
})