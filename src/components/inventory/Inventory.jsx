import { withAuth } from '@okta/okta-react';
import React, { PureComponent } from 'react';
import {connect} from "react-redux"
import { Form, Table } from 'react-bootstrap';
import { getApps } from "../../actions/thunk"

class Inventory extends PureComponent {
  state = {
    key: ""
  }

  componentDidMount() {
    const {getApps} = this.props
    getApps()
  }

  handleDropdownChange = (e) => {
    this.setState({key: e.target.value})
  }
  
  getApp = () => {
    const {applications} = this.props
    const {key} = this.state
    return applications.find(({name}) => name === key)
  }

  render () {
    const {applications} = this.props
    const loading = applications == null
    return (
      <div>
        <h3>Inventory</h3>
        <div>
        <Form>
          <Form.Group>
            <Form.Control as="select" 
              inputRef={ el => this.inputEl=el }
              disabled={ ( !loading && applications.length>0 ) ? false : true }
              onChange={this.handleDropdownChange} >
              <option>{loading ? "loading..." : "Select application"}</option>
              {!loading && (
                <>
                  {applications.map(application => (
                    <option value={application.name}>{application.name}</option>
                  ))}
                </>
              )}
            </Form.Control>
          </Form.Group>
        </Form>
        </div>
        {( !loading && applications.length>0 ) ? 
          <>
            {loading ? null : <App application={this.getApp()} />}
          </> : 
          <div>
            No current systems are configured for the system. Please add a new Platform in order to proceed.
          </div>
        }
      </div>
    )
  }
};

function App({application}) {
  if (!application)
    return (
      <div>
        <p>choose application from above</p>
      </div>
    )

  const {tools} = application

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

const ToolTable = ({tool}) => {
  const {name, toolStatus, toolURL} = tool
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

const mapStateToProps = ({applications}) => ({
  applications,
})

export default withAuth(connect(
  mapStateToProps,
  {getApps},
)(Inventory))
