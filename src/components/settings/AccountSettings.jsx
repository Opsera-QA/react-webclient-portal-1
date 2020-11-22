import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingDialog from "../common/status_notifications/loading";
import { Row } from "react-bootstrap";
import {faUserFriends, faUser, faTags, faUsers, faHeartbeat} from "@fortawesome/pro-light-svg-icons";
import BreadcrumbTrail from "../common/navigation/breadcrumbTrail";
import AccessDeniedDialog from "../common/status_notifications/accessDeniedInfo";
import accountsActions from "../admin/accounts/accounts-actions";
import {DialogToastContext} from "../../contexts/DialogToastContext";
import PageLink from "../common/links/PageLink";

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
          {userDetailsLink && <PageLink link={userDetailsLink} icon={faUser} linkText={"My User Record"}/>}
          {(accessRoleData.PowerUser || accessRoleData.Administrator || accessRoleData.OpseraAdministrator) &&
            <>
              <PageLink link={"/settings/groups"} icon={faUserFriends} linkText={"Groups"}/>
              <PageLink link={"/settings/users"} icon={faUser} linkText={"Users"}/>
              <PageLink link={"/settings/tags"} icon={faTags} linkText={"Tags"}/>
              {!envIsProd && <PageLink link={"/settings/customer-system-status"} icon={faHeartbeat} linkText={"Customer Status"}/>}
              {/*<PageLink link={"/admin/organization-accounts"} icon={faUsers} linkText={"Organization Accounts"}/>*/}
            </>
          }
        </Row>
      </div>
    </>
  );
}

export default AccountSettings;

