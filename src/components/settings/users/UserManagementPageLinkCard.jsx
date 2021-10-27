import React, {useContext} from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import {AuthContext} from "contexts/AuthContext";

function UserManagementPageLinkCard({accessRoleData}) {
  const { isSassUser } = useContext(AuthContext);

  if (isSassUser() !== false ||
    (accessRoleData.Administrator !== true
      && accessRoleData.OpseraAdministrator !== true
      && accessRoleData.PowerUser !== true
      && accessRoleData.SassPowerUser !== true)
  ) {
    return null;
  }
  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"userManagement"}
    />
  );
}

UserManagementPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default UserManagementPageLinkCard;
