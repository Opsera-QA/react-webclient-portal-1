import React, { useContext, useEffect } from "react";
import InformationDialog from "components/common/status_notifications/info";
import userActions from "../user/user-actions";
import { AuthContext } from "contexts/AuthContext";

const Logout = () => {
  const contextType = useContext(AuthContext);
  const { getAccessToken } = contextType;

  useEffect(() => {
    logout();
  }, []);

  const logout = async function() {
    const { logoutUserContext } = contextType;

    //call logout API to clear cache
    try {
      await userActions.logout(getAccessToken);
      logoutUserContext();
    }
    catch (error) {
      //don't want to output error as that error is actually a success
    }
  };

  return (<InformationDialog message="You have been successfully logged out." />);
};

export default Logout;

