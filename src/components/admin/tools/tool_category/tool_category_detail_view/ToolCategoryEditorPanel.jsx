import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import {Col, Row} from "react-bootstrap";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import toolManagementActions from "components/admin/tools/tool-management-actions";
import DtoTagManagerInput from "components/common/input/dto_input/dto-tag-manager-input";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";

function ToolCategoryEditorPanel({ toolCategoryData, setToolCategoryData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [toolCategoryDataDto, setToolCategoryDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setToolCategoryDataDto(toolCategoryData);
    setIsLoading(false);
  };

  const createToolType = async () => {
    return await toolManagementActions.createToolType(toolCategoryDataDto, getAccessToken);
  };

  const updateToolType = async () => {
    return await toolManagementActions.updateToolType(toolCategoryDataDto, getAccessToken);
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <EditorPanelContainer
      isLoading={isLoading}
      createRecord={createToolType}
      updateRecord={updateToolType}
      setRecordDto={setToolCategoryDataDto}
      recordDto={toolCategoryDataDto}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase fieldName={"name"} dataObject={toolCategoryDataDto} setDataObject={setToolCategoryDataDto}/>
        </Col>
        <Col lg={6}>
          <ActivityToggleInput fieldName={"active"} dataObject={toolCategoryDataDto} setDataObject={setToolCategoryDataDto}/>
        </Col>
        <Col lg={6}>
          <TextInputBase fieldName={"description"} dataObject={toolCategoryDataDto} setDataObject={setToolCategoryDataDto}/>
        </Col>
        <Col lg={6}>
          <TextInputBase fieldName={"identifier"} dataObject={toolCategoryDataDto} setDataObject={setToolCategoryDataDto}/>
        </Col>
        <Col lg={6}>
          <DtoTagManagerInput type={"tool"} dataObject={toolCategoryDataDto} fieldName={"tags"} setDataObject={setToolCategoryDataDto}/>
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

ToolCategoryEditorPanel.propTypes = {
  toolCategoryData: PropTypes.object,
  setToolCategoryData: PropTypes.func,
  handleClose: PropTypes.func
};

export default ToolCategoryEditorPanel;


