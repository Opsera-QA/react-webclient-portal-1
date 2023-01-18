import {useContext, useEffect} from "react";
import {AuthContext} from "contexts/AuthContext";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";

export default function useAccessRoleData() {
  const {
    userData,
  } = useContext(AuthContext);

  useEffect(() => {}, [userData]);

  return ({
    accessRoleData: SiteRoleHelper.getAccessRoles(userData),
    isOpseraAdministrator: SiteRoleHelper.isOpseraAdministrator(userData),
    isSiteAdministrator: SiteRoleHelper.isSiteAdministrator(userData),
    isPowerUser: SiteRoleHelper.isPowerUser(userData),
    isSaasUser: SiteRoleHelper.isSaaSUser(userData),
    isSecurityManager: SiteRoleHelper.isSecurityManager(userData),
    isAuditor: SiteRoleHelper.isAuditor(userData),
  });
}
