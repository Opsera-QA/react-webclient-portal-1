import React, {useContext} from "react";
import PropTypes from "prop-types";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {faQuestionCircle, faRepeat1} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import Row from "react-bootstrap/Row";
import useComponentStateReference from "hooks/useComponentStateReference";
import CancelButtonBase from "components/common/buttons/cancel/CancelButtonBase";
import ActivateSiteRoleButton from "components/settings/ldap_site_roles/cards/inactive/ActivateSiteRoleButton";
import SiteRoleAccessRuleMatrixTable
  from "components/settings/ldap_site_roles/cards/inactive/SiteRoleAccessRuleMatrixTable";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function SiteRoleActivationConfirmationOverlay({ siteRoleName, siteRole }) {
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

  const getFormattedRoleLabel = () => {
    const label = DataParsingHelper.parseString(SiteRoleHelper.getLabelForSiteRole(siteRole));

    if (label) {
      return (
        <b>{label}</b>
      );
    }
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
        <div className={"mx-3 mb-3 mt-2"}>
          <div>Are you sure you would like to activate the {getFormattedRoleLabel()} Site Role? This operation cannot be undone.</div>
          <div className={"my-2"}>Users assigned to the {getFormattedRoleLabel()} Site Role will get these permissions</div>
          <div>
            <SiteRoleAccessRuleMatrixTable
              siteRole={siteRole}
            />
          </div>
        </div>
      </OverlayPanelBodyContainer>
    </ConfirmationOverlay>
  );
}

SiteRoleActivationConfirmationOverlay.propTypes = {
  siteRoleName: PropTypes.string,
  siteRole: PropTypes.string
};
