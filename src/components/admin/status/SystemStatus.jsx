import React, { useReducer, useEffect, useContext } from "react";
import { Table, Row, Col, Alert, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { ApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import { Link } from "react-router-dom";

const Status = ({ color }) =>  <svg height="20" width="20"><circle cx="10" cy="10" r="10" fill={color} /></svg>;

function SystemStatus() {

  const Auth = useContext(AuthContext);
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
    const { authenticated, getUserRecord } = Auth;
    // function get the user data from okta and checks if the user is admin or not.
    async function checkUserData() {
      const userInfo = await getUserRecord();
      setState({ authenticated: authenticated });
      if (userInfo) {
        setState({ administrator: userInfo.groups.includes("Admin") });
      }

      if (!userInfo.groups.includes("Admin")) {
        //move out
        history.push("/");
      } else {
        // add any api calls if needed
        getStatus();
      }
    }
    checkUserData();
  }, []);

  async function getStatus() {
    const { getAccessToken } = Auth;
    const accessToken = await getAccessToken();
    const urlParams = state;
    new ApiService(
      "/tools/status/",
      null,
      accessToken,
      urlParams).get()
      .then(response => {
        console.log(response);
        console.log(response.data.message);
        if(response.data.status === 200) {
          setState({ 
            data: response.data.message,
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
  console.log(StatusData);

  const { fetching } = state;

  return (
    <div className="mt-3 max-content-width">
      {/* <h4>Administration Tools</h4> */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/admin">Admin</Link>
          </li>
          <li className="breadcrumb-item active">System Status</li> 
        </ol>
      </nav>  
      <h5>System Status</h5>
      <div>Listed below are system tools for Opsera.</div>
      <br />      

      {state.modal &&
        <Alert className="mt-3" variant={state.type} onClose={() => setState({ modal: false, type: "", title: "", message: "" })} dismissible>
          {state.title} {state.message}
        </Alert>
      }
      {fetching && <LoadingDialog />}
      {!fetching && !state.modal && state.data.length > 0 &&
          <>
            <Row>
              <Col sm={6}></Col>
              <Col sm={6}>
                <Row>
                  <Col md="auto"><Status color="#28C940" /> Available</Col>
                  <Col md="auto"><Status color="#ffbf00" /> Something went wrong</Col>
                  <Col md="auto"><Status color="#FF0000" /> Unavailable</Col>
                </Row>
              </Col>
            </Row>
            <Row className="m-5">

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
                                  { status.instance[0].status && status.instance[0].status === "UP" &&  <Status color="#28C940" /> }
                                  { status.instance[0].status && status.instance[0].status === "DOWN" &&  <Status color="#FF0000" /> }
                                  { status.instance[0].status && status.instance[0].status != "UP" && status.instance[0].status != "DOWN" &&  <Status color="#ffbf00" /> }
                                </Col>
                                <Col className="status-text">{status.name.replace(/-/g, " ")}</Col>
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

export default SystemStatus;
