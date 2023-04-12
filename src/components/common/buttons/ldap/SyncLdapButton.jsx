import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {faSync} from "@fortawesome/pro-light-svg-icons";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useApiState, {API_STATES} from "hooks/general/api/useApiState";

export default function SyncLdapButton({ disabled, userData, loadData }) {
  const {
    getAccessToken,
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    apiState,
    apiStateFunctions,
  } = useApiState();

  useEffect(() => {}, []);

  const syncLdap = async () => {
    try {
      apiStateFunctions.setBusyState();
      let response;
      response = await RegisteredUserActions.syncLdap(userData?.getMongoDbId(), getAccessToken);

      if (response?.data?.ldap !== null) {
        apiStateFunctions.setSuccessState();
      }
      else {
        apiStateFunctions.setErrorState();
      }

      await loadData(true);
    }
    catch (error) {
      apiStateFunctions.setErrorState();
    }
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <VanityButtonBase
      variant={"secondary"}
      disabled={apiState === API_STATES.BUSY || disabled}
      onClickFunction={syncLdap}
      normalText={"Sync LDAP"}
      busyText={"Syncing LDAP"}
      errorText={"LDAP Sync Failed!"}
      successText={"LDAP Sync Succeeded!"}
      icon={faSync}
      buttonState={apiState}
    />
  );
}

SyncLdapButton.propTypes = {
  userData: PropTypes.object,
  disabled: PropTypes.bool,
  loadData: PropTypes.func
};
