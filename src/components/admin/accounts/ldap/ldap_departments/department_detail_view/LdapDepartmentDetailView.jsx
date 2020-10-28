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
import {ldapGroupMetaData} from "../../../../../settings/ldap_groups/ldap-groups-metadata";

function LdapDepartmentDetailView() {
  const {departmentName, orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [ldapDepartmentGroupData, setLdapDepartmentGroupData] = useState(undefined);
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

    if (response != null && response.data != null) {
      let newLdapDepartmentData = new Model({...response.data}, ldapDepartmentMetaData, false);
      setLdapDepartmentData(newLdapDepartmentData);
      const groupResponse = await accountsActions.getGroup(orgDomain, newLdapDepartmentData.getData("departmentGroupName"), getAccessToken);

      if (groupResponse != null) {
        setLdapDepartmentGroupData(new Model({...groupResponse.data}, ldapGroupMetaData, false))
      }
    }
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

  if (!accessRoleData) {
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
      summaryPanel={<LdapDepartmentSummaryPanel ldapDepartmentData={ldapDepartmentData} orgDomain={orgDomain} />}
      detailPanel={
        <LdapDepartmentDetailPanel
          ldapDepartmentGroupData={ldapDepartmentGroupData}
          setLdapDepartmentData={setLdapDepartmentData}
          orgDomain={orgDomain}
          ldapDepartmentData={ldapDepartmentData}
          authorizedActions={authorizedActions}
          loadData={loadData}
        />}
    />
  );
}

export default LdapDepartmentDetailView;