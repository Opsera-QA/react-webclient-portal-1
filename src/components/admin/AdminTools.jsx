import React, { Component } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faHeartbeat, faTimes, faUserCircle, faLink, faChartBar, faColumns } from "@fortawesome/free-solid-svg-icons";

const apiServerUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;

class AdminTools extends Component {
  static contextType = AuthContext;
  constructor(props, context) {
    super(props, context);
    this.state = {
      administrator: false
    };
  }

  async componentDidMount() {
    const { getUserInfo } = this.context;
    const userInfo = await getUserInfo();
    console.log(userInfo);
    this.setState({ administrator: userInfo.Groups.includes("Admin") });
    if (!userInfo.Groups.includes("Admin")) {
      //move out
      this.props.history.push("/");
    } else {
      //do nothing
    }
  }

  render() {
    const { administrator } = this.state;
    return (
      <>
        {
          administrator &&
          <div className="mt-3 max-content-width">
            <h4>Administration Tools</h4>
            <div>Listed below are administration tools for the platform.</div>

            <Row className="m-5">
              {/* <Col xs={12} md={6} lg={4} className="p-2">
               <Link to="/admin/health"><FontAwesomeIcon icon={faHeartbeat} fixedWidth /> System Health Check</Link>
               </Col> */}
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/delete"><FontAwesomeIcon icon={faTimes} fixedWidth /> Delete Tools</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/manage_systems"><FontAwesomeIcon icon={faEdit} fixedWidth /> System Management</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/registered_users"><FontAwesomeIcon icon={faUserCircle} fixedWidth /> Registered Users</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/analytics/reports_registration"><FontAwesomeIcon icon={faChartBar} fixedWidth /> Reports Registration</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/api_demo"><FontAwesomeIcon icon={faLink} fixedWidth /> API Test</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/reports"><FontAwesomeIcon icon={faLink} fixedWidth /> Reports</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/systemstatus"><FontAwesomeIcon icon={faHeartbeat} fixedWidth /> System Status</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/customerstatus"><FontAwesomeIcon icon={faHeartbeat} fixedWidth /> Customer System Status</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <a href={ apiServerUrl + "/tasks" } target="_blank"><FontAwesomeIcon icon={faColumns} fixedWidth /> Tasks Dashboard</a>
              </Col>
            </Row>

          </div>
        }
      </>
    );
  }
}

export default AdminTools;