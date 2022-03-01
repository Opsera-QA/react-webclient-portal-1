import React, {useContext, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faSync, faCheckCircle, faExclamationTriangle} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import IconBase from "components/common/icons/IconBase";

function SyncLdapButton({ disable, userData, loadData }) {
  const { getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [syncing, isSyncing] = useState(false);
  const [successfulConnection, setSuccessfulConnection] = useState(false);
  const [failedConnection, setFailedConnection] = useState(false);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    pullUserAccessRole();
  }, []);

  const pullUserAccessRole = async () => {
    setIsLoading(true);
    const userRoleAccess = await setAccessRoles(userData.getPersistData());
    setAccessRoleData(userRoleAccess);
    setIsLoading(false);
  };

  const syncLdap = async () => {
    try {
      isSyncing(true);
      setSuccessfulConnection(false);
      setFailedConnection(false);
      let response;
      response = await RegisteredUserActions.syncLdap(userData["_id"], getAccessToken);

      if (response?.data?.ldap !== null) {
        setSuccessfulConnection(true);
      }
      else {
        setFailedConnection(true);
      }

      await loadData(true);
    }
    catch (error) {
      setFailedConnection(true);
    }
    finally {
      isSyncing(false);
    }

  };

  const getVariant = () => {
    if (successfulConnection) {
      return "success";
    }

    if (failedConnection) {
      return "danger";
    }

    return ("secondary");
  };

  const getLabel = () => {
    if (syncing) {
      return (<span><IconBase isLoading={true} className={"mr-2"}/>Syncing LDAP</span>);
    }

    if (failedConnection) {
      return (<span><IconBase icon={faExclamationTriangle} className={"mr-2"}/>LDAP Sync Failed!</span>);
    }

    if (successfulConnection) {
      return (<span><IconBase icon={faCheckCircle} className={"mr-2"}/>LDAP Sync Succeeded!</span>);
    }

    return (<span><IconBase icon={faSync} className={"mr-2"}/>Sync LDAP</span>);
  };

  const buttonSupported = () => {
    return (accessRoleData.Type === "sass-user" || accessRoleData.Type === "ldap-user" || accessRoleData.Type === "ldap-account");
  };

  return (
    <div className="mt-3">
      <Button
        variant={getVariant()}
        disabled={syncing || disable || isLoading || !buttonSupported()}
        onClick={() => syncLdap()}>
        {getLabel()}
      </Button>
    </div>
  );
}

SyncLdapButton.propTypes = {
  userData: PropTypes.object,
  disable: PropTypes.bool,
  loadData: PropTypes.func
};

export default SyncLdapButton;