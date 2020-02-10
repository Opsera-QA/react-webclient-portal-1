import React, { Component } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faHeartbeat, faTimes, faUserCircle, faLink, faChartBar } from "@fortawesome/free-solid-svg-icons";

class AdminTools extends Component {
  static contextType = AuthContext;

  render() {
    const { authenticated, userInfo } = this.context;

    //TODO: Only render this if user is an Admin (need Okta groups)
    return (
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
        </Row>

      </div>
    );
  }
}

export default AdminTools;