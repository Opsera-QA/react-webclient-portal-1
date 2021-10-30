import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import departmentFilterMetadata from "components/settings/ldap_departments/department-filter-metadata";
import departmentActions from "components/settings/ldap_departments/department-functions";
import {DialogToastContext} from "contexts/DialogToastContext";
import LdapDepartmentsTable from "components/settings/ldap_departments/LdapDepartmentsTable";
import axios from "axios";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import {useHistory, useParams} from "react-router-dom";
import LdapDepartmentManagementSubNavigationBar
  from "components/settings/ldap_departments/LdapDepartmentManagementSubNavigationBar";

function LdapDepartmentManagement() {
  const history = useHistory();
  const { orgDomain } = useParams();
  const toastContext = useContext(DialogToastContext);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [departmentMetadata, setDepartmentMetadata] = useState(undefined);
  const [departments, setDepartments] = useState([]);
  const [departmentFilterDto, setDepartmentFilterDto] = useState(new Model({...departmentFilterMetadata.newObjectFields}, departmentFilterMetadata, false));
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

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const {ldap} = user;
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      if (orgDomain == null || (ldap?.domain !== orgDomain && !userRoleAccess?.OpseraAdministrator)) {
        history.push(`/admin/${ldap.domain}/departments`);
      }

      if (
           userRoleAccess?.OpseraAdministrator
        || userRoleAccess?.Administrator
        || userRoleAccess?.OrganizationOwner
        || userRoleAccess?.OrganizationAccountOwner
      ) {
        await getDepartments(cancelSource);
      }
    }
  };

  const getDepartments = async (cancelSource = cancelTokenSource) => {
    const response = await departmentActions.getDepartmentGroupsV2(getAccessToken, cancelSource, orgDomain);
    const departments = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(departments)) {
      const metadata = response?.data?.metadata;
      setDepartmentMetadata({...metadata});
      setDepartments([...departments]);
    }
  };

  return (
    <ScreenContainer
      isLoading={!accessRoleData}
      breadcrumbDestination={"ldapDepartmentManagement"}
      accessRoleData={accessRoleData}
      navigationTabContainer={<LdapDepartmentManagementSubNavigationBar activeTab={"departments"} />}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      >
      <LdapDepartmentsTable
        loadData={loadData}
        domain={orgDomain}
        isMounted={isMounted}
        isLoading={isLoading}
        accessRoleData={accessRoleData}
        departmentMetadata={departmentMetadata}
        departments={departments}
        departmentFilterDto={departmentFilterDto}
        setDepartmentFilterDto={setDepartmentFilterDto}
      />
    </ScreenContainer>
  );
}

export default LdapDepartmentManagement;