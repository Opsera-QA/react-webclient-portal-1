import React, { useState, useEffect, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import toolTypeActions from "components/admin/tools/tool-management-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import ToolTypeSelectInput from "components/common/list_of_values_input/admin/tools/ToolTypeSelectInput";
import ToolUsageTypeInput from "components/admin/tools/tool_identifier/ToolUsageTypeInput";
import DtoTagManagerInput from "components/common/input/dto_input/dto-tag-manager-input";
import DtoPropertiesInput from "components/common/input/dto_input/dto-properties-input";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import PersistButtonContainer from "components/common/buttons/saving/containers/PersistButtonContainer";

function ToolIdentifierEditorPanel( {toolIdentifierData, setToolIdentifierData, handleClose} ) {
  const {getAccessToken} = useContext(AuthContext);
  const [toolIdentifierDataDto, setToolIdentifierDataDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setToolIdentifierDataDto(toolIdentifierData);
  };

  const createToolIdentifier = async () => {
    return await toolTypeActions.createToolIdentifier(toolIdentifierDataDto, getAccessToken);
  };

  const updateToolIdentifier = async () => {
    return await toolTypeActions.updateToolIdentifier(toolIdentifierDataDto, getAccessToken);
  };

  if (toolIdentifierDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <EditorPanelContainer>
      <Row>
        <Col lg={6}>
          <TextInputBase fieldName={"name"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto}/>
        </Col>
        <Col lg={6}>
          <ActivityToggleInput fieldName={"active"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto}/>
        </Col>
        <Col lg={12}>
          <TextInputBase fieldName={"description"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto}/>
        </Col>
        <Col lg={6}>
          <TextInputBase fieldName={"identifier"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto}/>
        </Col>
        <Col lg={6}>
          <ToolTypeSelectInput dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto} fieldName={"tool_type_identifier"}/>
        </Col>
        <Col lg={6}>
          <ToolUsageTypeInput fieldName={"usageType"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto}/>
        </Col>
        <Col lg={6}>
          <DtoTagManagerInput type={"tool"} dataObject={toolIdentifierDataDto} fieldName={"tags"} setDataObject={setToolIdentifierDataDto}/>
        </Col>
        <Col lg={6}>
          <BooleanToggleInput dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto} fieldName={"enabledInRegistry"} />
        </Col>
        <Col lg={6}>
          <DtoPropertiesInput fieldName={"properties"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto} fields={["name", "value"]}/>
        </Col>
      </Row>
      <div className="mr-2">
        <PersistButtonContainer
          updateRecord={updateToolIdentifier}
          recordDto={toolIdentifierDataDto}
          createRecord={createToolIdentifier}
          setRecordDto={setToolIdentifierDataDto}
          handleClose={handleClose}
        />
      </div>
    </EditorPanelContainer>
  );
}

ToolIdentifierEditorPanel.propTypes = {
  toolIdentifierData: PropTypes.object,
  setToolIdentifierData: PropTypes.func,
  handleClose: PropTypes.func,
};

export default ToolIdentifierEditorPanel;
