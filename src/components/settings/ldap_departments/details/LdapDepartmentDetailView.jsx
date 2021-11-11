import React, {useState, useEffect, useContext, useRef} from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import departmentActions from "components/settings/ldap_departments/department-functions";
import ldapDepartmentMetadata from "components/settings/ldap_departments/ldapDepartment.metadata";
import accountsActions from "components/admin/accounts/accounts-actions";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDestructiveDeleteButton from "components/common/actions/buttons/ActionBarDestructiveDeleteButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import LdapDepartmentDetailPanel
  from "components/settings/ldap_departments/details/LdapDepartmentDetailPanel";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import axios from "axios";
import LdapDepartmentManagementSubNavigationBar
  from "components/settings/ldap_departments/LdapDepartmentManagementSubNavigationBar";

// TODO: Can we get an API Call to get role group names associated with an organization?
const roleGroups = ["Administrators", "PowerUsers", "Users"];

function LdapDepartmentDetailView() {
  const {departmentName, orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [ldapDepartmentGroupData, setLdapDepartmentGroupData] = useState(undefined);
  const [ldapDepartmentData, setLdapDepartmentData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted.current === true && !error?.error?.message?.includes(404)) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      let {ldap} = user;

      if (userRoleAccess?.OpseraAdministrator !== true && (ldap.domain !== orgDomain)) {
        history.push(`/admin/${ldap.domain}/departments/details/${departmentName}`);
        return;
      }

      if (roleGroups.includes(departmentName)) {
        history.push(`/settings/${orgDomain}/site-roles/details/${departmentName}`);
        return;
      }

      await getLdapDepartment(cancelSource);
    }
  };

  const getLdapDepartment = async (cancelSource = cancelTokenSource) => {
    const response = await departmentActions.getDepartmentV2(getAccessToken, cancelSource, orgDomain, departmentName);

    if (isMounted.current === true && response?.data != null) {
      let newLdapDepartmentData = new Model({...response.data}, ldapDepartmentMetadata, false);
      setLdapDepartmentData(newLdapDepartmentData);
      const groupResponse = await accountsActions.getGroupV2(getAccessToken, cancelSource, orgDomain, newLdapDepartmentData.getData("departmentGroupName"));

      if (isMounted.current === true && groupResponse?.data != null) {
        setLdapDepartmentGroupData(new Model({...groupResponse.data}, ldapDepartmentMetadata, false));
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
            <ActionBarBackButton path={`/settings/${orgDomain}/departments`} />
          </div>
          <div>
            <ActionBarDestructiveDeleteButton
              relocationPath={"/settings/departments"}
              dataObject={ldapDepartmentData}
              handleDelete={deleteDepartment}
              mustBeOpseraAdmin={true}
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
      metadata={ldapDepartmentMetadata}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      dataObject={ldapDepartmentData}
      isLoading={isLoading}
      navigationTabContainer={<LdapDepartmentManagementSubNavigationBar activeTab={"departmentViewer"} />}
      actionBar={getActionBar()}
      detailPanel={
        <LdapDepartmentDetailPanel
          ldapDepartmentGroupData={ldapDepartmentGroupData}
          setLdapDepartmentData={setLdapDepartmentData}
          orgDomain={orgDomain}
          ldapDepartmentData={ldapDepartmentData}
          loadData={loadData}
        />
      }
    />
  );
}

export default LdapDepartmentDetailView;