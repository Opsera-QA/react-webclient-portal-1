import { withAuth } from '@okta/okta-react';
import React, { PureComponent } from 'react';
import { connect } from "react-redux"
import { Form, Table, Alert, Button, Card, CardGroup } from 'react-bootstrap';
import { getApps } from "../../actions/thunk"
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



              <Card className="mt-5">
                  <Card.Header>Getting Started</Card.Header>
                  <Card.Body>
                    <Card.Title>OpsERA offers multiple ways to work with your DevOps solution.  </Card.Title>
                    <Card.Text>
                      Configure your existing platforms for a single pane of glass management or leverage the full power of OpsERA's Pipeline by 
                      building out your entire DevOps workflow using best in breed technology.
                    </Card.Text>
                    <Button variant="primary" onClick={this.setPlaceholder}>Get Started</Button>
                  </Card.Body>
                </Card>

              <CardGroup className="mt-5">
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>Platforms</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Leveraging your existing solutions</Card.Subtitle>
                    <Card.Text>
                    Enables DevOps teams to deploy their choice of existing tools in minutes. Native 
                    integration with various API connectors including Jira, ServiceNow, Github and Slack among many more.
                    </Card.Text>
                    {/* <Button variant="primary" onClick={this.setPlaceholder}>Register Platform</Button> */}
                    <Card.Link href="#">Register a Platform Now</Card.Link>
                  </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>Pipeline</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Empower Your DevOps Team</Card.Subtitle>
                    <Card.Text>
                      Leverage the full benfits of OpsERA by building DevOps pipelines with security and quality gates in just 10-15 minutes. Supports multi-stack, 
                      multi-language and Hybrid Cloud solutions with support for Container deployments, Kubernetes clusters and Kubernetes with Helm.
                  </Card.Text>
                  {/* <Button variant="primary" onClick={this.setPlaceholder}>Build a Pipeline</Button> */}
                  <Card.Link href="#">Build Your Pipeline</Card.Link>
                  </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>Analytics</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">End to end visibility</Card.Subtitle>
                    <Card.Text>
                      Provides near real time Intelligent dashboards and metrics for all builds including Testing, security and deploy providing 
                      end to end visibility into your entire DevOps ecosystem.
                    </Card.Text>
                    {/* <Button variant="primary" onClick={this.setPlaceholder}>Get Started</Button> */}
                    <Card.Link href="#">Learn More</Card.Link>
                  </Card.Body>
                </Card>
              </CardGroup>

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
