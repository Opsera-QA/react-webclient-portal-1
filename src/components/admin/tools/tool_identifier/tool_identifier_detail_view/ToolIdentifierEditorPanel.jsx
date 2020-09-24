import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import DtoTextInput from "../../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../../common/input/dto_input/dto-toggle-input";
import toolTypeActions from "../../tool-management-actions";
import DtoSelectInput from "../../../../common/input/dto_input/dto-select-input";
import DtoPropertiesInput from "../../../../common/input/dto_input/dto-properties-input";
import SaveButton from "../../../../common/buttons/SaveButton";
import LoadingDialog from "../../../../common/status_notifications/loading";
import DtoTagManagerInput from "../../../../common/input/dto_input/dto-tag-manager-input";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";

function ToolIdentifierEditorPanel( {toolIdentifierData, setToolIdentifierData, handleClose} ) {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [toolList, setToolList] = useState([]);
  const [toolIdentifierDataDto, setToolIdentifierDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setToolIdentifierDataDto(toolIdentifierData);
      const toolList = await getToolList();
      setToolList(toolList.data);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getToolList = async () => {
    return await toolTypeActions.getToolTypes(getAccessToken, false);
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
      <>
        <div className="mx-2 my-3">
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
              <DtoSelectInput textField={"name"} valueField={"identifier"} fieldName={"tool_type_identifier"} dataObject={toolIdentifierDataDto} setDataObject={setToolIdentifierDataDto} selectOptions={toolList}/>
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
        </div>
      </>
    );
}

ToolIdentifierEditorPanel.propTypes = {
  toolIdentifierData: PropTypes.object,
  setToolIdentifierData: PropTypes.func,
  handleClose: PropTypes.func,
};

export default ToolIdentifierEditorPanel;
