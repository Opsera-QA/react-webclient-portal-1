import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {faTags, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AuthContext} from "../../../../../../contexts/AuthContext";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import accountsActions from "../../../accounts-actions";
import Model from "../../../../../../core/data_model/model";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import AccessDeniedDialog from "../../../../../common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "../../../../../common/navigation/breadcrumbTrail";
import LdapDepartmentSummaryPanel from "./LdapDepartmentSummaryPanel";
import LdapDepartmentDetailPanel from "./LdapDepartmentDetailPanel";
import DetailViewContainer from "../../../../../common/panels/detail_view_container/DetailViewContainer";
import TagsSummaryPanel from "../../../../../settings/tags/tags_detail_view/TagsSummaryPanel";
import TagDetailPanel from "../../../../../settings/tags/tags_detail_view/TagDetailPanel";

function LdapDepartmentDetailView() {
  const {userEmail, orgDomain} = useParams();
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

  const getLdapDepartment = async (departmentName) => {
    // const response = await accountsActions.getUserByEmail(userEmail, getAccessToken);
    // setLdapDepartmentData(new Model(response.data, ldapUsersMetaData, false));
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      let {ldap} = user;

      if (userRoleAccess.OpseraAdministrator || ldap.domain === orgDomain)
      {
        let authorizedActions = await accountsActions.getAllowedUserActions(userRoleAccess, ldap.organization, userEmail, getUserRecord, getAccessToken);
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
      breadcrumbDestination={"departureDetailView"}
      title={ldapDepartmentData != null ? `Department Details [${ldapDepartmentData["name"]}]` : undefined}
      titleIcon={faTags}
      isLoading={isLoading}
      summaryPanel={<LdapDepartmentSummaryPanel ldapDepartmentData={ldapDepartmentData} />}
      detailPanel={<LdapDepartmentDetailPanel setLdapDepartmentData={setLdapDepartmentData} ldapDepartmentData={ldapDepartmentData} authorizedActions={authorizedActions}/>}
    />
  );
}

export default LdapDepartmentDetailView;