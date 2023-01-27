import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import usePolicyActions from "hooks/settings/organization_settings/policies/usePolicyActions";
import PolicyEditorPanelBase from "components/settings/organization_settings/policies/details/PolicyEditorPanelBase";

export default function PolicyEditorPanel(
  {
    policyModel,
    setPolicyModel,
    handleClose,
  }) {
  const {
    isSaasUser,
  } = useComponentStateReference();
  const policyActions = usePolicyActions();

  const activatePolicy = async () => {
    return await policyActions.activatePolicy(
      policyModel?.getPersistData(),
    );
  };

  const updatePolicy = async () => {
    return await policyActions.updatePolicy(
      policyModel?.getMongoDbId(),
      policyModel?.getPersistData(),
    );
  };

  if (policyModel == null || isSaasUser !== false) {
    return null;
  }

  return (
    <EditorPanelContainer
      handleClose={handleClose}
      addAnotherOption={false}
      className={"mx-2 mb-2"}
      createRecord={activatePolicy}
      updateRecord={updatePolicy}
      recordDto={policyModel}
      setRecordDto={setPolicyModel}
    >
      <PolicyEditorPanelBase
        policyModel={policyModel}
        setPolicyModel={setPolicyModel}
      />
    </EditorPanelContainer>
  );
}

PolicyEditorPanel.propTypes = {
  policyModel: PropTypes.object,
  setPolicyModel: PropTypes.func,
  handleClose: PropTypes.func,
};


