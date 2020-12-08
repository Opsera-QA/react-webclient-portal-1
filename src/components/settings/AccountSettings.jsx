import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingDialog from "../common/status_notifications/loading";
import { Row } from "react-bootstrap";
import {faUser} from "@fortawesome/pro-light-svg-icons";
import BreadcrumbTrail from "../common/navigation/breadcrumbTrail";
import AccessDeniedDialog from "../common/status_notifications/accessDeniedInfo";
import accountsActions from "../admin/accounts/accounts-actions";
import {DialogToastContext} from "../../contexts/DialogToastContext";
import PageLink from "../common/links/PageLink";
import BreadcrumbPageLink from "../common/links/BreadcrumbPageLink";
import ScreenContainer from "../common/panels/general/ScreenContainer";

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
    <ScreenContainer
      breadcrumbDestination={"accountSettings"}
      pageDescription={"Manage account settings from this dashboard."}>
      <Row className="ml-3">
        {/*TODO: Make User Details Link Component*/}
        {userDetailsLink && <PageLink link={userDetailsLink} icon={faUser} linkText={"My User Record"}/>}
        {(accessRoleData.PowerUser || accessRoleData.Administrator || accessRoleData.OpseraAdministrator) &&
        <>
          <BreadcrumbPageLink breadcrumbDestination={"ldapGroupManagement"}/>
          <BreadcrumbPageLink breadcrumbDestination={"ldapUserManagement"}/>
          <BreadcrumbPageLink breadcrumbDestination={"tagManagement"}/>
          {!envIsProd && <BreadcrumbPageLink breadcrumbDestination={"customerSystemStatus"}/>}
          {/*<BreadcrumbPageLink breadcrumbDestination={"ldapOrganizationAccountManagement"} />*/}
        </>
        }
      </Row>
    </ScreenContainer>
  );
}

export default AccountSettings;

