import React, { useState, useEffect, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import DtoTextInput from "../../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../../common/input/dto_input/dto-toggle-input";
import toolTypeActions from "../../tool-management-actions";
import DtoPropertiesInput from "../../../../common/input/dto_input/dto-properties-input";
import SaveButton from "../../../../common/buttons/SaveButton";
import LoadingDialog from "../../../../common/status_notifications/loading";
import DtoTagManagerInput from "../../../../common/input/dto_input/dto-tag-manager-input";
import ToolUsageTypeInput from "../ToolUsageTypeInput";
import EditorPanelContainer from "../../../../common/panels/detail_panel_container/EditorPanelContainer";
import ToolTypeSelectInput from "../../../../common/list_of_values_input/admin/tools/ToolTypeSelectInput";

function ToolIdentifierEditorPanel( {toolIdentifierData, setToolIdentifierData, handleClose} ) {
  const {getAccessToken} = useContext(AuthContext);
  const [toolIdentifierDataDto, setToolIdentifierDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setToolIdentifierDataDto(toolIdentifierData);
    setIsLoading(false);
  };

  const createToolIdentifier = async () => {
    return await toolTypeActions.createToolIdentifier(toolIdentifierDataDto, getAccessToken);
  };

  const updateToolIdentifier = async () => {
    return await toolTypeActions.updateToolIdentifier(toolIdentifierDataDto, getAccessToken);
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }
    return (
      <EditorPanelContainer>
          <Row>
            <Col lg={6}>
              <DtoTextInput fieldName={"name"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoToggleInput fieldName={"active"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"description"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoTextInput fieldName={"identifier"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto}/>
            </Col>
            <Col lg={6}>
              <ToolTypeSelectInput dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto} fieldName={"tool_type_identifier"} />
            </Col>
            <Col lg={6}>
              <ToolUsageTypeInput fieldName={"usageType"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoTagManagerInput type={"tool"} dataObject={toolIdentifierDataDto} fieldName={"tags"} setDataObject={setToolIdentifierDataDto}  />
            </Col>
            <Col lg={6}>
              <DtoPropertiesInput fieldName={"properties"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto} fields={["name", "value"]}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto mt-3 px-3">
              <SaveButton recordDto={toolIdentifierDataDto}
                          createRecord={createToolIdentifier}
                          updateRecord={updateToolIdentifier}
                          type={"Tool Identifier"}
                          setRecordDto={setToolIdentifierDataDto}
                          setData={setToolIdentifierData}
                          handleClose={handleClose}
              />
            </div>
          </Row>
      </EditorPanelContainer>
    );
}

ToolIdentifierEditorPanel.propTypes = {
  toolIdentifierData: PropTypes.object,
  setToolIdentifierData: PropTypes.func,
  handleClose: PropTypes.func,
};

export default ToolIdentifierEditorPanel;
