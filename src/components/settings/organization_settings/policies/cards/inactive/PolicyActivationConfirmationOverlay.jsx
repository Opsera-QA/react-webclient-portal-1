import React, {useState} from "react";
import PropTypes from "prop-types";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import Row from "react-bootstrap/Row";
import useComponentStateReference from "hooks/useComponentStateReference";
import CancelButtonBase from "components/common/buttons/cancel/CancelButtonBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ActivatePolicyButton
  from "components/settings/organization_settings/policies/cards/inactive/ActivatePolicyButton";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import useGetNewPolicyModel from "hooks/settings/organization_settings/policies/useGetNewPolicyModel";
import PolicyEditorPanel from "components/settings/organization_settings/policies/details/PolicyEditorPanel";
import PolicyEditorPanelBase from "components/settings/organization_settings/policies/details/PolicyEditorPanelBase";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";

export default function PolicyActivationConfirmationOverlay({ policyName }) {
  const {
    policyModel,
    setPolicyModel,
  } = useGetNewPolicyModel();
  policyModel?.setData("name", policyName);
  const {
    toastContext,
  } = useComponentStateReference();

  const getFormattedRoleLabel = () => {
    const label = DataParsingHelper.parseString(policyConstants.getPolicyNameLabel(policyName));

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
      titleText={`Activate Policy?`}
      titleIcon={faQuestionCircle}
      showToasts={true}
      showCloseButton={false}
    >
      <OverlayPanelBodyContainer
        hideCloseButton={true}
      >
        <div className={"mx-3 mb-3 mt-2"}>
          <div>Are you sure you would like to activate the {getFormattedRoleLabel()} Policy?</div>
          <PolicyEditorPanelBase
            policyModel={policyModel}
            setPolicyModel={setPolicyModel}
          />
          <ButtonContainerBase>
            <ActivatePolicyButton
              policyModel={policyModel}
              className={closeOverlayFunction}
            />
          </ButtonContainerBase>
        </div>
      </OverlayPanelBodyContainer>
    </ConfirmationOverlay>
  );
}

PolicyActivationConfirmationOverlay.propTypes = {
  policyName: PropTypes.string,
};
