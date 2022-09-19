import React from "react";
import PropTypes from "prop-types";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import StandaloneDeleteButtonWithConfirmationModal
  from "components/common/buttons/delete/StandaloneDeleteButtonWithConfirmationModal";
import { platformSettingFeatureActions }
  from "components/admin/platform_settings/details/features/platformSettingFeature.actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import JsonInput from "components/common/inputs/object/JsonInput";

export default function PlatformSettingFeatureEditorPanel(
  {
    platformSettingsId,
    platformSettingFeatureModel,
    setPlatformSettingFeatureModel,
    closePanelFunction,
  }) {
  const {
    cancelTokenSource,
    getAccessToken,
  } = useComponentStateReference();

  const handleCreateFunction = async () => {
    const response = await platformSettingFeatureActions.createPlatformSettingFeature(
      getAccessToken,
      cancelTokenSource,
      platformSettingsId,
      platformSettingFeatureModel,
    );

    if (closePanelFunction) {
      closePanelFunction();
    }

    return response;
  };

  const handleUpdateFunction = async () => {
    const response = await platformSettingFeatureActions.updatePlatformSystemFeature(
      getAccessToken,
      cancelTokenSource,
      platformSettingsId,
      platformSettingFeatureModel,
    );

    if (closePanelFunction) {
      closePanelFunction();
    }

    return response;
  };

  const handleDeleteFunction = async () => {
    const response = await platformSettingFeatureActions.deletePlatformSettingFeature(
      getAccessToken,
      cancelTokenSource,
      platformSettingsId,
      platformSettingFeatureModel?.getMongoDbId(),
    );

    if (closePanelFunction) {
      closePanelFunction();
    }

    return response;
  };

  const getDeleteButton = () => {
    return (
      <StandaloneDeleteButtonWithConfirmationModal
        model={platformSettingFeatureModel}
        deleteDataFunction={handleDeleteFunction}
      />
    );
  };

  if (platformSettingFeatureModel == null) {
    return null;
  }

  return (
    <EditorPanelContainer
      recordDto={platformSettingFeatureModel}
      createRecord={handleCreateFunction}
      updateRecord={handleUpdateFunction}
      handleClose={closePanelFunction}
      extraButtons={getDeleteButton()}
      className={"mx-2 mt-2"}
    >
      <Row>
        <Col xl={8} sm={6}>
          <TextInputBase
            fieldName={"name"}
            dataObject={platformSettingFeatureModel}
            setDataObject={setPlatformSettingFeatureModel}
          />
        </Col>
        <Col lg={4} sm={6}>
          <BooleanToggleInput
            fieldName={"active"}
            dataObject={platformSettingFeatureModel}
            setDataObject={setPlatformSettingFeatureModel}
          />
        </Col>
        <Col xs={12}>
          <JsonInput
            fieldName={"params"}
            model={platformSettingFeatureModel}
            setModel={setPlatformSettingFeatureModel}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

PlatformSettingFeatureEditorPanel.propTypes = {
  platformSettingsId: PropTypes.string,
  platformSettingFeatureModel: PropTypes.object,
  setPlatformSettingFeatureModel: PropTypes.func,
  closePanelFunction: PropTypes.func,
};
