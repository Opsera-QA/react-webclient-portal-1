import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import {Col, Row} from "react-bootstrap";
import DtoTextInput from "../../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../../common/input/dto_input/dto-toggle-input";
import toolTypeActions from "../../tool-management-actions";
import LoadingDialog from "../../../../common/status_notifications/loading";
import SaveButton from "../../../../common/buttons/SaveButton";
import DtoTagManagerInput from "../../../../common/input/dto_input/dto-tag-manager-input";

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
      <>
        <div className="mx-2 my-3">
          <Row>
            <Col lg={6}>
              <DtoTextInput disabled={!toolTypeDataDto.isNew()} fieldName={"name"} dataObject={toolTypeDataDto}
                            setDataObject={setToolTypeDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoToggleInput fieldName={"active"} dataObject={toolTypeDataDto} setDataObject={setToolTypeDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoTextInput fieldName={"description"} dataObject={toolTypeDataDto} setDataObject={setToolTypeDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoTextInput fieldName={"identifier"} dataObject={toolTypeDataDto} setDataObject={setToolTypeDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoTagManagerInput type={"tool"} dataObject={toolTypeDataDto} fieldName={"tags"} setDataObject={setToolTypeDataDto}  />
            </Col>
          </Row>
          <Row>
            <div className="ml-auto mt-3 px-3">
              <SaveButton recordDto={toolTypeDataDto} createRecord={createToolType} setRecordDto={setToolTypeDataDto}
                          updateRecord={updateToolType} handleClose={handleClose} setData={setToolTypeData} />
            </div>
          </Row>
        </div>
      </>
    );
}

ToolTypeEditorPanel.propTypes = {
  toolTypeData: PropTypes.object,
  setToolTypeData: PropTypes.func,
  handleClose: PropTypes.func
};

export default ToolTypeEditorPanel;


