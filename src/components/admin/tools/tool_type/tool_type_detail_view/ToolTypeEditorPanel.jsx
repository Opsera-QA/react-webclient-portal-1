import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import {Col, Row} from "react-bootstrap";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import toolTypeActions from "components/admin/tools/tool-management-actions";
import DtoTagManagerInput from "components/common/input/dto_input/dto-tag-manager-input";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import PersistButtonContainer from "components/common/buttons/saving/containers/PersistButtonContainer";
import LoadingDialog from "components/common/status_notifications/loading";

function ToolTypeEditorPanel( { toolTypeData, setToolTypeData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [toolTypeDataDto, setToolTypeDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setToolTypeDataDto(toolTypeData);
    setIsLoading(false);
  };

  const createToolType = async () => {
    return await toolTypeActions.createToolType(toolTypeDataDto, getAccessToken);
  };

  const updateToolType = async () => {
    return await toolTypeActions.updateToolType(toolTypeDataDto, getAccessToken);
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <EditorPanelContainer>
      <Row>
        <Col lg={6}>
          <TextInputBase fieldName={"name"} dataObject={toolTypeDataDto} setDataObject={setToolTypeDataDto}/>
        </Col>
        <Col lg={6}>
          <ActivityToggleInput fieldName={"active"} dataObject={toolTypeDataDto} setDataObject={setToolTypeDataDto}/>
        </Col>
        <Col lg={6}>
          <TextInputBase fieldName={"description"} dataObject={toolTypeDataDto} setDataObject={setToolTypeDataDto}/>
        </Col>
        <Col lg={6}>
          <TextInputBase fieldName={"identifier"} dataObject={toolTypeDataDto} setDataObject={setToolTypeDataDto}/>
        </Col>
        <Col lg={6}>
          <DtoTagManagerInput type={"tool"} dataObject={toolTypeDataDto} fieldName={"tags"} setDataObject={setToolTypeDataDto}/>
        </Col>
      </Row>
      <PersistButtonContainer
        createRecord={createToolType}
        updateRecord={updateToolType}
        setRecordDto={setToolTypeDataDto}
        recordDto={toolTypeDataDto}
        handleClose={handleClose}
      />
    </EditorPanelContainer>
  );
}

ToolTypeEditorPanel.propTypes = {
  toolTypeData: PropTypes.object,
  setToolTypeData: PropTypes.func,
  handleClose: PropTypes.func
};

export default ToolTypeEditorPanel;


