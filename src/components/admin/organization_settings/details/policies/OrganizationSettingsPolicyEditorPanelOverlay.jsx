import React, {useState} from "react";
import PropTypes from "prop-types";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import PolicyEditorPanelBase from "components/settings/organization_settings/policies/details/PolicyEditorPanelBase";

export default function OrganizationSettingsPolicyEditorPanelOverlay(
  {
    policyModel,
    organizationDomain,
    organizationAccountId,
  }) {
  const [policyModelCopy, setPolicyModelCopy] = useState(policyModel);
  const {
    toastContext,
  } = useComponentStateReference();

  const closeOverlayFunction = () => {
    toastContext.clearOverlayPanel();
  };

  if (policyModelCopy == null) {
    return null;
  }

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
          policyModel={policyModelCopy}
          setPolicyModel={setPolicyModelCopy}
        />
      </div>
    </ConfirmationOverlay>
  );
}

OrganizationSettingsPolicyEditorPanelOverlay.propTypes = {
  policyModel: PropTypes.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
