import React, {useContext, useState, useEffect, useRef} from "react";
import { Row } from "react-bootstrap";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import BreadcrumbPageLink from "components/common/links/BreadcrumbPageLink";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import AccountSettingsSubNavigationBar from "components/settings/AccountSettingsSubNavigationBar";
import AccountSettingsPageLinkCards from "components/settings/AccountSettingsPageLinkCards";

function AccountSettings() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, featureFlagHideItemInProd, featureFlagHideItemInTest, isSassUser } = useContext(AuthContext);
  const envIsProd = featureFlagHideItemInProd();
  const envIsTest = featureFlagHideItemInTest();
  const toastContext = useContext(DialogToastContext);
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
    };
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
    }
  };

  const getRolePageLinks = () => {
    if (accessRoleData.Administrator || accessRoleData.OpseraAdministrator) {
      return (
        <>
          <BreadcrumbPageLink breadcrumbDestination={"analyticsDataEntryManagement"} />
          <BreadcrumbPageLink breadcrumbDestination={"analyticsProfile"}/>
          {/* <BreadcrumbPageLink breadcrumbDestination={"customerSystemStatus"} visible={!envIsProd}/> */}
          <BreadcrumbPageLink breadcrumbDestination={"dataMappingManagement"}/>
          <BreadcrumbPageLink breadcrumbDestination={"deleteTools"} />
          <BreadcrumbPageLink breadcrumbDestination={"ldapDepartmentManagement"} visible={!isSassUser()}/>
          <BreadcrumbPageLink breadcrumbDestination={"ldapGroupManagement"}  visible={!isSassUser()}/>
          <BreadcrumbPageLink breadcrumbDestination={"organizationManagement"} visible={!isSassUser()}/>
          {/*<BreadcrumbPageLink breadcrumbDestination={"ldapOrganizationAccountManagement"} />*/}
          <BreadcrumbPageLink breadcrumbDestination={"ldapSiteRolesManagement"} visible={!isSassUser()}/>
          <BreadcrumbPageLink breadcrumbDestination={"tagManagement"}/>
          <BreadcrumbPageLink breadcrumbDestination={"userManagement"} visible={!isSassUser()}/>
        </>
      );
    }

    //for LDAP Power User role or Saas based user, show this (Saas based user gets the .Role of "power_user"
    if (accessRoleData.PowerUser || accessRoleData.SassPowerUser) {
      return (
        <>
          <BreadcrumbPageLink breadcrumbDestination={"analyticsDataEntryManagement"} />
          <BreadcrumbPageLink breadcrumbDestination={"analyticsProfile"}/>
          {/* <BreadcrumbPageLink breadcrumbDestination={"customerSystemStatus"} visible={!envIsProd}/> */}
          <BreadcrumbPageLink breadcrumbDestination={"dataMappingManagement"}/>
          <BreadcrumbPageLink breadcrumbDestination={"deleteTools"} />
          <BreadcrumbPageLink breadcrumbDestination={"ldapGroupManagement"} visible={!isSassUser()}/>
          <BreadcrumbPageLink breadcrumbDestination={"myUserRecord"} visible={!isSassUser()} />
          <BreadcrumbPageLink breadcrumbDestination={"organizationManagement"} visible={!isSassUser() || !envIsProd}/>
          {/*<BreadcrumbPageLink breadcrumbDestination={"ldapOrganizationAccountManagement"} />*/}
          <BreadcrumbPageLink breadcrumbDestination={"tagManagement"}/>
          <BreadcrumbPageLink breadcrumbDestination={"userManagement"} visible={!isSassUser()}/>
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
      accessDenied={!accessRoleData?.PowerUser && !accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator && !accessRoleData?.SassPowerUser}
      isLoading={isLoading}
      navigationTabContainer={<AccountSettingsSubNavigationBar activeTab={"accountSettings"} />}
    >
      {/*/!*TODO: For future enhancement*!/*/}
      {/*<AccountSettingsPageLinkCards />*/}

      <Row className="ml-3">
        {getRolePageLinks()}
      </Row>
    </ScreenContainer>
  );
}

export default AccountSettings;

