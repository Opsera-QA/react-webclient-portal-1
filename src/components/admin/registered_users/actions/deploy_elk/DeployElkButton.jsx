import React from 'react';
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import ConfirmElkStackDeploymentOverlay
  from "components/admin/registered_users/actions/deploy_elk/ConfirmElkStackDeploymentOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function DeployElkButton({ userId }) {
  const { toastContext, } = useComponentStateReference();

  const launchConfirmationOverlay = () => {
    console.log("showing overlay panel");
    toastContext.showOverlayPanel(
      <ConfirmElkStackDeploymentOverlay
        userId={userId}
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
  userId: PropTypes.string,
};
