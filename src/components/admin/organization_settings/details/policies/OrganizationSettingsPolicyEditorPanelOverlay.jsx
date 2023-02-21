import React from "react";
import PropTypes from "prop-types";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetNewPolicyModel from "hooks/settings/organization_settings/policies/useGetNewPolicyModel";
import PolicyEditorPanelBase from "components/settings/organization_settings/policies/details/PolicyEditorPanelBase";

export default function OrganizationSettingsPolicyEditorPanelOverlay({ policyModel, }) {
  const {
    policyModel,
    setPolicyModel,
  } = useGetNewPolicyModel();
  policyModel?.setData("name", policyName);
  const {
    toastContext,
  } = useComponentStateReference();

  const closeOverlayFunction = () => {
    toastContext.clearOverlayPanel();
  };

  return (
    <ConfirmationOverlay
      closePanel={closeOverlayFunction}
      showPanel={true}
      titleText={`Edit Policy?`}
      titleIcon={faQuestionCircle}
      showToasts={true}
      showCloseButton={false}
    >
      <div className={"mx-3 mb-3 mt-2"}>
        <PolicyEditorPanelBase
          policyModel={policyModel}
          setPolicyModel={setPolicyModel}
        />
      </div>
    </ConfirmationOverlay>
  );
}

OrganizationSettingsPolicyEditorPanelOverlay.propTypes = {
  policyName: PropTypes.string,
};
