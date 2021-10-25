import React, { useContext, useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import BreadcrumbPageLink from "components/common/links/BreadcrumbPageLink";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";

function AdminTools() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
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

  return (
    <ScreenContainer
      breadcrumbDestination={"admin"}
      isLoading={!accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      pageDescription={"Listed below are administration tools for the platform."}
    >
      <Row className="ml-3">
        {/* <BreadcrumbPageLink breadcrumbDestination={"systemStatus"} /> */}
        {/*<BreadcrumbPageLink breadcrumbDestination={"systemHealthCheck"} />*/}
        <BreadcrumbPageLink breadcrumbDestination={"deprecatedReports"} />
        <BreadcrumbPageLink breadcrumbDestination={"reportsRegistration"} />
        <BreadcrumbPageLink breadcrumbDestination={"systemManagement"} />
        <BreadcrumbPageLink breadcrumbDestination={"registeredUsersManagement"} />
        <BreadcrumbPageLink breadcrumbDestination={"apiManagement"} />
        <BreadcrumbPageLink breadcrumbDestination={"toolManagement"} />
        <BreadcrumbPageLink breadcrumbDestination={"deleteTools"} />
        <BreadcrumbPageLink breadcrumbDestination={"kpiManagement"} />
        <BreadcrumbPageLink breadcrumbDestination={"pipelineStorageManagement"} />
        <BreadcrumbPageLink breadcrumbDestination={"templateManagement"} />
        <BreadcrumbPageLink breadcrumbDestination={"siteNotificationManager"} />
        <BreadcrumbPageLink breadcrumbDestination={"ldapOrganizationManagement"} />
        <BreadcrumbPageLink breadcrumbDestination={"customerOnboarding"} />
      </Row>
    </ScreenContainer>
  );
}

export default AdminTools;
