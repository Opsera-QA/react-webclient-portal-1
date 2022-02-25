import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapGroupsTable from "components/settings/ldap_groups/LdapGroupsTable";
import axios from "axios";
import accountsActions from "components/admin/accounts/accounts-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import {hasStringValue} from "components/common/helpers/string-helpers";

function LdapOrganizationAccountGroupsPanel({ ldapOrganizationAccountData, currentUser, organizationDomain }) {
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [groupList, setGroupList] = useState([]);
  const [ldapGroupMetadata, setLdapGroupMetadata] = useState(undefined);
  const [existingGroupNames, setExistingGroupNames] = useState([]);
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
  }, [organizationDomain]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (hasStringValue(organizationDomain)) {
        await getGroupsByDomain(cancelSource);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true && hasStringValue(organizationDomain)) {
        setIsLoading(false);
      }
    }
  };

  const getGroupsByDomain = async (cancelSource = cancelTokenSource) => {
      try {
        const response = await accountsActions.getLdapUserGroupsWithDomainV2(getAccessToken, cancelSource, organizationDomain);
        const groups = response?.data?.data;

        if (Array.isArray(groups)) {
          const metadata = response?.data?.metadata;
          setLdapGroupMetadata({...metadata});
          const existingGroupNames = groups.map((group) => {return group.name.toLowerCase();});
          setExistingGroupNames(existingGroupNames);
          setGroupList(groups);
        }
      } catch (error) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
  };

  if (ldapOrganizationAccountData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className={"mt-2"}>
      <LdapGroupsTable
        orgDomain={organizationDomain}
        groupData={groupList}
        currentUserEmail={currentUser?.email}
        existingGroupNames={existingGroupNames}
        ldapGroupMetadata={ldapGroupMetadata}
        loadData={loadData}
        isLoading={isLoading}
        isMounted={isMounted}
        authorizedActions={["create_group", "update_group"]}
      />
    </div>
  );
}

LdapOrganizationAccountGroupsPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  loadData: PropTypes.func,
  currentUser: PropTypes.object,
  organizationDomain: PropTypes.string,
};

export default LdapOrganizationAccountGroupsPanel;
