import React, { useContext, useState, useEffect } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapCustomerOnboardEditorPanel from "./LdapCustomerOnboardEditorPanel";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import {AuthContext} from "contexts/AuthContext";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import LdapCustomerOnboardingSubNavigationBar
  from "components/admin/accounts/ldap/customer_onboard/LdapCustomerOnboarderSubNavigationBar";

function LdapCustomerOnboard() {
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData?.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"customerOnboarding"}
      isLoading={!accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      navigationTabContainer={
        <LdapCustomerOnboardingSubNavigationBar
          activeTab={"customerOnboarding"}
        />
      }
    >
      <div className="scroll-y hide-x-overflow p-3">
        <h6 className="text-center mb-3">Please complete the form below in order to create the LDAP data needed to
          support a new customer Organization and Account.</h6>
        <div className="my-3">
          <WarningDialog warningMessage={"LDAP Customer Onboard is currently unavailable."}/>
        </div>
        <LdapCustomerOnboardEditorPanel/>
      </div>
    </ScreenContainer>
  );

}

export default LdapCustomerOnboard;