import React, {useState} from "react";
import PropTypes from "prop-types";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import PolicyEditorPanelBase from "components/settings/organization_settings/policies/details/PolicyEditorPanelBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import usePolicyAdministrationActions
  from "hooks/settings/organization_settings/policies/usePolicyAdministrationActions";
import DeleteOrganizationAccountPolicyActionBarButton
  from "components/admin/organization_settings/details/policies/DeleteOrganizationAccountPolicyActionBarButton";
import {useHistory} from "react-router-dom";
import DeleteOrganizationAccountFeatureFlagActionBarButton
  from "components/admin/organization_settings/details/features/DeleteOrganizationAccountFeatureFlagActionBarButton";

export default function OrganizationSettingsFeatureFlagEditorPanelOverlay(
  {
    featureFlagModel,
    organizationDomain,
    organizationAccountId,
  }) {
  const history = useHistory();
  const [featureFlagModelCopy, setFeatureFlagModelCopy] = useState(featureFlagModel);
  const policyAdministrationActions = usePolicyAdministrationActions();
  const {
    toastContext,
  } = useComponentStateReference();

  const updatePolicy = async () => {
    const response = await policyAdministrationActions.updatePolicy(
      featureFlagModel?.getMongoDbId(),
      featureFlagModel?.getPersistData(),
      organizationDomain,
      organizationAccountId,
    );

    handleCloseFunction();
    return response;
  };

  const handleCloseFunction = () => {
    toastContext.clearOverlayPanel();
    history.push(history.location);
  };

  if (featureFlagModelCopy == null) {
    return null;
  }

  return (
    <ConfirmationOverlay
      closePanel={handleCloseFunction}
      showPanel={true}
      titleText={`Edit Feature Flag?`}
      titleIcon={faQuestionCircle}
      showToasts={true}
      showCloseButton={false}
    >
      <EditorPanelContainer
        handleClose={handleCloseFunction}
        addAnotherOption={false}
        className={"p-2"}
        updateRecord={updatePolicy}
        recordDto={featureFlagModelCopy}
        setRecordDto={setFeatureFlagModelCopy}
        extraButtons={
          <DeleteOrganizationAccountFeatureFlagActionBarButton
            featureFlagModel={featureFlagModelCopy}
            organizationDomain={organizationDomain}
            organizationAccountId={organizationAccountId}
          />
        }
      >
        {/*<PolicyEditorPanelBase*/}
        {/*  featureFlagModel={featureFlagModelCopy}*/}
        {/*  setPolicyModel={setFeatureFlagModelCopy}*/}
        {/*/>*/}
      </EditorPanelContainer>
    </ConfirmationOverlay>
  );
}

OrganizationSettingsFeatureFlagEditorPanelOverlay.propTypes = {
  featureFlagModel: PropTypes.object,
  organizationDomain: PropTypes.string,
  organizationAccountId: PropTypes.string,
};
