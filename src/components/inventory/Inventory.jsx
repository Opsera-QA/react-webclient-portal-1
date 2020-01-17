/* eslint-disable react/prop-types */
import React, { PureComponent } from "react";
import { Form, Alert, Row, Col, Button } from "react-bootstrap";
import Moment from "react-moment";
import { AuthContext } from "../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import { handleError } from "../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStream } from "@fortawesome/free-solid-svg-icons";


class Inventory extends PureComponent {
  static contextType = AuthContext;  //Registers the User Authentication context data in the component

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      fetching: true,
      error: null,
      messages: null
    };
  }

  componentDidMount() {
    this.getApiData();
  }

  gotoLink = (id) => {
    let path = `/${id}`;
    this.props.history.push(path);
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


  handleDropdownChange = (e) => {
    this.setState({ key: e.target.value });
  }

  getApp = () => {
    console.log(this.state);
    const { key, data } = this.state;
    return data.find(({ name }) => name === key);
  }

  setPlaceholder = () => {
    alert("coming soon");
  }

  render() {
    const { data, error, fetching } = this.state;
    return (
      <div>
        <h3>Inventory</h3>
        <p>All configured applications and tools are available for viewing below.  Select the item you want to view from the list.</p>

        <div className="row">
          <div className="col ml-auto">
            <Button variant="outline-primary" className="float-right" size="sm" onClick={() => this.gotoLink("platform")}>
              <FontAwesomeIcon icon={faPlus} fixedWidth /> New Platform
            </Button>

            <Button variant="outline-primary" className="float-right mr-2" size="sm" onClick={() => this.gotoLink("pipeline")}>
              <FontAwesomeIcon icon={faStream} fixedWidth /> Pipelines
            </Button>
          </div>
        </div>

        {error ? <ErrorDialog error={error} /> : null}

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
                hidden={(!fetching && data.length > 0) ? false : true}
                onChange={this.handleDropdownChange}
                style={{ marginTop: 25 }}>
                <option value="" disabled>{fetching ? "loading..." : "Select application"}</option>
                {!fetching && (
                  <>
                    {data ? data.map(application => (
                      <>
                        {
                          application.tools.length > 0 && (
                            <option key={application.name} value={application.name}>{application.name}</option>
                          )
                        }
                      </>
                    )) : ""}
                  </>
                )}
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
        {
          (!fetching && data.length > 0) &&
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
    <div className="p-2 mt-2">
      <div className="row m-1">
        <div className="col-md col-header-text">{name}</div>
        <div className="col-md"><span className="text-muted">Port:</span> {port}</div>
        <div className="col-md"><span className="text-muted">Version:</span> {versionNumber}</div>
        <div className="col-md"><span className="text-muted">Install Date:</span> <Moment format="MM/DD/YYYY" date={installationDate} /></div>
      </div>
      <div className="row m-1">
        <div className="col-md"><span className="text-muted">Status:</span> {toolStatus}</div>
        <div className="col-md"><span className="text-muted">ID:</span> {_id}</div>
      </div>
      <div className="row m-1">
        <div className="col-md"><span className="text-muted">URL:</span> {toolURL}</div>
        <div className="col-md"><span className="text-muted">DNS:</span> {dnsName}</div>
      </div>
    </div>
  );
};

export default Inventory;
