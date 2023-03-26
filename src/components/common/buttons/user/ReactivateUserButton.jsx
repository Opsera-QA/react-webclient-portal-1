import React from 'react';
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import useApiState from "hooks/general/api/useApiState";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import usePlatformUsersActions from "hooks/platform/users/usePlatformUsersActions";

export default function ReactivateUserButton(
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
  const ldapDomain = userModel?.getData("ldap.domain");

  const revokeGroupMembership = async () => {
    try {
      apiStateFunctions.setBusyState();
      await platformUsersActions.reinstateUserById(userModel?.getMongoDbId());
      apiStateFunctions.setSuccessState();
      await loadData();
    }
    catch (error) {
      console.error(error);
      apiStateFunctions.setErrorState();
    }
  };

  if (isSiteAdministrator !== true || hasStringValue(ldapDomain) !== true) {
    return null;
  }

  return (
    <VanityButtonBase
      variant={"success"}
      onClickFunction={revokeGroupMembership}
      normalText={"Reactivate User"}
      busyText={"Reactivating User"}
      errorText={"Failed to Reactivate User"}
      successText={"Reactivated User"}
      buttonState={apiState}
      className={className}
      icon={faPlus}
    />
  );
}

ReactivateUserButton.propTypes = {
  userModel: PropTypes.object,
  loadData: PropTypes.func,
  className: PropTypes.string,
};
