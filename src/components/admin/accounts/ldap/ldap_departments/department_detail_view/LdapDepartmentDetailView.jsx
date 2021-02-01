import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import departmentActions from "components/admin/accounts/ldap/ldap_departments/department-functions";
import ldapDepartmentMetaData from "components/admin/accounts/ldap/ldap_departments/ldap-department-metadata";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldap-groups-metadata";
import accountsActions from "components/admin/accounts/accounts-actions";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDestructiveDeleteButton from "components/common/actions/buttons/ActionBarDestructiveDeleteButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import LdapDepartmentDetailPanel
  from "components/admin/accounts/ldap/ldap_departments/department_detail_view/LdapDepartmentDetailPanel";

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

    if (response?.data != null) {
      let newLdapDepartmentData = new Model({...response.data}, ldapDepartmentMetaData, false);
      setLdapDepartmentData(newLdapDepartmentData);
      const groupResponse = await accountsActions.getGroup(orgDomain, newLdapDepartmentData.getData("departmentGroupName"), getAccessToken);

      if (groupResponse?.data != null) {
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

      if (userRoleAccess?.OpseraAdministrator || ldap.domain === orgDomain)
      {
        let authorizedActions = await accountsActions.getAllowedDepartmentActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
        setAuthorizedActions(authorizedActions);

        if (authorizedActions?.includes("get_department_details")) {
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

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapDepartmentDetailView"}
      metadata={ldapDepartmentMetaData}
      accessDenied={!authorizedActions?.includes("get_department_details")}
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