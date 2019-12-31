import React, { Component } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faHeartbeat, faTimes, faUserCircle, faLink, faChartBar } from '@fortawesome/free-solid-svg-icons';

class AdminTools extends Component {
  static contextType = AuthContext;

  render() {
    const { authenticated, userInfo } = this.context;

    //TODO: Only render this if user is an Admin (need Okta groups)
    return (
      <div>
        <h3>Administration Tools</h3>
        <div>Listed below are administration tools for the platform.</div>

        <Row className="m-5">
          <Col xs={12} md={6} lg={4} className="p-2">
            <a href="/admin/health"><FontAwesomeIcon icon={faHeartbeat} fixedWidth /> System Health Check</a>
          </Col>
          <Col xs={12} md={6} lg={4} className="p-2">
            <a href="/admin/delete"><FontAwesomeIcon icon={faTimes} fixedWidth /> Delete Tools</a>
          </Col>
          <Col xs={12} md={6} lg={4} className="p-2">
            <a href="/admin/manage_systems"><FontAwesomeIcon icon={faEdit} fixedWidth /> System Management</a>
          </Col>
          <Col xs={12} md={6} lg={4} className="p-2">
            <a href="/admin/registered_users"><FontAwesomeIcon icon={faUserCircle} fixedWidth /> Registered Users</a>
          </Col>
          <Col xs={12} md={6} lg={4} className="p-2">
            <a href="/admin/analytics/reports_registration"><FontAwesomeIcon icon={faChartBar} fixedWidth /> Reports Registration</a>
          </Col>
          <Col xs={12} md={6} lg={4} className="p-2">
            <a href="/api_demo"><FontAwesomeIcon icon={faLink} fixedWidth /> API Test</a>
          </Col>
        </Row>

      </div>
    )
  }
}

export default AdminTools;