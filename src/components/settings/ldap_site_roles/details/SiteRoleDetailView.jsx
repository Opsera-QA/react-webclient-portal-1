import React, {useContext, useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldapGroup.metadata";
import accountsActions from "components/admin/accounts/accounts-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import axios from "axios";
import SiteRoleManagementSubNavigationBar from "components/settings/ldap_site_roles/SiteRoleManagementSubNavigationBar";
import SiteRoleDetailPanel from "components/settings/ldap_site_roles/details/SiteRoleDetailPanel";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";

// TODO: Can we get an API Call to get role group names associated with an organization?
const roleGroups = ["Administrators", "PowerUsers", "Users"];

function SiteRoleDetailView() {
  const {groupName, orgDomain} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getAccessRoleData, getAccessToken, getUserRecord } = useContext(AuthContext);
  const [ldapGroupData, setLdapGroupData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
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
  }, [groupName]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
      setIsLoading(false);
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

  const getSiteRole = async (cancelSource = cancelTokenSource) => {
    const response = await accountsActions.getGroupV2(getAccessToken, cancelSource, orgDomain, groupName);

    if (isMounted.current === true && response?.data) {
      setLdapGroupData(new Model(response.data, ldapGroupMetaData, false));
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userDomain = user?.ldap?.domain;
    const userRoleAccess = await getAccessRoleData();

    if (userRoleAccess?.OpseraAdministrator !== true && orgDomain !== userDomain) {
      history.push(`/settings/${userDomain}/site-roles/details/${groupName}`);
      return;
    }

    if (groupName.startsWith("_dept")) {
      history.push(`/settings/${orgDomain}/departments/details/${groupName}`);
      return;
    }

    if (!roleGroups.includes(groupName)) {
      history.push(`/settings/${orgDomain}/groups/details/${groupName}`);
      return;
    }

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (
        userRoleAccess?.OpseraAdministrator
        || userRoleAccess?.Administrator
        || userRoleAccess?.OrganizationOwner
        || userRoleAccess?.OrganizationAccountOwner
      ) {
        await getSiteRole(cancelSource);
      }
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  const getActionBar = () => {
    if (ldapGroupData != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={`/settings/${orgDomain}/site-roles`} />
          </div>
        </ActionBarContainer>
      );
    }
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapSiteRoleDetailView"}
      metadata={ldapGroupMetaData}
      dataObject={ldapGroupData}
      isLoading={isLoading}
      navigationTabContainer={<SiteRoleManagementSubNavigationBar activeTab={"siteRoleViewer"}/>}
      actionBar={getActionBar()}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      detailPanel={
        <SiteRoleDetailPanel
          orgDomain={orgDomain}
          ldapGroupData={ldapGroupData}
          loadData={getRoles}
        />
      }
    />
  );
}

export default SiteRoleDetailView;