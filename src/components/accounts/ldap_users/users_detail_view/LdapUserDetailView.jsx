import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import ErrorDialog from "../../../common/error";
import LdapUserSummaryPanel from "./LdapUserSummaryPanel";
import LdapUserDetailPanel from "./LdapUserDetailPanel";
import accountsActions from "../../accounts-actions";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import LoadingDialog from "../../../common/loading";
import AccessDeniedDialog from "../../../common/accessDeniedInfo";

function LdapUserDetailView() {
  const { userEmail } = useParams();
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [ldapUserData, setLdapUserData] = useState(undefined);
  const [canDelete, setCanDelete] = useState(false);
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used

  useEffect(() => {
    console.log("userEmail: " + JSON.stringify(userEmail));
    getRoles();
  }, []);

  const getLdapUser = async (userEmail) => {
    const response = await accountsActions.getUserByEmail({ email: userEmail }, getAccessToken);
    setLdapUserData(response.data);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess["Administrator"] === true) {
        await getLdapUser(userEmail);
      }
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  } else if (accessRoleData.Administrator === false) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  } else {
    return (
      <>
        <BreadcrumbTrail destination="ldapUserDetailView"/>

        {/*TODO: Add isLoading pinwheel*/}
        {ldapUserData &&
        <div className="content-container content-card-1 max-content-width ml-2">
          <div className="pt-2 pl-2 content-block-header"><h5>LDAP User Details
            [{ldapUserData && ldapUserData.name}]</h5></div>
          {error &&
          <div className="absolute-center-content"><ErrorDialog align="center" error={error.message}></ErrorDialog>
          </div>}
          <div>
            <div>
              <div>
                <LdapUserSummaryPanel ldapUserData={ldapUserData}/>
              </div>
              <div>
                <LdapUserDetailPanel
                  setLdapUserData={setLdapUserData}
                  ldapUserData={ldapUserData}
                  canDelete={canDelete}/>
              </div>
            </div>
          </div>
          <div className="content-block-footer"/>
        </div>
        }
      </>
    );
  }
}

export default LdapUserDetailView;