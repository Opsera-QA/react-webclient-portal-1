import React, { PureComponent, Fragment } from "react";
import { Table, Row, Col, Button, Modal } from "react-bootstrap";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import Moment from "react-moment";
import { AuthContext } from "../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../api/apiService";

export default class RegisteredUsers extends PureComponent {
  static contextType = AuthContext;
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      confirm: false,
      delUserId: "",
      fetching: true,
      error: null,
      messages: null
    };
  }

  componentDidMount() {
    this.getApiData();
  }

  handleDeletePress = (userId) => this.setState({ confirm: true, delUserId: userId })
  handleCancel = () => this.setState({ confirm: false, delUserId: "" })

  handleConfirm = () => {
    const { delUserId } = this.state;
    this.handleDeactivateUser(delUserId);
    this.setState({ confirm: false, delUserId: "" });
  }

  handleDeactivateUser = async (userId) => {
    const { getAccessToken, getUserInfo } = this.context;  //this.context is where all data from the above AuthContext component resides.  It's like the state props design wise
    const accessToken = await getAccessToken();
    // const userInfo = await getUserInfo();
    this.deactivateUser(userId, accessToken);
  }

  deactivateUser = async (userId, accessToken) => {
    console.log(userId);
    // deactivate user api call goes here
    const apiCall = new ApiService("/users/deactivate-user", null, accessToken, { userId: userId });
    let currentComponent = this;
    apiCall.post()
      .then(function (response) {
        currentComponent.setState({
          deactivate: response.data,
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

  async getApiData() {
    const { getAccessToken } = this.context;
    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/users/get-users", {}, accessToken);
    let currentComponent = this;
    apiCall.get()
      .then(function (response) {
        // console.log(response.data)
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

  render() {
    const { data, error, fetching } = this.state;
    console.log(data);
    return (
      <>
        <h3 style={{ padding: "20px" }}>Registered Users</h3>

        {error ? <ErrorDialog error={error} /> : null}
        {fetching && <LoadingDialog />}

        <Table responsive>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Organization</th>
              <th>Division</th>
              <th>Domain</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, key) => (
              <Fragment key={key}>
                <tr>
                  <td>{val.firstName}</td>
                  <td>{val.lastName}</td>
                  <td>{val.email}</td>
                  <td>{val.organizationName}</td>
                  <td>{val.division}</td>
                  <td>{val.domain}</td>
                  <td><Moment format="MM/DD/YYYY" date={val.createdAt} /></td>
                  <td>
                    <Button variant="danger" onClick={() => { this.handleDeletePress(val._id); }} >Deactivate User</Button>
                  </td>
                </tr>

                {val.tools ? (
                  Object.keys(val.tools).length > 0 ? (
                    <tr>
                      <td colSpan="7" style={{ borderTop: 0, paddingTop: 0, marginTop: 0, paddingBottom: "25px" }}>
                        {val.tools.map((tool, index) => (
                          <Row key={index} style={{ marginLeft: "10px", fontSize: ".9em" }}>
                            <Col>{tool.name}</Col>
                            <Col>{tool.toolStatus}</Col>
                            <Col>{tool._id}</Col>
                          </Row>
                        ))}
                      </td>
                    </tr>
                  ) :
                    <tr>
                      <td colSpan="7" className="text-muted text-center" style={{ borderTop: 0, paddingBottom: "25px" }}>No tools are associated with this user account!</td>
                    </tr>
                ) :
                  <tr>
                    <td colSpan="7" className="text-muted text-center" style={{ borderTop: 0, paddingBottom: "25px" }}>No tools are associated with this user account!</td>
                  </tr>
                }


                <Modal show={this.state.confirm} onHide={this.handleCancel}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Warning! Data cannot be recovered once a User is deactivated. Do you still want to proceed?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={this.handleConfirm}>
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Modal>

              </Fragment>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}
