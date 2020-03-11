import React, { useReducer, useEffect, useContext } from "react";
import { Table, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import ErrorDialog from "../../common/error";
import LoadingDialog from "../../common/loading";

const Status = ({ color }) =>  <svg height="20" width="20"><circle cx="10" cy="10" r="10" fill={color} /></svg>;

function SystemStatus() {

  const Auth = useContext(AuthContext);
  let history = useHistory();
  
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { 
      administrator: false,
    }
  );

  useEffect(() => {
    const { authenticated, getUserInfo } = Auth;
    // function get the user data from okta and checks if the user is admin or not.
    async function checkUserData() {
      const userInfo = await getUserInfo();
      setState({ authenticated: authenticated });
      if (userInfo) {
        setState({ administrator: userInfo.Groups.includes("Admin") });
      }

      if (!userInfo.Groups.includes("Admin")) {
        //move out
        history.push("/");
      } else {
        // add any api calls if needed
      }
    }
    checkUserData();
  }, []);

  return (
    <div className="mt-3 max-content-width">
      <h4>System Status</h4>
      <div>Listed below are system tools for Opsera.</div>
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
            <tr>
              <td> 
                <Row>
                  <Col md="auto"><Status color="#28C940" /></Col>
                  <Col>System</Col>
                </Row>
              </td>
              <td>
                <Row>
                  <Col md="auto"><Status color="#28C940" /></Col>
                  <Col>Platform Database</Col>
                </Row>
              </td>
              <td>
                <Row>
                  <Col md="auto"><Status color="#28C940" /></Col>
                  <Col>Web Portal
                  </Col>
                </Row>
              </td>
              <td>
                <Row>
                  <Col md="auto"><Status color="#ffbf00" /></Col>
                  <Col>API layer</Col>
                </Row>
              </td>
            </tr>
            <tr>
              <td> 
                <Row>
                  <Col md="auto"><Status color="#28C940" /></Col>
                  <Col>System</Col>
                </Row>
              </td>
              <td>
                <Row>
                  <Col md="auto"><Status color="#FF0000" /></Col>
                  <Col>System</Col>
                </Row>
              </td>
              <td>
                <Row>
                  <Col md="auto"><Status color="#28C940" /></Col>
                  <Col>System</Col>
                </Row>
              </td>
              <td>
                <Row>
                  <Col md="auto"><Status color="#FF0000" /></Col>
                  <Col>System</Col>
                </Row>
              </td>
            </tr>
            <tr>
              <td> 
                <Row>
                  <Col md="auto"><Status color="#28C940" /></Col>
                  <Col>System</Col>
                </Row>
              </td>
              <td>
                <Row>
                  <Col md="auto"><Status color="#ffbf00" /></Col>
                  <Col>System</Col>
                </Row>
              </td>
              <td>
                <Row>
                  <Col md="auto"><Status color="#FF0000" /></Col>
                  <Col>System</Col>
                </Row>
              </td>
              <td>
                <Row>
                  <Col md="auto"><Status color="#28C940" /></Col>
                  <Col>System</Col>
                </Row>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default SystemStatus;
