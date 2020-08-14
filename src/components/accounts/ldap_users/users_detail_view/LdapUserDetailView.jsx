import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import LdapUserSummaryPanel from "./LdapUserSummaryPanel";
import LdapUserDetailPanel from "./LdapUserDetailPanel";
import accountsActions from "../../accounts-actions";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import LoadingDialog from "../../../common/loading";
import AccessDeniedDialog from "../../../common/accessDeniedInfo";
import Model from "../../../../core/data_model/model";
import {ldapUsersMetaData} from "../ldap-users-metadata";

function LdapUserDetailView() {
  const {userEmail, orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [ldapUserData, setLdapUserData] = useState(undefined);

  useEffect(() => {
    getRoles();
  }, []);

  const getLdapUser = async (userEmail) => {
    const response = await accountsActions.getUserByEmail(userEmail, getAccessToken);
    console.log("response: " + JSON.stringify(response.data));
    setLdapUserData(new Model(response.data, ldapUsersMetaData, false));
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
        {ldapUserData &&
        <div className="content-container content-card-1 max-content-width ml-2">
          <div className="pt-2 pl-2 content-block-header"><h5>LDAP User Details
            [{ldapUserData && ldapUserData["name"]}]</h5></div>
          <div className="detail-view-body">
            <div>
              <LdapUserSummaryPanel ldapUserData={ldapUserData}/>
            </div>
            <div>
              <LdapUserDetailPanel setLdapUserData={setLdapUserData} orgDomain={orgDomain} ldapUserData={ldapUserData}/>
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