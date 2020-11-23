import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import LdapGroupsTable from "../../../../../settings/ldap_groups/LdapGroupsTable";
import LdapUsersTable from "../../../../../settings/ldap_users/LdapUsersTable";
import DetailPanelContainer from "../../../../../common/panels/detail_panel_container/DetailPanelContainer";

function LdapDepartmentMembershipPanel({ ldapDepartmentData, ldapDepartmentGroupData, orgDomain }) {
  return (
    <DetailPanelContainer showRequiredFieldsMessage={false}>
      <LdapGroupsTable orgDomain={orgDomain} groupData={[ldapDepartmentGroupData]} />
      <div className={"mt-3"}><LdapUsersTable orgDomain={orgDomain} userData={ldapDepartmentData.members} /></div>
    </DetailPanelContainer>
  );
}

LdapDepartmentMembershipPanel.propTypes = {
  ldapDepartmentData: PropTypes.object,
  ldapDepartmentGroupData: PropTypes.object,
  orgDomain: PropTypes.string
};


export default LdapDepartmentMembershipPanel;
