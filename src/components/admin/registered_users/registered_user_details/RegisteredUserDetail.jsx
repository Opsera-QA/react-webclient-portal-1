import React, { useState, useEffect, useContext, useMemo } from "react";
import RegisteredUserSummary from "./RegisteredUserSummary";
import PropTypes from "prop-types";
import RegisteredUserDetailsPanel from "./RegisteredUserDetailsPanel";
import { Link, useParams } from "react-router-dom";
import RegisteredUserActions from "../registered-user-actions";
import { AuthContext } from "contexts/AuthContext";
import ErrorDialog from "components/common/status_notifications/error";

function RegisteredUserDetail() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [userData, setUserData] = useState(undefined);
  const { id } = useParams();
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used

  useEffect(() => {
    getTag(id);
    getRoles();
  }, []);

  const getTag = async (userId) => {
    const response = await RegisteredUserActions.getUserDetail(userId, getAccessToken);
    setUserData(response.data);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };


  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/admin">Admin</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/admin/registered-users">Registered Users</Link>
          </li>
          <li className="breadcrumb-item active">User detail</li>
        </ol>
      </nav>

      {/*TODO: Add isLoading pinwheel*/}
      {userData &&
      <div className="content-container content-card-1 max-content-width ml-2">
        <div className="pt-2 pl-2 content-block-header"><h5>User Details</h5></div>
        {error &&
        <div className="absolute-center-content"><ErrorDialog align="center" error={error.message}></ErrorDialog></div>}
        <div>
          <div>
            <div>
              <RegisteredUserSummary userData={userData}/>
            </div>
            <div>
             {Object.values(userData).length > 0 && <RegisteredUserDetailsPanel
                setUserData={setUserData}
             userData={userData} /> }
            </div>
          </div>
        </div>
        <div className="content-block-footer" />
      </div>
      }
    </>
  );
}

export default RegisteredUserDetail;