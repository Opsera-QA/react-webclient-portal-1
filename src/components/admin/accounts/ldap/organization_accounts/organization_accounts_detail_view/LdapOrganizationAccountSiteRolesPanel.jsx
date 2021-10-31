import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SiteRolesTable from "components/settings/ldap_site_roles/SiteRolesTable";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {hasStringValue} from "components/common/helpers/string-helpers";
import accountsActions from "components/admin/accounts/accounts-actions";

function LdapOrganizationAccountSiteRolesPanel({ ldapOrganizationAccountData, organizationDomain }) {
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [siteRoles, setSiteRoles] = useState([]);
  const [siteRoleMetadata, setSiteRoleMetadata] = useState(undefined);
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
      const response = await accountsActions.getLdapRoleGroupsWithDomainV2(getAccessToken, cancelSource, organizationDomain);
      const groups = response?.data?.data;

      if (Array.isArray(groups)) {
        const metadata = response?.data?.metadata;
        setSiteRoleMetadata({...metadata});
        setSiteRoles(groups);
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
    <SiteRolesTable
      orgDomain={organizationDomain}
      siteRoles={siteRoles}
      siteRoleMetadata={siteRoleMetadata}
      isMounted={isMounted}
      isLoading={isLoading}
      loadData={loadData}
      className={"mt-2"}
    />
  );
}

LdapOrganizationAccountSiteRolesPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  organizationDomain: PropTypes.string,
};

export default LdapOrganizationAccountSiteRolesPanel;
