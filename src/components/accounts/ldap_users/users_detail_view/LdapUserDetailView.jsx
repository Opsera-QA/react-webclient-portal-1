import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import ErrorDialog from "../../../common/error";
import LdapUserSummaryPanel from "./LdapUserSummaryPanel";
import LdapUserDetailPanel from "./LdapUserDetailPanel";
import accountsActions from "../../accounts-actions";

function LdapUserDetailView() {
  const { id } = useParams();
  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const [ldapUserData, setLdapUserData] = useState(undefined);
  const [canDelete, setCanDelete] = useState(false);
  const [ isAdminCheck, setAdminStatus] = useState(false);
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used

  useEffect(() => {
    console.log("id: " + JSON.stringify(id));
    isAdmin(ldapUserData);
    getLdapUser(id);
  }, []);

  const getLdapUser = async (userEmail) => {
    const response = await accountsActions.getUserByEmail({ email: userEmail }, getAccessToken);
    setLdapUserData(response.data);
  };

  // TODO: Remove if unnecessary
  const isAdmin = async (data) => {
    const userInfo = await getUserRecord();
    if ((data && data.owner === userInfo._id) || userInfo.email.endsWith("@opsera.io")) {
      setCanDelete(true);
      // setCanEdit(true);
    }

    if (!userInfo.groups.includes("Admin")) {
      //move out
      setAdminStatus(false);
    } else {
      //do nothing
      setAdminStatus(true);
    }
    // setPageLoading(false);
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/accounts">Account Management</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/accounts/users">Users </Link>
          </li>
          <li className="breadcrumb-item active">User Details</li>
        </ol>
      </nav>

      {/*TODO: Add isLoading pinwheel*/}
      {ldapUserData &&
      <div className="content-container content-card-1 max-content-width ml-2">
        <div className="pt-2 pl-2 content-block-header"><h5>LDAP User Details [{ldapUserData && ldapUserData.name}]</h5></div>
        {error &&
        <div className="absolute-center-content"><ErrorDialog align="center" error={error.message}></ErrorDialog></div>}
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
        <div className="content-block-footer" />
      </div>
      }
    </>
  );
}

export default LdapUserDetailView;