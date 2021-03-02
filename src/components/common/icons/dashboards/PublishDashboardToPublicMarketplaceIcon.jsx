import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import PublishDashboardIconBase
  from "components/common/icons/dashboards/PublishDashboardIconBase";
import {AuthContext} from "contexts/AuthContext";

function PublishDashboardToPublicMarketplaceIcon({dashboardData, className}) {
  const {getUserRecord, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const isMounted = useRef(false);
  const [isOpseraLdapUser, setIsOpseraLdapUser] = useState(false);

  useEffect(() => {
    isMounted.current = true;


    getRoles().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    }
  }, []);

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      setIsOpseraLdapUser(user?.ldap !== null && user?.ldap?.domain === "opsera.io");
    }
  };

  if (isOpseraLdapUser !== true) {
    return null;
  }

  return (
    <PublishDashboardIconBase
      className={className}
      dashboardData={dashboardData}
      catalog={"public"}
      popoverText={`Publish this Dashboard to the Public Marketplace.`}
    />
  );
}

PublishDashboardToPublicMarketplaceIcon.propTypes = {
  dashboardData: PropTypes.object,
  className: PropTypes.string
};

export default PublishDashboardToPublicMarketplaceIcon;