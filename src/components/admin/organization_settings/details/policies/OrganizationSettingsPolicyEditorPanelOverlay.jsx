import React, {useState} from "react";
import PropTypes from "prop-types";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import PolicyEditorPanelBase from "components/settings/organization_settings/policies/details/PolicyEditorPanelBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import usePolicyAdministrationActions
  from "hooks/settings/organization_settings/policies/usePolicyAdministrationActions";
import DeletePolicyActionBarButton
  from "components/admin/organization_settings/details/policies/DeleteOrganizationAccountPolicyActionBarButton";

export default function OrganizationSettingsPolicyEditorPanelOverlay(
  {
    policyModel,
    organizationDomain,
    organizationAccountId,
  }) {
  const [policyModelCopy, setPolicyModelCopy] = useState(policyModel);
  const policyAdministrationActions = usePolicyAdministrationActions();
  const {
    toastContext,
  } = useComponentStateReference();

  const updatePolicy = async () => {
    const response = await policyAdministrationActions.updatePolicy(
      policyModel?.getMongoDbId(),
      policyModel?.getPersistData(),
      organizationDomain,
      organizationAccountId,
    );

    handleCloseFunction();
    return response;
  };

  const handleCloseFunction = () => {
    toastContext.clearOverlayPanel();
  };

  if (policyModelCopy == null) {
    return null;
  }

  return (
    <ConfirmationOverlay
      closePanel={handleCloseFunction}
      showPanel={true}
      titleText={`Edit Policy?`}
      titleIcon={faQuestionCircle}
      showToasts={true}
      showCloseButton={false}
    >
      <EditorPanelContainer
        handleClose={handleCloseFunction}
        addAnotherOption={false}
        className={"mx-2 mb-2"}
        updateRecord={updatePolicy}
        recordDto={policyModelCopy}
        setRecordDto={setPolicyModelCopy}
      >
        <div className={"ml-auto"}>
          <DeletePolicyActionBarButton
            policyModel={policyModelCopy}
            organizationDomain={organizationDomain}
            organizationAccountId={organizationAccountId}
          />
        </div>
        <PolicyEditorPanelBase
          policyModel={policyModelCopy}
          setPolicyModel={setPolicyModelCopy}
        />
      </EditorPanelContainer>
    </ConfirmationOverlay>
  );
}

OrganizationSettingsPolicyEditorPanelOverlay.propTypes = {
  policyModel: PropTypes.object,
  organizationDomain: PropTypes.string,
  organizationAccountId: PropTypes.string,
};
