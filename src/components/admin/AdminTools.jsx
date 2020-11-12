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
  faStream,
  faFileInvoice, faSitemap, faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import AccessDeniedDialog from "../common/status_notifications/accessDeniedInfo";
import LoadingDialog from "../common/status_notifications/loading";
import {DialogToastContext} from "../../contexts/DialogToastContext";
import {faBuilding} from "@fortawesome/pro-solid-svg-icons";


function AdminTools(props) {
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, featureFlagHideItemInProd } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

    return (
      <>
        <div className="max-content-width mt-1">
          <h4>Administration Tools</h4>
          <div>Listed below are administration tools for the platform.</div>
          <div className="p-3">
            <Row className="mt-3 admin-tools">
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/system-status"><FontAwesomeIcon icon={faHeartbeat} fixedWidth/> System Status</Link>
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
                <Link to={!featureFlagHideItemInProd() ? "/admin/kpis" : "#"}><FontAwesomeIcon icon={faFileInvoice} fixedWidth/> KPI Management</Link>
              </Col>              
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/templates"><FontAwesomeIcon icon={faStream} fixedWidth/> Pipeline Templates Editor</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/organizations"><FontAwesomeIcon icon={faSitemap} fixedWidth /> Organizations (LDAP)</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/admin/departments"><FontAwesomeIcon icon={faBuilding} fixedWidth /> Departments (LDAP)</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/accounts/create"><FontAwesomeIcon icon={faUserPlus} fixedWidth /> Customer Onboarding</Link>
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
}

AdminTools.propTypes = {};


export default AdminTools;
