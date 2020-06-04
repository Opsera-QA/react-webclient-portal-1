import React, { useReducer, useEffect, Fragment, useContext } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import { AuthContext } from "../../contexts/AuthContext";
import { format } from "date-fns";
//import InfoDialog from "../common/info";
import Modal from "../common/modal";
import { ApiService, axiosApiService } from "../../api/apiService";

function RegisteredUsers() {
  const Auth = useContext(AuthContext);
  let history = useHistory();
  // console.log(Auth);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      data: [],
      confirm: false,
      delUserId: "",
      administrator: false,
      fetching: true,
      error: null,
      messages: null,
      deployingElk: false,
      accessToken: null,
      userInfo: null
    }
  );

  useEffect(() => {
    loadPage();
  }, []);

  async function loadPage() {
    await checkUserData();
    getApiData();
    console.log(state);
  }

  async function checkUserData() {
    const { authenticated, getUserInfo, getAccessToken } = Auth;    
    const accessToken = await getAccessToken();
    const userInfo = await getUserInfo();
    setState({ accessToken: accessToken, userInfo: userInfo, authenticated: authenticated });
    if (userInfo) {
      setState({ administrator: userInfo.Groups.includes("Admin") });
    }

    if (!userInfo.Groups.includes("Admin")) {
      //move out
      history.push("/");
    } else {
      getApiData();
    }
  }

  function handleDeletePress(userId) { setState({ confirm: true, delUserId: userId }); }
  function handleCancel() { setState({ confirm: false, delUserId: "" }); }

  function handleConfirm() {
    const { delUserId } = state;
    handleDeactivateUser(delUserId);
    setState({ confirm: false, delUserId: "" });
  }

  function handleDeactivateUser(userId) {
    const { accessToken, userInfo } = state;
    deactivateUser(userId, accessToken, userInfo);
  }

  async function handleDeployElkStack(userId) {
    setState({ deployingElk: true });
    await deployElkStack(userId);
    //refresh page
    getApiData();
    setState({ deployingElk: false });
  }

  async function deployElkStack(id) {
    const { accessToken } = state;
    const apiUrl = `/users/tools/activate-elk/${id}`;         
    try {
      const response = await axiosApiService(accessToken).get(apiUrl);      
      console.log(response);    
    }
    catch (err) {
      console.log(err.message);
      setState({
        error: err,
        fetching: false
      });
    }
  }

  function deactivateUser(userId) {
    const { accessToken } = state;
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
    const { accessToken } = state;
    const apiCall = new ApiService("/users/get-users", {}, accessToken);
    apiCall.get()
      .then(function (response) {
        // console.log(response.data)
        setState({
          data: response.data.users,
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

  const { data, error, fetching, confirm, administrator, deployingElk } = state;

  return (
    <>
      {
        administrator &&
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
                <th style={{ width: "10%" }}>SSO Users ID</th>
                <th style={{ width: "20%" }}>Name</th>
                <th style={{ width: "20%" }}>Email</th>
                <th style={{ width: "15%" }}>Organization</th>
                <th style={{ width: "10%" }}>Domain</th>
                <th style={{ width: "15%" }}>Created</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, key) => (
                <Fragment key={key}>
                  <tr>
                    <td>{val._id}</td>
                    <td>{val.firstName} {val.lastName}</td>
                    <td>{val.email}</td>
                    <td>{val.organizationName}</td>
                    <td>{val.domain}</td>
                    
                    <td>{format(new Date(val.createdAt), "yyyy-MM-dd', 'hh:mm a")}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => { handleDeletePress(val._id); }} >Deactivate User</Button>
                    </td>
                  </tr>

                  {val.tools ? (
                    Object.keys(val.tools).length > 0 ? (
                      <tr>
                        <td colSpan="7" style={{ borderTop: 0, paddingTop: 0, marginTop: 0, paddingBottom: "25px" }}>
                          <h6>Tools:</h6>
                          {val.tools.map((tool, index) => (
                            <Row key={index} style={{ marginLeft: "10px", fontSize: ".9em" }}>
                              <Col xs={3}>{tool._id}</Col>
                              <Col xs={2}>{tool.name}</Col>
                              <Col xs={2}>{tool.toolStatus}</Col>
                              <Col>{tool.dnsName}</Col>                              
                            </Row>
                          ))}
                        </td>
                      </tr>
                    ) :
                      <tr>
                        <td colSpan="7" className="text-muted text-center" style={{ borderTop: 0, paddingBottom: "25px" }}>
                          No tools are associated with this user account! 
                          <br />
                          <Button variant="outline-secondary" disabled={deployingElk} size="sm" 
                            onClick={() => { handleDeployElkStack(val._id); }} >
                            Deploy ELK Stack Now</Button>
                        </td>
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
      }
    </>
  );
}


export default RegisteredUsers;