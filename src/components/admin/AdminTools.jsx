import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Row, Col } from "react-bootstrap";
import { faFileInvoice } from "@fortawesome/pro-light-svg-icons";
import AccessDeniedDialog from "../common/status_notifications/accessDeniedInfo";
import LoadingDialog from "../common/status_notifications/loading";
import {DialogToastContext} from "../../contexts/DialogToastContext";
import PageLink from "../common/links/PageLink";
import BreadcrumbPageLink from "../common/links/BreadcrumbPageLink";
import ScreenContainer from "../common/panels/general/ScreenContainer";

function AdminTools() {
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
    <ScreenContainer
      breadcrumbDestination={"admin"}
      pageDescription={"Listed below are administration tools for the platform."}
    >
      <Row className="ml-3">
        <BreadcrumbPageLink breadcrumbDestination={"systemStatus"} />
        {/*<BreadcrumbPageLink breadcrumbDestination={"systemHealthCheck"} />*/}
        <BreadcrumbPageLink breadcrumbDestination={"deprecatedReports"} />
        <BreadcrumbPageLink breadcrumbDestination={"reportsRegistration"} />
        <BreadcrumbPageLink breadcrumbDestination={"systemManagement"} />
        <BreadcrumbPageLink breadcrumbDestination={"registeredUsersManagement"} />
        <BreadcrumbPageLink breadcrumbDestination={"apiManagement"} />
        <BreadcrumbPageLink breadcrumbDestination={"toolManagement"} />
        <BreadcrumbPageLink breadcrumbDestination={"deleteTools"} />
        <PageLink link={!featureFlagHideItemInProd() ? "/admin/kpis" : "#"} icon={faFileInvoice}
                  linkText={"KPI Management"}/>
        <BreadcrumbPageLink breadcrumbDestination={"templateManagement"} />
        <BreadcrumbPageLink breadcrumbDestination={"ldapOrganizationManagement"} />
        <BreadcrumbPageLink breadcrumbDestination={"ldapDepartmentManagement"} />
        <BreadcrumbPageLink breadcrumbDestination={"customerOnboarding"} />
      </Row>
    </ScreenContainer>
  );
}

AdminTools.propTypes = {};


export default AdminTools;
