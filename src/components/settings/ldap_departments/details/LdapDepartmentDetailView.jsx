import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
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
import LdapDepartmentManagementSubNavigationBar
  from "components/settings/ldap_departments/LdapDepartmentManagementSubNavigationBar";
import {roleGroups} from "components/settings/ldap_site_roles/details/SiteRoleDetailView";
import useComponentStateReference from "hooks/useComponentStateReference";

function LdapDepartmentDetailView() {
  const {departmentName, orgDomain} = useParams();
  const [ldapDepartmentGroupData, setLdapDepartmentGroupData] = useState(undefined);
  const [ldapDepartmentData, setLdapDepartmentData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
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
  }, []);

  const loadData = async () => {
    try {
      if (isSiteAdministrator !== true && isOpseraAdministrator !== true) {
        return null;
      }

      if (roleGroups.includes(departmentName)) {
        history.push(`/settings/${orgDomain}/site-roles/details/${departmentName}`);
        return;
      }

      if (isOpseraAdministrator !== true && (domain !== orgDomain)) {
        history.push(`/admin/${domain}/departments/details/${departmentName}`);
        return;
      }

      setIsLoading(true);
      await getLdapDepartment();
    }
    catch (error) {
      if (isMounted.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };
  const getLdapDepartment = async () => {
    const response = await departmentActions.getDepartmentV2(getAccessToken, cancelTokenSource, orgDomain, departmentName);

    if (isMounted.current === true && response?.data != null) {
      let newLdapDepartmentData = new Model({...response.data}, ldapDepartmentMetadata, false);
      setLdapDepartmentData(newLdapDepartmentData);
      const groupResponse = await accountsActions.getGroupV2(getAccessToken, cancelTokenSource, orgDomain, newLdapDepartmentData.getData("departmentGroupName"));

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

  if (isSiteAdministrator !== true && isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapDepartmentDetailView"}
      metadata={ldapDepartmentMetadata}
      dataObject={ldapDepartmentData}
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