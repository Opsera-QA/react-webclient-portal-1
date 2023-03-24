import React from "react";
import ConsolidatedUserReportGroupMembershipTable from "components/reports/users/user/consolidated_user_report/group_membership/ConsolidatedUserReportGroupMembershipTable";
import PropTypes from "prop-types";
import useGetLdapGroups from "hooks/ldap/groups/useGetLdapGroups";
import useComponentStateReference from "hooks/useComponentStateReference";

function ConsolidatedUserGroupMembershipReport({ldapUserDistinguishedName}) {
  const { domain, } = useComponentStateReference();
  const {
    groups,
    isLoading,
    loadData,
    error,
  } = useGetLdapGroups();

  if (!ldapUserDistinguishedName) {
    return null;
  }

  return (
    <ConsolidatedUserReportGroupMembershipTable
      groups={groups}
      isLoading={isLoading}
      loadData={loadData}
      domain={domain}
      userDistinguishedName={ldapUserDistinguishedName}
    />
  );
}

ConsolidatedUserGroupMembershipReport.propTypes = {
  ldapUserDistinguishedName: PropTypes.string,
};

export default ConsolidatedUserGroupMembershipReport;
