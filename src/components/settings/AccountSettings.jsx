import React, {useContext, useState, useEffect, useRef} from "react";
import { Row } from "react-bootstrap";
import { faUser } from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import BreadcrumbPageLink from "components/common/links/BreadcrumbPageLink";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import PageLink from "components/common/links/PageLink";
import LoadingDialog from "components/common/status_notifications/loading";

function AccountSettings() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, featureFlagHideItemInProd } = useContext(AuthContext);
  const envIsProd = featureFlagHideItemInProd();
  const toastContext = useContext(DialogToastContext);
  const [userDetailsLink, setUsersDetailLink] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    }
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      const userDetailViewLink = await accountsActions.getUserDetailViewLink(getUserRecord);
      setUsersDetailLink(userDetailViewLink);
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
          <BreadcrumbPageLink breadcrumbDestination={"customerSystemStatus"} visible={!envIsProd}/>
          {/*<BreadcrumbPageLink breadcrumbDestination={"ldapOrganizationAccountManagement"} />*/}
        </>
      );
    }

    //for LDAP Power User role or Saas based user, show this (Saas based user gets the .Role of "power_user"
    if (accessRoleData.PowerUser || accessRoleData.SassPowerUser) {
      return (
        <>
          {accessRoleData.Type !== "sass-user" && <BreadcrumbPageLink breadcrumbDestination={"ldapGroupManagement"}/>}
          <BreadcrumbPageLink breadcrumbDestination={"tagManagement"}/>
          <BreadcrumbPageLink breadcrumbDestination={"analyticsProfile"}/>
          <BreadcrumbPageLink breadcrumbDestination={"mapping"}/>
          <BreadcrumbPageLink breadcrumbDestination={"customerSystemStatus"} visible={!envIsProd}/>
          {/*<BreadcrumbPageLink breadcrumbDestination={"ldapOrganizationAccountManagement"} />*/}
        </>
      );
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"accountSettings"}
      pageDescription={"Manage account settings from this dashboard."}
      accessDenied={!accessRoleData?.PowerUser && !accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator && !accessRoleData?.SassPowerUser && !userDetailsLink}
      isLoading={isLoading}
    >
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

