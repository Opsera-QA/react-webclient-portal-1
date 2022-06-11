import React, { Component } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingDialog from "../common/status_notifications/loading";
import ErrorDialog from "../common/status_notifications/error";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../api/apiService";

// TODO: Remove or rewrite
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
    const { getAccessToken, getUserRecord } = this.context;
    const accessToken = await getAccessToken();
    const userInfo = await getUserRecord();
    const urlParams = { userid: userInfo.userId };
    const apiCall = new ApiService("/tools/upgradable", urlParams, accessToken);
    let currentComponent = this;
    apiCall.get()
      .then(function (response) {
        currentComponent.setState({
          apps: response.data,
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


  handleButtonClick = async (app, tool) => {
    let currentComponent = this;
    this.setState(ps => ({
      disabledIds: [...ps.disabledIds, `${app._id}${tool._id}`],
    }));

    //TODO: The token MAY not be required here because of the interceptor set in apiService, so test that

    const apiCall = new ApiService("/tools/upgrade", null, null, { applicationId: app._id, toolId: tool._id });
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
  };

  /* loader = () => {
    const { fetching } = this.state;
    return fetching ? (
      <Button loading style={{ backgroundColor: "transparent" }} />
    ) : null;
  } */

  messages = () => {
    const { fetching, apps } = this.state;
    return !fetching && apps.length === 0 ? <p>No Tools To Upgrade</p> : <LoadingDialog />;
  };

  toolList = () => {
    const { apps, disabledIds } = this.state;
    console.log(apps);
    return (
      <>
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
      </>
    );
  };

  render() {
    const { error, fetching } = this.state;
    return (
      <div className="max-content-width">
        <div className="h4 mt-3 mb-4">Updates</div>
        <p>Any available updates for tools currently registered will be listed below.</p>

        {error ? <ErrorDialog error={error} /> : null}
        {fetching ? <LoadingDialog /> : null}

        <div className="upgrades__app-list" style={{}}>
          {/* {this.loader()} */}
          {!error ?? this.messages()}
          {this.toolList()}
        </div>
      </div>
    );
  }
}


const ToolView = ({ handleButtonClick, disabledIds, app, tool }) => {
  //const {handleButtonClick, disabledIds, app, tool } = this.props;
  return (

    <div className="p-2 mt-2 border-bottom">
      <div className="row m-1">
        <div className="col-md col-header-text"><span className="text-muted">Application:</span> {app.name}</div>
        <div className="col-md">{tool.toolName && (<><span className="text-muted">Tool:</span> {tool.toolName}</>)}</div>
        <div className="col-md"><span className="text-muted">Version:</span> {tool.versionNumber || "unknown"}</div>
      </div>
      <div className="row m-1">
        <div className="col-md">
          {tool.name === "Jenkins" && (
            <span style={{ fontWeight: "bold", color: "green" }}>
            New version available for upgrade: 2.152
            </span>
          )}
          {tool.name === "Artifactory" && (
            <span style={{ fontWeight: "bold", color: "green" }}>
            New version available for upgrade: 6.5
            </span>
          )}
        </div>
      </div>
      <div className="row m-1">
        <div className="col-md">
          <Button
            variant="outline-primary"
            className="m-2"
            disabled={disabledIds.includes(`${app._id}${tool._id}`)}
            onClick={() => handleButtonClick(app, tool)}>Upgrade Tool
          </Button>
        </div>
        
      </div>
    </div>
  );
};

ToolView.propTypes = {
  handleButtonClick: PropTypes.func,
  disabledIds: PropTypes.array,
  app: PropTypes.object,
  tool: PropTypes.object,
};
export default Update;