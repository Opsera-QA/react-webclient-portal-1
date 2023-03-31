import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapGroupsTable from "components/settings/ldap_groups/LdapGroupsTable";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetLdapGroupsForDomain from "hooks/ldap/groups/useGetLdapGroupsForDomain";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function LdapOrganizationAccountGroupsPanel({ ldapOrganizationAccountData, currentUser, organizationDomain }) {
  const [existingGroupNames, setExistingGroupNames] = useState([]);
  const {
    isMounted,
    userData,
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    loadData,
    groups,
    isLoading,
  } = useGetLdapGroupsForDomain(organizationDomain);

  useEffect(() => {
    const domain = DataParsingHelper.parseNestedString(userData, "ldap.domain");

    if (organizationDomain == null || (domain !== organizationDomain && isOpseraAdministrator !== true)) {
      history.push(`/settings/${domain}/groups`);
    }

  }, [organizationDomain]);

  useEffect(() => {
    const existingGroupNames = groups.map((group) => {
      return group.name.toLowerCase();
    });

    setExistingGroupNames(existingGroupNames);
  }, [groups]);

  if (ldapOrganizationAccountData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className={"mt-2"}>
      <LdapGroupsTable
        organizationDomain={organizationDomain}
        groupData={groups}
        existingGroupNames={existingGroupNames}
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
