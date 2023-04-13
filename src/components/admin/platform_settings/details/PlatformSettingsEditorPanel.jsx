import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import PlatformSystemParameterComboBoxInput
  from "components/common/list_of_values_input/platform/system_parameters/PlatformSystemParameterComboBoxInput";
import { platformSettingsActions } from "components/admin/platform_settings/platformSettings.actions";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";

export default function PlatformSettingsEditorPanel(
  {
    platformSettingsModel,
    setPlatformSettingsModel,
    handleClose,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const { cancelTokenSource } = useComponentStateReference();

  const handleCreateFunction = async () => {
    return await platformSettingsActions.createPlatformSetting(
      getAccessToken,
      cancelTokenSource,
      platformSettingsModel,
    );
  };

  const handleUpdateFunction = async () => {
    return await platformSettingsActions.updatePlatformSetting(
      getAccessToken,
      cancelTokenSource,
      platformSettingsModel,
    );
  };

  if (platformSettingsModel == null) {
    return (<LoadingDialog size="sm" />);
  }

  return (
    <EditorPanelContainer
      createRecord={handleCreateFunction}
      updateRecord={handleUpdateFunction}
      recordDto={platformSettingsModel}
      handleClose={handleClose}
      setRecordDto={setPlatformSettingsModel}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase
            fieldName={"platformId"}
            model={platformSettingsModel}
            setModel={setPlatformSettingsModel}
          />
        </Col>
        <Col lg={6}>
          <BooleanToggleInput
            fieldName={"active"}
            dataObject={platformSettingsModel}
            setDataObject={setPlatformSettingsModel}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

PlatformSettingsEditorPanel.propTypes = {
  platformSettingsModel: PropTypes.object,
  setPlatformSettingsModel: PropTypes.func,
  handleClose: PropTypes.func,
};


