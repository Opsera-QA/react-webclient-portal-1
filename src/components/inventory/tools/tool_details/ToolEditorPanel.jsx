import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolsActions from "components/inventory/tools/tools-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import DtoTextInput from "components/common/input/dto_input/dto-text-input";
import DtoTagManagerInput from "components/common/input/dto_input/dto-tag-manager-input";
import ToolClassificationSelectInput
  from "components/common/list_of_values_input/inventory/ToolClassificationSelectInput";
import DtoMultipleInput from "components/common/input/dto_input/dto-multiple-input";
import DtoToggleInput from "components/common/input/dto_input/dto-toggle-input";
import PersistButtonContainer from "components/common/buttons/saving/containers/PersistButtonContainer";
import RegistryToolIdentifierSelectInput
  from "components/inventory/tools/tool_details/input/RegistryToolIdentifierSelectInput";

function ToolEditorPanel({ toolData, setToolData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [toolDataDto, setToolDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setToolDataDto(toolData);
    setIsLoading(false);
  };

  const createTool = async () => {
    return await toolsActions.createTool(toolDataDto, getAccessToken);
  };

  const updateTool = async () => {
    return await toolsActions.updateTool(toolDataDto, getAccessToken);
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }
    return (
        <EditorPanelContainer>
          <Row>
            <Col lg={6}>
              <DtoTextInput setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"name"}/>
            </Col>
            <Col lg={6}>
              <RegistryToolIdentifierSelectInput dataObject={toolDataDto} setDataObject={setToolDataDto} />
            </Col>
            <Col lg={12}>
              <DtoTextInput setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"description"}/>
            </Col>
            <Col lg={6}>
              <DtoTextInput setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"costCenter"} />
            </Col>
            <Col lg={6}>
              <DtoTagManagerInput type={"tool"} setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"tags"} />
            </Col>
            <Col lg={6}>
              <ToolClassificationSelectInput setDataObject={setToolDataDto} dataObject={toolDataDto} />
            </Col>
            <Col lg={6}>
              <DtoMultipleInput setDataObject={setToolDataDto} dataObject={toolDataDto} fields={["name", "value"]} fieldName={"location"} />
            </Col>
            <Col lg={6}>
              <DtoMultipleInput disabledFields={["user_id"]} setDataObject={setToolDataDto} dataObject={toolDataDto} fields={["name", "email", "user_id"]} fieldName={"contacts"} />
            </Col>
            <Col lg={6}>
              <DtoMultipleInput setDataObject={setToolDataDto} dataObject={toolDataDto} fields={["name", "value"]} fieldName={"applications"} />
            </Col>
            <Col lg={6}>
              <DtoMultipleInput setDataObject={setToolDataDto} dataObject={toolDataDto} fields={["name", "value"]} fieldName={"organization"} />
            </Col>
            <Col lg={6}>
              <DtoToggleInput setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"active"}/>
            </Col>
          </Row>
          <PersistButtonContainer recordDto={toolDataDto} createRecord={createTool} updateRecord={updateTool} setRecordDto={setToolDataDto} />
        </EditorPanelContainer>
    );
}

ToolEditorPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  handleClose: PropTypes.func
};

export default ToolEditorPanel;


