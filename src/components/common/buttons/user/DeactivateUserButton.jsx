import React from 'react';
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import useApiState from "hooks/general/api/useApiState";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import usePlatformUsersActions from "hooks/platform/users/usePlatformUsersActions";

export default function DeactivateUserButton(
  {
    userModel,
    loadData,
    className,
  }) {
  const {
    apiState,
    apiStateFunctions,
  } = useApiState();
  const {
    isSiteAdministrator,
  } = useComponentStateReference();
  const platformUsersActions = usePlatformUsersActions();

  const revokeGroupMembership = async () => {
    try {
      apiStateFunctions.setBusyState();
      await platformUsersActions.deactivateUserById(userModel?.getMongoDbId());
      apiStateFunctions.setSuccessState();
      await loadData();
    }
    catch (error) {
      console.error(error);
      apiStateFunctions.setErrorState();
    }
  };

  if (isSiteAdministrator !== true) {
    return null;
  }

  return (
    <VanityButtonBase
      variant={"danger"}
      onClickFunction={revokeGroupMembership}
      normalText={"Deactivate User"}
      busyText={"Deactivating User"}
      errorText={"Failed to Deactivate User"}
      successText={"Deactivated User"}
      buttonState={apiState}
      className={className}
      icon={faTrash}
    />
  );
}

DeactivateUserButton.propTypes = {
  userModel: PropTypes.object,
  loadData: PropTypes.func,
  className: PropTypes.string,
};
