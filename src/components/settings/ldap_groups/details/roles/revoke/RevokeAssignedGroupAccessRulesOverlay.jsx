import React, {useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import RevokeGroupAccessRulesButton
  from "components/settings/ldap_groups/details/roles/revoke/RevokeGroupAccessRulesButton";
import CancelButtonBase from "components/common/buttons/cancel/CancelButtonBase";

export default function RevokeAssignedGroupAccessRulesOverlay(
  {
    groupModel,
    domain,
    loadData,
  }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();

    if (loadData) {
      loadData();
    }
  };

  const getButtonContainer = () => {
    return (
      <ButtonContainerBase className={"pb-3 px-3"}>
        <CancelButtonBase
          className={"mr-3"}
          cancelFunction={closePanel}
        />
        <RevokeGroupAccessRulesButton
          groupModel={groupModel}
          domain={domain}
          loadData={closePanel}
        />
      </ButtonContainerBase>
    );
  };

  return (
    <ConfirmationOverlay
      titleText={"Revoke Assigned Group Access Roles?"}
      closePanel={closePanel}
      buttonContainer={getButtonContainer()}
    >
      <div className={"pt-2 px-3"}>
        <div>
          <span>Are you sure you would like to revoke all access rules granted to the {groupModel?.getData("name")} group?</span>
        </div>
      </div>
    </ConfirmationOverlay>
  );
}

RevokeAssignedGroupAccessRulesOverlay.propTypes = {
  groupModel: PropTypes.object,
  domain: PropTypes.string,
  loadData: PropTypes.func,
};
