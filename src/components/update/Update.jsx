import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import { handleError } from "../../helpers";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../api/apiService";

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

  componentDidMount() {
    this.getApiData();
  }

  async getApiData() {
    const { getAccessToken, getUserInfo } = this.context;
    const accessToken = await getAccessToken();
    const userInfo = await getUserInfo();
    const urlParams = { userid: userInfo.sub };
    const apiCall = new ApiService("/tools/upgradable", urlParams, accessToken);
    let currentComponent = this;
    apiCall.get()
      .then(function (response) {
        currentComponent.setState({
          apps: response.apps,
          error: null,
          fetching: false
        });
      })
      .catch(function (error) {
        currentComponent.setState({
          error: error,
          fetching: false
        });
      });
  }


  handleButtonClick = async ({ applicationId, toolId }) => {
    let currentComponent = this;
    this.setState(ps => ({
      disabledIds: [...ps.disabledIds, `${applicationId}${toolId}`],
    }));

    //TODO: The token MAY not be required here because of the interceptor set in apiService, so test that
    const apiCall = new ApiService("/tools/upgrade", null, null, { applicationId, toolId });
    apiCall.post()
      .then(function (response) {
        console.log(response);
        currentComponent.setState({
          error: null,
          messages: "Tool Submitted for upgrade, you will be notified completeness.",
          fetching: false
        });
      })
      .catch(function (error) {
        currentComponent.setState({
          error: error,
          fetching: false
        });
        console.log(`Error Reported: ${error}`);
      });
  }

  loader = () => {
    const { fetching } = this.state;
    return fetching ? (
      <Button loading style={{ backgroundColor: "transparent" }} />
    ) : null;
  }

  messages = () => {
    const { fetching, apps } = this.state;
    return !fetching && apps.length === 0 ? <p>No Tools To Upgrade</p> : <LoadingDialog />;
  }

  toolList = () => {
    const { apps, disabledIds } = this.state;
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
          ));
        }) : <div className="col mx-auto">
          <div className="text-center m-4">No Updates Required</div>
        </div>}
      </Row>
    );
  }

  render() {
    const { error, fetching } = this.state;
    return (
      <div>
        <h3>Updates</h3>
        <p>Any available updates for tools currently registered will be listed below.</p>

        {error ? <ErrorDialog error={error} /> : null}
        {fetching ? <LoadingDialog /> : null}

        <div className="upgrades__app-list" style={{}}>
          {this.loader()}
          {!error ?? this.messages()}
          {this.toolList()}
        </div>
      </div>
    );
  }
}


const ToolView = ({handleButtonClick, disabledIds, app, tool }) => {
  //const {handleButtonClick, disabledIds, app, tool } = this.props;
  return (
    <Row>
      <Col>
        <h2 style={{ margin: 0 }}>{app.name}</h2>
        <h3 style={{ margin: 0 }}>{tool.toolName}</h3>
      </Col>
      <Col>
        <div>version number: {tool.versionNumber || "unknown"}</div>
        {tool.name === "Jenkins" && (
          <div style={{ fontWeight: "bold", color: "green" }}>
            New version available for upgrade: 2.152
          </div>
        )}
        {tool.name === "Artifactory" && (
          <div style={{ fontWeight: "bold", color: "green" }}>
            New version available for upgrade: 6.5
          </div>
        )}
      </Col>
      <Col>
        <Button
          variant="primary"
          disabled={disabledIds.includes(`${app._id}${tool._id}`)}
          onClick={() => handleButtonClick()}
        >
          Update
        </Button>
      </Col>
    </Row>
  );
};

ToolView.propTypes = {
  handleButtonClick: PropTypes.func,
  disabledIds: PropTypes.array,
  app: {
    _id: PropTypes.string,
    name: PropTypes.string
  },
  tool:{
    _id: PropTypes.string,
    name: PropTypes.string,
    versionNumber: PropTypes.string
  }
};
export default Update;