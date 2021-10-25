import React, {useContext, useEffect, useRef, useState} from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import AnalyticsDataEntryPageLinkCard from "components/settings/analytics_data_entry/AnalyticsDataEntryPageLinkCard";
import LoadingDialog from "components/common/status_notifications/loading";
import AnalyticsProfilePageLinkCard from "components/settings/analytics/AnalyticsProfilePageLinkCard";
import DataMappingManagementPageLinkCard from "components/settings/data_mapping/DataMappingManagementPageLinkCard";
import DeleteToolsManagementPageLinkCard from "components/settings/delete_tools/DeleteToolsManagementPageLinkCard";
import LdapDepartmentManagementPageLinkCard
  from "components/settings/ldap_departments/LdapDepartmentManagementPageLinkCard";
import LdapGroupManagementPageLinkCard from "components/settings/ldap_groups/LdapGroupManagementPageLinkCard";
import LdapSiteRoleManagementPageLinkCard from "components/settings/ldap_site_roles/LdapSiteRoleManagementPageLinkCard";
import UserManagementPageLinkCard from "components/settings/users/UserManagementPageLinkCard";
import TagManagementPageLinkCard from "components/settings/tags/TagManagementPageLinkCard";
import OrganizationManagementPageLinkCard from "components/settings/organizations/OrganizationManagementPageLinkCard";
import UserSettingsPageLinkCard from "components/user/user_settings/UserSettingsPageLinkCard";

function AccountSettingsPageLinkCards() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async () => {
    const userRoleAccess = await getAccessRoleData();

    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  if (isLoading) {
    return (<LoadingDialog size={"sm"} />);
  }

  return (
    <div>
      <AnalyticsDataEntryPageLinkCard
        accessRoleData={accessRoleData}
      />
      <AnalyticsProfilePageLinkCard
        accessRoleData={accessRoleData}
      />
      <DataMappingManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <DeleteToolsManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <LdapDepartmentManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <LdapGroupManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <UserSettingsPageLinkCard
        accessRoleData={accessRoleData}
      />
      <OrganizationManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <LdapSiteRoleManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <TagManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <UserManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
    </div>
  );
}

export default AccountSettingsPageLinkCards;
