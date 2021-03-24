import React, { PureComponent } from "react";
import { Container, Form, Alert } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../../api/apiService";
import ErrorDialog from "../../common/status_notifications/error";
import LoadingDialog from "../../common/status_notifications/loading";
import Tools from "./Tools";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class DeleteTools extends PureComponent {
  static contextType = AuthContext;
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      fetching: true,
      error: null,
      administrator: false,
      messages: null,
      application: null
    };
  }

  async componentDidMount() {
    const { getAccessToken, getUserRecord } = this.context;  //this.context is where all data from the above AuthContext component resides.  It's like the state props design wise
    const userInfo = await getUserRecord();
    this.setState({ administrator: userInfo.groups.includes("Admin") });

    if (!userInfo.groups.includes("Admin")) {
      //move out
      this.props.history.push("/");
    } else {
      //do nothing
      const urlParams = { userid: userInfo.userId };
      const accessToken = await getAccessToken();
      this.getApiData(accessToken, urlParams);
    }
  }

  getApiData(accessToken, urlParams) {
    const apiCall = new ApiService("applications", urlParams, accessToken);
    let currentComponent = this;
    apiCall.get().then(function (response) {
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

  handleChangeValue = (e) => {
    const { data } = this.state;
    const application = data.find(app => app.name === e.target.value);
    this.setState({
      application,
    });
  }

  render() {
    const { data, error, fetching, administrator } = this.state;
    console.log(data);

    return (
      <>
        {
          administrator &&
          <div className="DefaultDashboardPage">
            {/* <h4>Administration Tools</h4>   */}
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
                <li className="breadcrumb-item">
                  <Link to="/admin">Admin</Link>
                </li>
                <li className="breadcrumb-item active">Delete Tools</li> 
              </ol>
            </nav> 
            <h5>Delete Tools</h5>
            <div style={{ marginBottom: "10px" }}>This tool enables administrators to select a registered application, view the active tools and then delete them from the platform.  At this
              time the tool does not perform a complete end to end removal of all instances related to an application.
            </div>
            {error ? <ErrorDialog error={error} /> : null}
            {fetching && <LoadingDialog />}

            {(!fetching && data.length === 0) &&
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
                  onChange={this.handleChangeValue}
                  style={{ marginTop: 25 }}>
                  <option value="" disabled>{fetching ? "loading..." : "Select application"}</option>
                  {!fetching && (
                    <>
                      {data ? data.map(application => (
                        <option key={application.name} value={application.name}>{application.name}</option>
                      )) : ""}
                    </>
                  )}
                </Form.Control>
              </Form.Group>
            </Form>

            <Tools application={this.state.application} />
          </div>
        }
      </>
    );
  }
}

DeleteTools.propTypes = {
  history: PropTypes.any
};

export default DeleteTools;
