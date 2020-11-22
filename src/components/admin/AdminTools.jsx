import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Row, Col } from "react-bootstrap";
import {
  faEdit,
  faHeartbeat,
  faTimes,
  faUserCircle,
  faLink,
  faChartBar,
  faWrench,
  faStream,
  faFileInvoice,
  faSitemap,
  faUserPlus,
  faBuilding
} from "@fortawesome/pro-light-svg-icons";
import AccessDeniedDialog from "../common/status_notifications/accessDeniedInfo";
import LoadingDialog from "../common/status_notifications/loading";
import {DialogToastContext} from "../../contexts/DialogToastContext";
import PageLink from "../common/links/PageLink";

function AdminTools({}) {
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
    <div className="max-content-width mt-1">
      <h4>Administration Tools</h4>
      <div>Listed below are administration tools for the platform.</div>
      <div className="p-3">
        <Row className="mt-3 admin-tools">
          <PageLink link={"/admin/system-status"} icon={faHeartbeat} linkText={"System Status"}/>
          {/*<PageLink link={"/admin/health"} icon={faHeartbeat} linkText={"System Health Check"}/>*/}
          <PageLink link={"/admin/reports"} icon={faLink} linkText={"Reports"}/>
          <PageLink link={"/admin/reports-registration"} icon={faChartBar} linkText={"Reports Registration"}/>
          <PageLink link={"/admin/manage_systems"} icon={faEdit} linkText={"System Management"}/>
          <PageLink link={"/admin/registered-users"} icon={faUserCircle} linkText={"Registered Users"}/>
          <PageLink link={"/demo/api"} icon={faLink} linkText={"API & Token Data"}/>
          <PageLink link={"/admin/tools"} icon={faWrench} linkText={"Tool Configurations"}/>
          <PageLink link={"/admin/delete"} icon={faTimes} linkText={"Delete Tools"}/>
          <PageLink link={!featureFlagHideItemInProd() ? "/admin/kpis" : "#"} icon={faFileInvoice}
                    linkText={"KPI Management"}/>
          <PageLink link={"/admin/templates"} icon={faStream} linkText={"Pipeline Templates Editor"}/>
          <PageLink link={"/admin/organizations"} icon={faSitemap} linkText={"Organizations (LDAP)"}/>
          <PageLink link={"/admin/departments"} icon={faBuilding} linkText={"Departments (LDAP)"}/>
          <PageLink link={"/accounts/create"} icon={faUserPlus} linkText={"Customer Onboarding"}/>
        </Row>
      </div>
    </div>
  );
}

AdminTools.propTypes = {};


export default AdminTools;
