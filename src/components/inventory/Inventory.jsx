import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';


// TODO: Migrate the /src/components/Dashboard/Dashboard.js functionality into this page (OC-16)
export default withAuth(class Inventory extends Component {
  render () {
    return (
      <div>
        <h3>Inventory</h3>
        <div>The Inventory drop down and then the list of results should be returned here just like it is in the current product.</div>
      </div>
    )
  }
});

