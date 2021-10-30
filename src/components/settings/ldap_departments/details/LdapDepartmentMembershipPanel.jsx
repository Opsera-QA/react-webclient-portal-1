import React, {useState} from "react";
import PropTypes from "prop-types";
import LdapGroupMembershipManagementPanel
  from "components/common/inputs/user/membership/manager/LdapGroupMembershipManagementPanel";

function LdapDepartmentMembershipPanel({ loadData, ldapDepartmentGroupData, orgDomain, setActiveTab }) {
  const [ldapUsers, setLdapUsers] = useState([]);

  return (
    <LdapGroupMembershipManagementPanel
      orgDomain={orgDomain}
      setActiveTab={setActiveTab}
      ldapGroupData={ldapDepartmentGroupData}
      ldapUsers={ldapUsers}
      setLdapUsers={setLdapUsers}
      loadData={loadData}
      type={"Department"}
    />
  );
}

LdapDepartmentMembershipPanel.propTypes = {
  ldapDepartmentData: PropTypes.object,
  ldapDepartmentGroupData: PropTypes.object,
  orgDomain: PropTypes.string,
  setActiveTab: PropTypes.func,
  loadData: PropTypes.func,
};


export default LdapDepartmentMembershipPanel;
