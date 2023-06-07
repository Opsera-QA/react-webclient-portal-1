import React from "react";
import PropTypes from "prop-types";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PolicyManagementActivatePolicyButton
  from "components/settings/organization_settings/policies/cards/inactive/PolicyManagementActivatePolicyButton";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import useGetNewPolicyModel from "hooks/settings/organization_settings/policies/useGetNewPolicyModel";
import PolicyEditorPanelBase from "components/settings/organization_settings/policies/details/PolicyEditorPanelBase";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";

export default function PolicyManagementPolicyActivationConfirmationOverlay({ policyName, description }) {
  const {
    policyModel,
    setPolicyModel,
  } = useGetNewPolicyModel();
  policyModel?.setData("name", policyName);
  const label = DataParsingHelper.parseString(policyConstants.getPolicyNameLabel(policyName));
  const {
    toastContext,
  } = useComponentStateReference();

  const getFormattedRoleLabel = () => {
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
      titleText={`Activate ${label} Policy?`}
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
          {description}
          <ButtonContainerBase>
            <PolicyManagementActivatePolicyButton
              policyModel={policyModel}
              closeOverlayFunction={closeOverlayFunction}
            />
          </ButtonContainerBase>
        </div>
      </OverlayPanelBodyContainer>
    </ConfirmationOverlay>
  );
}

PolicyManagementPolicyActivationConfirmationOverlay.propTypes = {
  policyName: PropTypes.string,
  description: PropTypes.any,
};
