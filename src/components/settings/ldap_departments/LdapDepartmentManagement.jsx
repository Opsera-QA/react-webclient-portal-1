import React, {useState, useEffect} from "react";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import departmentFilterMetadata from "components/settings/ldap_departments/department-filter-metadata";
import departmentActions from "components/settings/ldap_departments/department-functions";
import LdapDepartmentsTable from "components/settings/ldap_departments/LdapDepartmentsTable";
import {useHistory, useParams} from "react-router-dom";
import LdapDepartmentManagementSubNavigationBar
  from "components/settings/ldap_departments/LdapDepartmentManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: Instead of rerouting if we have no orgDomain,
//  we should make  separate components that handle rerouting in the LDAP scenarios. (Groups, Site Roles, Departments, User Management)
//  Doing it as is causing it to look like it's not loading properly
function LdapDepartmentManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [departmentMetadata, setDepartmentMetadata] = useState(undefined);
  const [departments, setDepartments] = useState([]);
  const [departmentFilterDto, setDepartmentFilterDto] = useState(new Model({...departmentFilterMetadata.newObjectFields}, departmentFilterMetadata, false));
  const {
    accessRoleData,
    cancelTokenSource,
    getAccessToken,
    isMounted,
    domain,
    isOpseraAdministrator,
    isSiteAdministrator,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [orgDomain]);

  const loadData = async () => {
    try {
      if (isSiteAdministrator !== true && isOpseraAdministrator !== true) {
        return;
      }

      if (orgDomain == null || (domain !== orgDomain && isOpseraAdministrator !== true)) {
        history.push(`/settings/${domain}/departments`);
      }

      setIsLoading(true);
      await getDepartments();
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDepartments = async () => {
    const response = await departmentActions.getDepartmentGroupsV2(getAccessToken, cancelTokenSource, orgDomain);
    const departments = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(departments)) {
      const metadata = response?.data?.metadata;
      setDepartmentMetadata({...metadata});
      setDepartments([...departments]);
    }
  };

  if (isSiteAdministrator !== true && isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"ldapDepartmentManagement"}
      navigationTabContainer={<LdapDepartmentManagementSubNavigationBar activeTab={"departments"}/>}
    >
      <LdapDepartmentsTable
        className={"mx-2"}
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