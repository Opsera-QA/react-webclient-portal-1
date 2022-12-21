import React, {useContext} from "react";
import PropTypes from "prop-types";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {faQuestionCircle, faRepeat1} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import Row from "react-bootstrap/Row";
import useComponentStateReference from "hooks/useComponentStateReference";
import CancelButtonBase from "components/common/buttons/cancel/CancelButtonBase";
import ActivateSiteRoleButton from "components/settings/ldap_site_roles/cards/inactive/ActivateSiteRoleButton";

export default function SiteRoleActivationConfirmationOverlay({ siteRoleName }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const getButtonContainer = () => {
    return (
      <Row className="mx-0 p-3 d-flex">
        <div className="ml-auto d-flex">
          <ActivateSiteRoleButton
            className={"mr-2"}
            siteRoleName={siteRoleName}
            closeOverlayFunction={closeOverlayFunction}
          />
          <CancelButtonBase
            cancelFunction={closeOverlayFunction}
          />
        </div>
      </Row>
    );
  };

  const closeOverlayFunction = () => {
    toastContext.clearOverlayPanel();
  };

  return (
    <ConfirmationOverlay
      closePanel={closeOverlayFunction}
      showPanel={true}
      titleText={`Activate Site Role?`}
      titleIcon={faQuestionCircle}
      showToasts={true}
      showCloseButton={false}
      buttonContainer={getButtonContainer()}
    >
      <OverlayPanelBodyContainer
        hideCloseButton={true}
      >
        <div className={"m-3"}>
          <div>Are you sure you would like to activate this Site Role? This operation cannot be undone.</div>
        </div>
      </OverlayPanelBodyContainer>
    </ConfirmationOverlay>
  );
}

SiteRoleActivationConfirmationOverlay.propTypes = {
  siteRoleName: PropTypes.string,
};
