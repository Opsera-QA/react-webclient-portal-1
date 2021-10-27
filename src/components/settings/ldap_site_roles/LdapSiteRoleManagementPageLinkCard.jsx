import React, {useContext} from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import {AuthContext} from "contexts/AuthContext";

function LdapSiteRoleManagementPageLinkCard({accessRoleData}) {
  const { isSassUser } = useContext(AuthContext);

  if (isSassUser() !== false || (accessRoleData.Administrator !== true && accessRoleData.OpseraAdministrator !== true)) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"ldapSiteRolesManagement"}
    />
  );
}

LdapSiteRoleManagementPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default LdapSiteRoleManagementPageLinkCard;
