import React, {useContext} from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import {AuthContext} from "contexts/AuthContext";

function LdapDepartmentManagementPageLinkCard({accessRoleData}) {
  const { isSassUser } = useContext(AuthContext);

  if (isSassUser() !== false || accessRoleData.OpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"ldapDepartmentManagement"}
    />
  );
}

LdapDepartmentManagementPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default LdapDepartmentManagementPageLinkCard;
