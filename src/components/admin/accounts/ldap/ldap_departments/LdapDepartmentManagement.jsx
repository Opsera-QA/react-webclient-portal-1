import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import departmentFilterMetadata from "components/admin/accounts/ldap/ldap_departments/department-filter-metadata";
import departmentActions from "components/admin/accounts/ldap/ldap_departments/department-functions";
import accountsActions from "components/admin/accounts/accounts-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import LdapDepartmentsTable from "components/admin/accounts/ldap/ldap_departments/LdapDepartmentsTable";
import axios from "axios";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import {useHistory, useParams} from "react-router-dom";

function LdapDepartmentManagement() {
  const history = useHistory();
  const { orgDomain } = useParams();
  const toastContext = useContext(DialogToastContext);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [departmentFilterDto, setDepartmentFilterDto] = useState(new Model({...departmentFilterMetadata.newObjectFields}, departmentFilterMetadata, false));
  const [authorizedActions, setAuthorizedActions] = useState([]);
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
  }, [orgDomain]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDepartments = async (cancelSource = cancelTokenSource) => {
      let response = await departmentActions.getDepartmentsByDomainV2(getAccessToken, cancelSource, orgDomain);

      if (isMounted?.current === true && response?.data) {
        setDepartments(response?.data);
      }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const {ldap} = user;
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      if (orgDomain == null || (ldap?.domain !== orgDomain && !userRoleAccess?.OpseraAdministrator)) {
        history.push(`/admin/${ldap.domain}/departments`);
      }

      if ((userRoleAccess?.OpseraAdministrator || userRoleAccess?.Administrator) && orgDomain != null) {
        let authorizedActions = await accountsActions.getAllowedDepartmentActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
        setAuthorizedActions(authorizedActions);
        await getDepartments(cancelSource);
      }
    }
  };

  return (
    <ScreenContainer
      isLoading={!accessRoleData}
      breadcrumbDestination={"ldapDepartmentManagement"}
      accessDenied={!authorizedActions?.includes("get_departments")}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      >
      <LdapDepartmentsTable
        authorizedActions={authorizedActions}
        loadData={loadData}
        domain={orgDomain}
        isLoading={isLoading}
        departmentData={departments}
        departmentFilterDto={departmentFilterDto}
        setDepartmentFilterDto={setDepartmentFilterDto}
      />
    </ScreenContainer>
  );
}

export default LdapDepartmentManagement;