import React, {useContext} from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import {AuthContext} from "contexts/AuthContext";
import useComponentStateReference from "hooks/useComponentStateReference";

function LdapSiteRoleManagementPageLinkCard({accessRoleData}) {
  const {
    isSiteAdministrator,
    isOpseraAdministrator,
    isSaasUser,
  } = useComponentStateReference();

  if (
    (isSiteAdministrator !== true && isOpseraAdministrator !== true)
    || isSaasUser !== false
  ) {
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
