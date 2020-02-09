import React, { Component } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faUserCog, faLink } from "@fortawesome/free-solid-svg-icons";

class AdminReportRegistration extends Component {
  state = {}
  render() {
    return (
      <div>
        <h4>Administration Tools: Report Registration</h4>
        <div>Tools and forms will be listed below for registering reporting systems for the portal and individual customers.
          This tool is intended to be use by OpsERA admins for onboarding new customers.
        </div>

        
        <Row className="mt-5">
          <Col lg={12} className="pb-2" style={{ fontWeight: "bold", fontSize: "larger" }}>ElasticSearch/Kibana Configurations</Col>
        </Row>
        <Row>
          <Col xs={12} md={6} lg={6}>
            <a href="#/"><FontAwesomeIcon icon={faCogs} fixedWidth /> System Based Index Pattern Editor</a>:
            <div style={{ margin: 0, paddingTop:5 }}>UI to copy and paste in a JSON based Index Pattern exported from the Master Kibana instance for a specific system: Jenkins, Sonar, etc.
            These Index Patterns will be used during individual customer report enablement.  We will store attributes around them such as
            the version of Kibana/ElasticSearch stored.</div>
          </Col>

          <Col xs={12} md={6} lg={6}>
            <a href="#/"><FontAwesomeIcon icon={faUserCog} fixedWidth /> Customer Kibana Configuration Editor</a>:
            <div style={{ margin: 0, paddingTop:5 }}>UI to select the specific customer being onboarded and register their new Kibana instance information for the system.  This includes the
            instance ID/Name, URL/DNS, and the service account used for the system to automatically register Index Patterns for reporting.</div>
          </Col>

        </Row>

      </div>
    );
  }
}

export default AdminReportRegistration;