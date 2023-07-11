import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { platformSystemParameterActions } from "components/admin/system_parameters/platformSystemParameter.actions";
import PlatformSystemParameterTypeSelectInput from "components/admin/system_parameters/details/inputs/PlatformSystemParameterTypeSelectInput";
import PlatformSystemParameterValueInput from "components/admin/system_parameters/details/inputs/PlatformSystemParameterValueInput";
import PlatformSystemParameterComboBoxInput from "components/common/list_of_values_input/platform/system_parameters/PlatformSystemParameterComboBoxInput";

export default function PlatformSystemParameterEditorPanel(
  {
    platformSystemParameterModel,
    setPlatformSystemParameterModel,
    handleClose,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const { cancelTokenSource } = useComponentStateReference();

  const handleCreateFunction = async () => {
    return await platformSystemParameterActions.createPlatformSystemParameter(
      getAccessToken,
      cancelTokenSource,
      platformSystemParameterModel,
    );
  };

  const handleUpdateFunction = async () => {
    return await platformSystemParameterActions.updatePlatformSystemParameter(
      getAccessToken,
      cancelTokenSource,
      platformSystemParameterModel,
    );
  };

  if (platformSystemParameterModel == null) {
    return (<LoadingDialog size="sm" />);
  }

  return (
    <EditorPanelContainer
      createRecord={handleCreateFunction}
      updateRecord={handleUpdateFunction}
      recordDto={platformSystemParameterModel}
      handleClose={handleClose}
      setRecordDto={setPlatformSystemParameterModel}
    >
      <Row>
        <Col lg={6}>
          <PlatformSystemParameterComboBoxInput
            fieldName={"name"}
            model={platformSystemParameterModel}
            setModel={setPlatformSystemParameterModel}
          />
        </Col>
        <Col lg={6}>
          <PlatformSystemParameterTypeSelectInput
            model={platformSystemParameterModel}
            setModel={setPlatformSystemParameterModel}
          />
        </Col>
        <Col lg={12}>
          <PlatformSystemParameterValueInput
            model={platformSystemParameterModel}
            setModel={setPlatformSystemParameterModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"description"}
            dataObject={platformSystemParameterModel}
            setDataObject={setPlatformSystemParameterModel}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

PlatformSystemParameterEditorPanel.propTypes = {
  platformSystemParameterModel: PropTypes.object,
  setPlatformSystemParameterModel: PropTypes.func,
  handleClose: PropTypes.func,
};


