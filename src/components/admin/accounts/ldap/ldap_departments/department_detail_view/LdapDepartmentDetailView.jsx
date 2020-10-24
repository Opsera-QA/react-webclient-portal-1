import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {AuthContext} from "../../../../../../contexts/AuthContext";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import accountsActions from "../../../accounts-actions";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import AccessDeniedDialog from "../../../../../common/status_notifications/accessDeniedInfo";
import LdapDepartmentSummaryPanel from "./LdapDepartmentSummaryPanel";
import LdapDepartmentDetailPanel from "./LdapDepartmentDetailPanel";
import DetailViewContainer from "../../../../../common/panels/detail_view_container/DetailViewContainer";
import departmentActions from "../department-functions";
import ldapDepartmentMetaData from "../ldap-department-metadata";
import Model from "../../../../../../core/data_model/model";
import {faBuilding} from "@fortawesome/pro-light-svg-icons/faBuilding";

function LdapDepartmentDetailView() {
  const {departmentName, orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [ldapDepartmentData, setLdapDepartmentData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [authorizedActions, setAuthorizedActions] = useState([]);

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
      setIsLoading(false);
    }
  }

  const getLdapDepartment = async () => {
    const response = await departmentActions.getDepartment(orgDomain, departmentName, getAccessToken);
    console.log("response: " + JSON.stringify(response));
    setLdapDepartmentData(new Model({...response.data}, ldapDepartmentMetaData, false));
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      let {ldap} = user;

      if (userRoleAccess.OpseraAdministrator || ldap.domain === orgDomain)
      {
        let authorizedActions = await accountsActions.getAllowedDepartmentActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
        setAuthorizedActions(authorizedActions);

        if (authorizedActions.includes("get_department_details")) {
          await getLdapDepartment();
        }
      }
    }
  };

  if (isLoading || !accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_department_details") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <DetailViewContainer
      breadcrumbDestination={"ldapDepartmentDetailView"}
      title={ldapDepartmentData != null ? `Department Details [${ldapDepartmentData["name"]}]` : undefined}
      titleIcon={faBuilding}
      isLoading={isLoading}
      summaryPanel={<LdapDepartmentSummaryPanel ldapDepartmentData={ldapDepartmentData} />}
      detailPanel={<LdapDepartmentDetailPanel setLdapDepartmentData={setLdapDepartmentData} orgDomain={orgDomain} ldapDepartmentData={ldapDepartmentData} authorizedActions={authorizedActions}/>}
    />
  );
}

export default LdapDepartmentDetailView;