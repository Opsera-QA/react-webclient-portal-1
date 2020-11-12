import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingDialog from "../common/status_notifications/loading";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserFriends, faUser, faTags, faUsers, faHeartbeat} from "@fortawesome/free-solid-svg-icons";
import BreadcrumbTrail from "../common/navigation/breadcrumbTrail";
import AccessDeniedDialog from "../common/status_notifications/accessDeniedInfo";
import accountsActions from "../admin/accounts/accounts-actions";
import {DialogToastContext} from "../../contexts/DialogToastContext";

function AccountSettings() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, featureFlagHideItemInProd } = useContext(AuthContext);
  const envIsProd = featureFlagHideItemInProd();
  const toastContext = useContext(DialogToastContext);
  const [userDetailsLink, setUsersDetailLink] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false)
    }
  }

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      const userDetailViewLink = await accountsActions.getUserDetailViewLink(getUserRecord);
      setUsersDetailLink(userDetailViewLink);
    }
  };

  if (!accessRoleData || isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator && !userDetailsLink) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

  return (
    <>
      <BreadcrumbTrail destination="accountSettings"/>
      <div className="max-content-width ml-2 mt-1">
        <h5>Account Settings</h5>
        <div>Manage groups and users from this dashboard.</div>

        <Row className="ml-3 mt-3 admin-tools">
          {userDetailsLink && <Col xs={12} md={6} lg={4} className="p-2">
            <Link to={userDetailsLink}><FontAwesomeIcon icon={faUser} fixedWidth className="mr-2"/>My User Record</Link>
          </Col>}
          {(accessRoleData.PowerUser || accessRoleData.Administrator || accessRoleData.OpseraAdministrator) &&
            <>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/settings/groups"><FontAwesomeIcon icon={faUserFriends} fixedWidth className="mr-2"/>Groups</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to="/settings/users"><FontAwesomeIcon icon={faUser} fixedWidth className="mr-2"/>Users</Link>
              </Col>
              <Col xs={12} md={6} lg={4} className="p-2">
                <Link to={"/settings/tags"}><FontAwesomeIcon icon={faTags} fixedWidth className="mr-2"/>Tags</Link>
              </Col>
              {!envIsProd ?
            <Col xs={12} md={6} lg={4} className="p-2">
              <Link to="/settings/customer-system-status"><FontAwesomeIcon icon={faHeartbeat} fixedWidth/> Customer Status</Link>
            </Col> : null}
              {/*<Col xs={12} md={6} lg={4} className="p-2">*/}
              {/*  <Link to="/admin/organization-accounts"><FontAwesomeIcon icon={faUsers} fixedWidth /> Organization Accounts (LDAP)</Link>*/}
              {/*</Col>*/}
            </>
          }
        </Row>
      </div>
    </>
  );
}

export default AccountSettings;

