import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DtoSelectInput from "../../../common/input/dto_input/dto-select-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import DtoMultipleInput from "../../../common/input/dto_input/dto-multiple-input";
import toolsActions from "../tools-actions";
import SaveButton from "../../../common/buttons/SaveButton";
import LoadingDialog from "../../../common/status_notifications/loading";
import DtoTagManagerInput from "../../../common/input/dto_input/dto-tag-manager-input";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import EditorPanelContainer from "../../../common/panels/detail_panel_container/EditorPanelContainer";
import PersistButtonContainer from "../../../common/buttons/saving/containers/PersistButtonContainer";
import ToolClassificationSelectInput
  from "../../../common/list_of_values_input/inventory/ToolClassificationSelectInput";

function ToolEditorPanel({ toolData, setToolData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [toolDataDto, setToolDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [ toolList, setToolList ] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setToolDataDto(toolData);
    await getToolList();
    setIsLoading(false);
  };

  const getToolList = async () => {
    try {
      const toolResponse = await toolsActions.getTools(getAccessToken);
      setToolList(toolResponse.data);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const createTool = async () => {
    return await toolsActions.createTool(toolDataDto, getAccessToken);
  };

  const updateTool = async () => {
    return await toolsActions.updateTool(toolDataDto, getAccessToken);
  };

  // TODO: When we update tool identifier, we should also set configuration to default empty object,
  //  as the configuration fields change depending on tool identifier
  const handleToolIdentifierChange = (fieldName, value) => {
    let newDataObject = toolDataDto;
    newDataObject.setData("tool_identifier", value.identifier);
    newDataObject.setData("tool_type_identifier", value.tool_type_identifier);
    setToolDataDto({...newDataObject});
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
              <DtoSelectInput setDataFunction={handleToolIdentifierChange} setDataObject={setToolDataDto}
                              textField={"name"} valueField={"identifier"} dataObject={toolDataDto}
                              groupBy={"tool_type_identifier"} selectOptions={toolList} fieldName={"tool_identifier"}/>
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


