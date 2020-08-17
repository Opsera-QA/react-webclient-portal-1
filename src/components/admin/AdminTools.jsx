import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faHeartbeat,
  faTimes,
  faUserCircle,
  faLink,
  faChartBar,
  faWrench,
  faTags,
  faStream,
  faUsers,
  faFileInvoice
} from "@fortawesome/free-solid-svg-icons";
import AccessDeniedDialog from "../common/accessDeniedInfo";
import LoadingDialog from "../common/loading";


function AdminTools(props) {
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, featureFlagItemInProd } = useContext(AuthContext);

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  } else if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  } else {
    return (
      <>
        <div className="max-content-width mt-1">
          <h4>Administration Tools</h4>
          <div>Listed below are administration tools for the platform.</div>
          <div className="p-3">
            <Row className="mt-3 admin-tools">
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/systemstatus"><FontAwesomeIcon icon={faHeartbeat} fixedWidth/> System Status</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/customerstatus"><FontAwesomeIcon icon={faHeartbeat} fixedWidth/> Customer System
                  Status</Link>
              </Col>
              {/* <Col xs={12} md={6} lg={4} className="p-2">
               <Link to="/admin/health"><FontAwesomeIcon icon={faHeartbeat} fixedWidth /> System Health Check</Link>
               </Col> */}

              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/reports"><FontAwesomeIcon icon={faLink} fixedWidth/> Reports</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/analytics/reports-registration"><FontAwesomeIcon icon={faChartBar}
                                                                                  fixedWidth/> Reports
                  Registration</Link>
              </Col>

              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/manage_systems"><FontAwesomeIcon icon={faEdit} fixedWidth/> System Management</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/registered-users"><FontAwesomeIcon icon={faUserCircle} fixedWidth/> Registered
                  Users</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/demo/api"><FontAwesomeIcon icon={faLink} fixedWidth/> API & Token Data</Link>
              </Col>

              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/tools"><FontAwesomeIcon icon={faWrench} fixedWidth/> Tool
                  Configurations</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/delete"><FontAwesomeIcon icon={faTimes} fixedWidth/> Delete Tools</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to={!featureFlagItemInProd() ? "/admin/tags" : "#"}><FontAwesomeIcon icon={faTags}
                                                                                           fixedWidth/> Tags</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to={!featureFlagItemInProd() ? "/admin/kpis" : "#"}><FontAwesomeIcon icon={faFileInvoice} fixedWidth/> KPI Management</Link>
              </Col>              
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/template-editor"><FontAwesomeIcon icon={faStream} fixedWidth/> Pipeline Templates Editor</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/templates"><FontAwesomeIcon icon={faStream} fixedWidth/> Pipeline Templates Editor</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to={"/accounts"}><FontAwesomeIcon icon={faUsers}
                                                        fixedWidth/> Account Management
                  (LDAP)</Link>
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  }
}

AdminTools.propTypes = {};


export default AdminTools;
