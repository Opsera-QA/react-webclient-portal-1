import React, { useReducer, useEffect, useContext, useState } from "react";
import { Table, Row, Col, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import { ApiService } from "../../api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import { Link } from "react-router-dom";

const Status = ({ color }) =>  <svg height="20" width="20"><circle cx="10" cy="10" r="10" fill={color} /></svg>;

function CustomerSystemStatus() {
  
  const Auth = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles } = Auth;
  let history = useHistory();
  
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { 
      administrator: false,
      data: [],
      modal: false,
      fetching: true
    }
  );


  useEffect(() => {
    getRoles();
  }, []);


  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }

    if (userRoleAccess.OpseraAdministrator) {
      await getStatus();
    } else {
      history.push("/");
    }
  };

  async function getStatus() {
    const { getAccessToken } = Auth;
    const accessToken = await getAccessToken();
    const urlParams = state;
    new ApiService(
      "/tools/customer-status/",
      null,
      accessToken,
      urlParams).get()
      .then(response => {
        console.log(response);
        if(response.status === 200) {
          setState({ 
            data: response.data,
            fetching: false
          });
        } else {
          setState({
            fetching: false
          });
          showErrorAlert("Error Fetching Status. Contact Administrator for more details.");  
        }
      })
      .catch = (e) => {
        console.log(e);
        setState({
          fetching: false
        });
        showErrorAlert("Error Fetching Status. Contact Administrator for more details.");
      };
  }

  const showErrorAlert = (message) => {
    setState({
      modal: true,
      type: "danger",
      title: "Error!",
      message: message
    });
  };

  function chunks(arr, size) {
    if (!Array.isArray(arr)) {
      console.log(arr);
      throw new TypeError("Input should be Array");
    }
  
    if (typeof size !== "number") {
      throw new TypeError("Size should be a Number");
    }
  
    var result = [];
    for (var i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, size + i));
    }
  
    return result;
  }

  const StatusData = chunks(state.data, 4);
  const { fetching } = state;

  return (
    <div className="mt-3 max-content-width">

      {/* <h4>Administration Tools</h4> */}
      
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/settings">Account Settings</Link>
          </li>
          <li className="breadcrumb-item active">Customer Status</li> 
        </ol>
      </nav> 
      <h5>Customer System Status</h5>
      <div>Listed below are Customer tools for Opsera.</div>      
      <br /> 

      {state.modal &&
        <Alert className="mt-3" variant={state.type} onClose={() => setState({ modal: false, type: "", title: "", message: "" })} dismissible>
          {state.title} {state.message}
        </Alert>}

      {fetching && <LoadingDialog />}
      {!fetching && !state.modal && state.data.length > 0 &&
<>
      <Row>
        <Col sm={6}></Col>
        <Col sm={6}>
          <Row>
            <Col md="auto"><Status color="#28C940" /> Available</Col>
            {/* <Col md="auto"><Status color="#ffbf00" /> Something went wrong</Col> */}
            <Col md="auto"><Status color="#FF0000" /> Unavailable</Col>
          </Row>
        </Col>
      </Row>
      <Row className="m-5">

        {/* <h4>Coming soon!</h4> */}
        <Table >
                <tbody>

                  {
                    StatusData.map((statusArray, key) => (
                      <tr key={key}>
                        {
                          statusArray.map((status, key) => (
                            <td  key={key}>
                              <Row>
                                <Col md="auto">
                                  { status.status && status.status === "Healthy" &&  <Status color="#28C940" /> }
                                  { status.status && status.status === "Unhealthy" &&  <Status color="#FF0000" /> }
                                  { status.status && status.status != "Healthy" && status.status != "Unhealthy" &&  <Status color="#ffbf00" /> }
                                </Col>
                                <Col className="status-text">{status.pod}</Col>
                              </Row>
                            </td>
                          ))
                        }
                      </tr>
                    ))
                  }

                </tbody>
              </Table>
        </Row>
        </>
      }
    </div>
  );
}


export default CustomerSystemStatus;