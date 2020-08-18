import React, { useReducer, useEffect, useContext, useState } from "react";
import { Table, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import ErrorDialog from "../../common/error";
import LoadingDialog from "../../common/loading";
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
      //await getStatus();  this will call funciton to load data..
    } else {
      history.push("/");
    }
  };


  return (
    <div className="mt-3 max-content-width">

      {/* <h4>Administration Tools</h4> */}
      
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/admin">Admin</Link>
          </li>
          <li className="breadcrumb-item active">Customer Status</li> 
        </ol>
      </nav> 
      <h5>Customer System Status</h5>
      <div>Listed below are Customer tools for Opsera.</div>      
      <br /> 

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

        <h4>Coming soon!</h4>
        {/*<Table >
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
                  <Col md="auto"><Status color="#28C940" /></Col>
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
                  <Col md="auto"><Status color="#ffbf00" /></Col>
                  <Col>System</Col>
                </Row>
              </td>
            </tr>
          </tbody>
        </Table> */}
      </Row>
    </div>
  );
}


export default CustomerSystemStatus;