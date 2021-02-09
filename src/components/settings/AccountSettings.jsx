import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingDialog from "../common/status_notifications/loading";
import { Row } from "react-bootstrap";
import { faUser } from "@fortawesome/pro-light-svg-icons";
import AccessDeniedDialog from "../common/status_notifications/accessDeniedInfo";
import accountsActions from "../admin/accounts/accounts-actions";
import { DialogToastContext } from "../../contexts/DialogToastContext";
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
    loadData().catch(error => {
      throw error;
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    } catch (error) {
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoles = async () => {
    try {
      const user = await getUserRecord();
      const userRoleAccess = await setAccessRoles(user);

      if (userRoleAccess) {
        setAccessRoleData(userRoleAccess);
        const userDetailViewLink = await accountsActions.getUserDetailViewLink(getUserRecord);
        setUsersDetailLink(userDetailViewLink);
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(`Error getting access data: ${JSON.stringify(error)}`);
    }

  };

  const getRolePageLinks = () => {
    if (accessRoleData.Administrator || accessRoleData.OpseraAdministrator) {
      return (
        <>
          <BreadcrumbPageLink breadcrumbDestination={"ldapGroupManagement"}/>
          <BreadcrumbPageLink breadcrumbDestination={"ldapUserManagement"}/>
          <BreadcrumbPageLink breadcrumbDestination={"tagManagement"}/>
          <BreadcrumbPageLink breadcrumbDestination={"analyticsProfile"}/>
          <BreadcrumbPageLink breadcrumbDestination={"mapping"}/>
          {!envIsProd && <BreadcrumbPageLink breadcrumbDestination={"customerSystemStatus"}/>}
          {/*<BreadcrumbPageLink breadcrumbDestination={"ldapOrganizationAccountManagement"} />*/}
        </>
      );
    }

    //for LDAP Power User role or Saas based user, show this (Saas based user gets the .Role of "power_user"
    if (accessRoleData.PowerUser || accessRoleData.Role === "power_user") {
      console.log("accessRoleData", accessRoleData)
      return (
        <>
          {accessRoleData.Type !== "sass-user" && <BreadcrumbPageLink breadcrumbDestination={"ldapGroupManagement"}/>}
          <BreadcrumbPageLink breadcrumbDestination={"tagManagement"}/>
          <BreadcrumbPageLink breadcrumbDestination={"analyticsProfile"}/>
          <BreadcrumbPageLink breadcrumbDestination={"mapping"}/>
          {!envIsProd && <BreadcrumbPageLink breadcrumbDestination={"customerSystemStatus"}/>}
          {/*<BreadcrumbPageLink breadcrumbDestination={"ldapOrganizationAccountManagement"} />*/}
        </>
      );
    }
  };

  if (!accessRoleData || isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator && !userDetailsLink) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"accountSettings"}
      pageDescription={"Manage account settings from this dashboard."}>
      <Row className="ml-3">
        {/*TODO: Make User Details Link Component*/}
        {userDetailsLink && accessRoleData?.Type !== "sass-user" &&
        <PageLink link={userDetailsLink} icon={faUser} linkText={"My User Record"}/>}
        {getRolePageLinks()}
      </Row>
    </ScreenContainer>
  );
}

export default AccountSettings;

