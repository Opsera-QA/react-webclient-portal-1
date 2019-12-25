import { withAuth } from '@okta/okta-react';
import React, { PureComponent } from 'react';
import { connect } from "react-redux"
import { Form, Table, Alert, Button, Card, CardGroup } from 'react-bootstrap';

// TODO: Update this to use the new APIDemo approach (already imported) and replace the getApps function
// TODO: Add error handling similar to Update.jsx approach
import { getApps } from "../../actions/thunk"  //REMOVE THIS AND THE FILE ALL TOGETHER FROM THE PROJECT
import { ApiService } from '../../api/apiService';
import ErrorDialog from "../common/error";

import LoadingDialog from "../common/loading"

class Inventory extends PureComponent {
  state = {
    key: ""
  }

  componentDidMount() {
    const { getApps } = this.props
    getApps()
  }

  handleDropdownChange = (e) => {
    this.setState({ key: e.target.value })
  }

  getApp = () => {
    const { applications } = this.props
    const { key } = this.state
    return applications.find(({ name }) => name === key)
  }

  setPlaceholder = () => {
    alert('coming soon');
  }

  render() {
    const { applications } = this.props
    const loading = applications == null
    return (
      <div>
        <h3>Inventory</h3>
        <p>All configured applications are available for viewing below.  Select the item you want to view from the list.</p>
        <div>
          {(loading) && <LoadingDialog />}

          {(!loading && applications.length === 0) &&
            <div className="mt-3">
              <Alert variant="secondary">
                No applications are currently configured for the system.
              </Alert>

            </div>
          }

          <Form>
            <Form.Group>
              <Form.Control as="select"
                inputRef={el => this.inputEl = el}
                hidden={(!loading && applications.length > 0) ? false : true}
                onChange={this.handleDropdownChange}
                style={{ marginTop: 25 }}>
                <option value="" selected disabled>{loading ? "loading..." : "Select application"}</option>
                {!loading && (
                  <>
                    {applications.map(application => (
                      <option key={application.name} value={application.name}>{application.name}</option>
                    ))}
                  </>
                )}
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
        {(!loading && applications.length > 0) &&
          <>
            {loading ? null : <App application={this.getApp()} />}
          </>
        }
      </div>
    )
  }
};

function App({ application }) {
  if (!application)
    return (
      <div>
        <p>choose application from above</p>
      </div>
    )

  const { tools } = application

  if (tools.length === 0) {
    return (
      <div>
        <p>No tools for this application.</p>
      </div>
    )
  }

  return (
    <div>
      {tools.map((tool, key) => (
        <ToolTable tool={tool} key={key} />
      ))}
    </div>
  )
}

const ToolTable = ({ tool }) => {
  const { name, toolStatus, toolURL } = tool
  const active = toolStatus === "ACTIVE"

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>
            <tr>
              {name}
            </tr>
          </th>
        </tr>
      </thead>
      <tbody>
        {active && (
          <tr>
            <td>URL</td>
            <td><a href={toolURL}>{toolURL}</a></td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

const mapStateToProps = ({ applications }) => ({
  applications,
})

export default withAuth(connect(
  mapStateToProps,
  { getApps },
)(Inventory))
