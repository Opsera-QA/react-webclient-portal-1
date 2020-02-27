import React, { useReducer, useEffect, Fragment, useContext } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import { AuthContext } from "../../contexts/AuthContext";
import Moment from "react-moment";
//import InfoDialog from "../common/info";
import Modal from "../common/modal";
import { ApiService } from "../../api/apiService";

function RegisteredUsers_Hooks() {

  const Auth = useContext(AuthContext);
  console.log(Auth);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      data: [],
      confirm: false,
      delUserId: "",
      fetching: true,
      error: null,
      messages: null
    }
  );

  useEffect(() => {
    getApiData();
  }, []);

  function handleDeletePress(userId) { setState({ confirm: true, delUserId: userId }); }
  function handleCancel() { setState({ confirm: false, delUserId: "" }); }

  function handleConfirm() {
    const { delUserId } = state;
    handleDeactivateUser(delUserId);
    setState({ confirm: false, delUserId: "" });
  }

  function handleDeactivateUser(userId) {
    const { getAccessToken, getUserInfo } = Auth;  //this.context is where all data from the above AuthContext component resides.  It's like the state props design wise
    const accessToken = getAccessToken();
    const userInfo = getUserInfo();
    deactivateUser(userId, accessToken, userInfo);
  }

  function deactivateUser(userId, accessToken) {
    console.log(userId);
    // deactivate user api call goes here
    const apiCall = new ApiService("/users/deactivate-user", null, accessToken, { userId: userId });
    apiCall.post()
      .then(function (response) {
        setState({
          deactivate: response.data,
          error: null,
          fetching: false
        });
      })
      .catch(function (error) {
        setState({
          error: error,
          fetching: false
        });
      });

  }

  function getApiData() {
    const { getAccessToken } = Auth;
    const accessToken = getAccessToken();
    const apiCall = new ApiService("/users/get-users", {}, accessToken);
    apiCall.get()
      .then(function (response) {
        // console.log(response.data)
        setState({
          data: response.data,
          error: null,
          fetching: false
        });
      })
      .catch(function (error) {
        setState({
          error: error,
          fetching: false
        });
      });
  }

  const { data, error, fetching, confirm } = state;

  return (
    <div>
      <h3 style={{ padding: "20px" }}>Registered Users</h3>

      {error ? <ErrorDialog error={error} /> : null}
      {fetching && <LoadingDialog />}

      {confirm ? <Modal header="Confirm Deactivation"
        message="Warning! Data cannot be recovered once a User is deactivated. Do you still want to proceed?"
        button="Confirm"
        handleCancelModal={handleCancel}
        handleConfirmModal={handleConfirm} /> : null}

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
                  <Button variant="danger" onClick={() => { handleDeletePress(val._id); }} >Deactivate User</Button>
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

            </Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
}


export default RegisteredUsers_Hooks;