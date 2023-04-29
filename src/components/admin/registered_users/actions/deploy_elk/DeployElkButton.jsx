import React from 'react';
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import ConfirmElkStackDeploymentOverlay
  from "components/admin/registered_users/actions/deploy_elk/ConfirmElkStackDeploymentOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function DeployElkButton({ user }) {
  const { toastContext, } = useComponentStateReference();

  const launchConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <ConfirmElkStackDeploymentOverlay
        user={user}
      />
    );
  };

  return (
    <VanityButtonBase
      buttonClassName={"w-100"}
      variant={"secondary"}
      buttonSize={"sm"}
      normalText={"Deploy ELK Stack Now"}
      onClickFunction={launchConfirmationOverlay}
    />
  );
}

DeployElkButton.propTypes = {
  user: PropTypes.object,
};
