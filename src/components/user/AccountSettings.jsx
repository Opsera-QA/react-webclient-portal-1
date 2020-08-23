import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingDialog from "../common/status_notifications/loading";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends, faUser } from "@fortawesome/free-solid-svg-icons";
import BreadcrumbTrail from "../common/navigation/breadcrumbTrail";
import AccessDeniedDialog from "../common/status_notifications/accessDeniedInfo";

function AccountSettings() {
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);

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
  } else if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  } else {
    return (
      <>
        <BreadcrumbTrail destination="ldapDashboard" />
        <div className="max-content-width ml-2 mt-1">
          <h5>Account Settings</h5>
          <div>Manage groups and users from this dashboard.</div>

          <Row className="ml-3 mt-3 admin-tools">
            <Col xs={12} md={6} lg={4} className="p-2">
              <Link to="/accounts/groups"><FontAwesomeIcon icon={faUserFriends} fixedWidth /> Groups</Link>
            </Col>
            <Col xs={12} md={6} lg={4} className="p-2">
              <Link to="/accounts/users"><FontAwesomeIcon icon={faUser} fixedWidth /> Users</Link>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default AccountSettings;

