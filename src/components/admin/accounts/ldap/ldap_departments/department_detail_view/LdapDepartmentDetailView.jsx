import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {AuthContext} from "../../../../../../contexts/AuthContext";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import accountsActions from "../../../accounts-actions";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import AccessDeniedDialog from "../../../../../common/status_notifications/accessDeniedInfo";
import LdapDepartmentDetailPanel from "./LdapDepartmentDetailPanel";
import departmentActions from "../department-functions";
import ldapDepartmentMetaData from "../ldap-department-metadata";
import Model from "../../../../../../core/data_model/model";
import {faBuilding} from "@fortawesome/pro-light-svg-icons/faBuilding";
import {ldapGroupMetaData} from "../../../../../settings/ldap_groups/ldap-groups-metadata";
import DetailScreenContainer from "../../../../../common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "../../../../../common/actions/ActionBarContainer";
import ActionBarBackButton from "../../../../../common/actions/buttons/ActionBarBackButton";
import ActionBarDestructiveDeleteButton from "../../../../../common/actions/buttons/ActionBarDestructiveDeleteButton";

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

  const deleteDepartment = () => {
    return departmentActions.deleteDepartment(orgDomain, ldapDepartmentData, getAccessToken);
  };

  const getActionBar = () => {
    if (ldapDepartmentData != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={"/admin/departments"} />
          </div>
          <div>
            <ActionBarDestructiveDeleteButton
              relocationPath={"/admin/departments"}
              dataObject={ldapDepartmentData}
              handleDelete={deleteDepartment}
              deleteTopic={`Department [${ldapDepartmentData.getData("name")}]`}
            />
          </div>
        </ActionBarContainer>
      );
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_department_details") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapDepartmentDetailView"}
      title={ldapDepartmentData != null ? `Department Details [${ldapDepartmentData["name"]}]` : undefined}
      managementViewLink={"/admin/departments"}
      managementTitle={"Department Management"}
      managementViewIcon={faBuilding}
      type={"Department"}
      titleIcon={faBuilding}
      dataObject={ldapDepartmentData}
      isLoading={isLoading}
      actionBar={getActionBar()}
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