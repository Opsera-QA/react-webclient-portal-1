import React, { useContext, useState, useEffect } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import { Link } from "react-router-dom";
import LdapCustomerOnboardEditorPanel from "./LdapCustomerOnboardEditorPanel";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import {AuthContext} from "contexts/AuthContext";
import WarningDialog from "components/common/status_notifications/WarningDialog";

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

  if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{backgroundColor: "#fafafb"}}>
          <li className="breadcrumb-item">
            <Link to="/accounts">Account Management</Link>
          </li>
          <li className="breadcrumb-item active">New Account</li>
        </ol>
      </nav>

      <div className="content-container content-card-1 max-content-width ml-2">
        <div className="pl-2 content-block-header title-text-header-1">New Customer Onboarding</div>
        <div className="scroll-y hide-x-overflow p-3">
          <h6 className="text-center mb-3">Please complete the form below in order to create the LDAP data needed to
            support a new customer Organization and Account.</h6>
          <div className="my-3">
            <WarningDialog warningMessage={"LDAP Customer Onboard is currently unavailable."}/>
          </div>
          <LdapCustomerOnboardEditorPanel/>
        </div>
        <div className="content-block-footer"/>
      </div>
    </div>
  );

}

export default LdapCustomerOnboard;