/* eslint-disable react/prop-types */
import React, { PureComponent, Fragment } from "react";
import { Form, Alert } from "react-bootstrap";
import Moment from "react-moment";
import { AuthContext } from "../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";


class Inventory extends PureComponent {
  static contextType = AuthContext;  //Registers the User Authentication context data in the component

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      fetching: true,
      error: null,
      messages: null,
      selection: "platform"
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
    const apiCall = new ApiService("/applications", urlParams, accessToken);
    let currentComponent = this;
    apiCall.get()
      .then(function (response) {
        currentComponent.setState({
          data: response.data,
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


  handleTabClick = param => e => {
    // param is the argument you passed to the function
    // e is the event object that returned
    e.preventDefault();
    this.setState({
      selection: param,
      key: ""
    });

    //TODO: Please filter the list of applications by the selected value: Pipeline or Platform
  };

  handleDropdownChange = (e) => {
    this.setState({ key: e.target.value });
  }

  getApp = () => {
    console.log(this.state);
    const { key, data, selection } = this.state;

    let typeSelectedApps = [];
    // const typeSelectedApps = data.filter((app) => { return app.type === selection }) // Actual implementation

    // TODO :::: Remove this later
    if (selection === "platform") {
      typeSelectedApps = data.filter((app) => { return app.type != "pipeline"; });
    } else if (selection === "pipeline") {
      typeSelectedApps = data.filter((app) => { return app.type != "platform"; });
    }
    // ::::::::::::::

    return typeSelectedApps.find(({ name }) => name === key);
  }

  render() {
    const { data, error, fetching, selection } = this.state;
    let typeSelectedApps = [];
    // const typeSelectedApps = data.filter((app) => { return app.type === selection }) // right way of implementation

    // TODO :::: Remove this later
    if (selection === "platform") {
      typeSelectedApps = data.filter((app) => { return app.type != "pipeline"; });
    } else if (selection === "pipeline") {
      typeSelectedApps = data.filter((app) => { return app.type != "platform"; });
    }
    // ::::::::::::::

    return (
      <div className="mt-3 max-content-width">
        <h4>Inventory</h4>
        <p>The OpsERA Inventory tool allows you to see all of the configured tools per application.  Please select either Pipeline or Platform and then select the application in order to view its tools and their current status.</p>

        {error ? <ErrorDialog error={error} /> : null}

        <ul className="nav nav-tabs mt-3">
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "platform" ? "active" : "")} href="#" onClick={this.handleTabClick("platform")}>Platform</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "pipeline" ? "active" : "")} href="#" onClick={this.handleTabClick("pipeline")}>Pipeline</a>
          </li>
        </ul>

        {fetching && <LoadingDialog />}
        <div>
          {(!fetching && !error && data.length === 0) &&
            <div className="mt-3">
              <Alert variant="secondary">
                No applications are currently configured for the system.
              </Alert>
            </div>
          }

          <Form>
            <Form.Group>
              <Form.Control as="select"
                defaultValue=""
                value={this.state.key}
                hidden={(!fetching && data.length > 0) ? false : true}
                onChange={this.handleDropdownChange}
                style={{ marginTop: 25 }}>
                <option value="" disabled>{fetching ? "loading..." : "Select application"}</option>
                {!fetching && (
                  <>
                    {typeSelectedApps ? typeSelectedApps.map(application => (
                      <Fragment key={application.name}>
                        {
                          application.tools.length > 0 && (
                            <option key={application.name} value={application.name}>{application.name}</option>
                          )
                        }
                      </Fragment>
                    )) : ""}
                  </>
                )}
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
        {
          (!fetching && typeSelectedApps.length > 0) &&
          <>
            {fetching ? null : <App application={this.getApp()} />}
          </>
        }
      </div >
    );
  }
}

function App({ application }) {
  if (!application)
    return (<div></div>);

  const { tools } = application;
  if (tools.length === 0) {
    return (
      <div className="m-4">
        <p>No tools for this application.</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 25 }}>
      {tools.map((tool, key) => (
        <ToolTable tool={tool} key={key} />
      ))}
    </div>
  );
}

const ToolTable = ({ tool }) => {
  const { _id, name, port, toolStatus, toolURL, versionNumber, installationDate, dnsName } = tool;
  return (
    <div className="p-2 mt-2 border-bottom">
      <div className="row m-1">
        <div className="col-md col-header-text">{name}</div>
        <div className="col-md"><span className="text-muted">Port:</span> {port}</div>
        <div className="col-md"><span className="text-muted">Version:</span> {versionNumber}</div>
      </div>
      <div className="row m-1">
        <div className="col-md"><span className="text-muted">Status:</span> {toolStatus}</div>
        <div className="col-md"><span className="text-muted">Install Date:</span> <Moment format="MM/DD/YYYY" date={installationDate} /></div>
      </div>
      <div className="row m-1">
        <div className="col-md"><span className="text-muted">ID:</span> {_id}</div>
      </div>
      <div className="row m-1">
        <div className="col-md"><span className="text-muted">URL:</span> {toolURL}</div>
      </div>
      <div className="row m-1">
        <div className="col-md"><span className="text-muted">DNS:</span> {dnsName}</div>
      </div>
    </div>
  );
};

export default Inventory;
