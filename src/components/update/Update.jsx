import React, { Component } from 'react';
import { Alert, Button, Col, Row, Container } from 'react-bootstrap';
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";

import { api2 } from "../../api"; //TODO: REMOVE THIS

import { AuthContext } from '../../contexts/AuthContext'; //New AuthContext State 
import { ApiService } from '../../api/apiService';

class Update extends Component {
  static contextType = AuthContext;  //Import AuthContext values into Component

  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      fetching: true,
      error: null,
      disabledIds: [],
      messages: null
    };
  }

  // Get the current token and then call the API call passing it
  async componentDidMount() {
    const { getAccessToken } = this.context;
    const accessToken = await getAccessToken();
    await this.getToolsList(accessToken);
  }

  async getToolsList(accessToken) {
    const apiCall = new ApiService('tools/upgradable', {}, accessToken);
    let currentComponent = this;
    apiCall.get().then(function (response) {
      currentComponent.setState({
        apps: response.apps,
        error: false,
        messages: 'API call was successful!'
      });
    })
      .catch(function (error) {
        currentComponent.setState({
          error: true,
          messages: 'Error reported accessing list of upgradable tools.'
        });
        console.log(`Error Reported: ${error}`);
      })
      .finally(function () {
        currentComponent.setState({ fetching: false });
      });
  }

  handleButtonClick = async ({ applicationId, toolId }) => {
    let currentComponent = this;
    this.setState(ps => ({
      disabledIds: [...ps.disabledIds, `${applicationId}${toolId}`],
    }))

    await api2({
      method: "POST",
      endpoint: "tools/upgrade",
      body: { applicationId, toolId },
    })
    .then(function (response) {
      // <Alert variant="secondary">
      //   Tool Submitted for upgrade, you will be notified completeness.
      // </Alert>
      currentComponent.setState({
        error: false,
        messages: 'Tool Submitted for upgrade, you will be notified completeness.'
      });
      console.log(response)
    })
    .catch(function (error) {
      currentComponent.setState({ 
        error: true,
        messages: 'Error reported updating the tool.'
      });
      console.log(`Error Reported: ${error}`);
    })
    .finally(function () {
      currentComponent.setState({ fetching: false });
    });

     
  }

  loader = () => {
    const { fetching } = this.state
    return fetching ? (
      <Button loading style={{ backgroundColor: "transparent" }} />
    ) : null
  }

  messages = () => {
    const { fetching, apps } = this.state
    return !fetching && apps.length === 0 ? <p>No Tools To Upgrade</p> : <LoadingDialog />
  }

  toolList = () => {
    const { apps, disabledIds } = this.state
    return (
      <Row>
        {apps ? apps.map(app => {
          return app.tools.map((tool, i) => (
            <ToolView
              handleButtonClick={this.handleButtonClick}
              disabledIds={disabledIds}
              app={app}
              tool={tool}
              key={i}
              i={i}
            />
          ))
        }) : <div>No Apps Available</div>}
      </Row>
    )
  }

  render() {
    const { error, messages } = this.state
    return (
      <div>
        <h2>Upgrades</h2>
        { error ? <ErrorDialog errorMessage={messages} /> : null }
      
        <div className="upgrades__app-list" style={{}}>
          {this.loader()}
          {!error ?? this.messages()}
          {this.toolList()}
        </div>
      </div>
    )
  }
}

function ToolView({
  handleButtonClick = () => { },
  disabledIds = [],
  app: { _id: applicationId, name: appname },
  tool: { _id: toolId, name: toolName, versionNumber },
}) {
  return (
    <Row>
      <Col>
        <h2 style={{ margin: 0 }}>{appname}</h2>
        <h3 style={{ margin: 0 }}>{toolName}</h3>
      </Col>
      <Col>
        <div>version number: {versionNumber || "unknown"}</div>
        {toolName === "Jenkins" && (
          <div style={{ fontWeight: "bold", color: "green" }}>
            New version available for upgrade: 2.152
              </div>
        )}
        {toolName === "Artifactory" && (
          <div style={{ fontWeight: "bold", color: "green" }}>
            New version available for upgrade: 6.5
              </div>
        )}
      </Col>
      <Col>
        <Button
          primary
          disabled={disabledIds.includes(`${applicationId}${toolId}`)}
          onClick={() => handleButtonClick({ applicationId, toolId })}
        >
          Update
            </Button>
      </Col>
    </Row>
  )
}
export default Update;