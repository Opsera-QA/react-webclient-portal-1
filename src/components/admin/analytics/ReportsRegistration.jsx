import React, { Component } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Row, Col } from "react-bootstrap";
import { faCogs, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

class AdminReportRegistration extends Component {
  static contextType = AuthContext;
  state = {
    administrator: false
  }

  async componentDidMount() {
    const { getUserRecord } = this.context;  //this.context is where all data from the above AuthContext component resides.  It's like the state props design wise
    const userInfo = await getUserRecord();
    this.setState({ administrator: userInfo.groups.includes("Admin") });

    if (!userInfo.groups.includes("Admin")) {
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

        {/* <h4>Administration Tools</h4> */}

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
            <li className="breadcrumb-item">
              <Link to="/admin">Admin</Link>
            </li>
            <li className="breadcrumb-item active">Report Registration</li> 
          </ol>
        </nav>     

        <h5>Report Registration</h5>     

        {administrator &&
          <div>
            <div>Tools and forms will be listed below for registering reporting systems for the portal and individual customers.
              This tool is intended to be use by OpsERA admins for onboarding new customers.
            </div>
            <Row className="mt-5">
              <Col lg={12} className="pb-2" style={{ fontWeight: "bold", fontSize: "larger" }}>ElasticSearch/Kibana Configurations</Col>
            </Row>
            <Row>
              <Col xs={12} md={6} lg={6}>
                <a href="#/"><IconBase icon={faCogs} /> System Based Index Pattern Editor</a>:
                <div style={{ margin: 0, paddingTop: 5 }}>UI to copy and paste in a JSON based Index Pattern exported from the Master Kibana instance for a specific system: Jenkins, Sonar, etc.
                  These Index Patterns will be used during individual customer report enablement.  We will store attributes around them such as
                  the version of Kibana/ElasticSearch stored.</div>
              </Col>

              <Col xs={12} md={6} lg={6}>
                <a href="#/"><IconBase icon={faUserCog} /> Customer Kibana Configuration Editor</a>:
                <div style={{ margin: 0, paddingTop: 5 }}>UI to select the specific customer being onboarded and register their new Kibana instance information for the system.  This includes the
                  instance ID/Name, URL/DNS, and the service account used for the system to automatically register Index Patterns for reporting.</div>
              </Col>
            </Row>
          </div>
        }
      </>
    );
  }
}

AdminReportRegistration.propTypes = {
  history: PropTypes.any
};

export default AdminReportRegistration;