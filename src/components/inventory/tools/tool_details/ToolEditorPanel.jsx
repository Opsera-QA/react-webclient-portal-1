import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import toolsActions from "components/inventory/tools/tools-actions";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import ToolClassificationSelectInput from "components/common/list_of_values_input/inventory/ToolClassificationSelectInput";
import RegistryToolIdentifierSelectInput from "components/inventory/tools/tool_details/input/RegistryToolIdentifierSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TagManager from "components/common/inputs/tags/TagManager";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import axios from "axios";

function ToolEditorPanel({ toolData, handleClose }) {
  const { getAccessToken, isSassUser } = useContext(AuthContext);
  const [toolDataDto, setToolDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  
  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setToolDataDto(toolData);
    setIsLoading(false);
  };

  const createTool = async () => {
    return await toolsActions.createToolV2(getAccessToken, cancelTokenSource, toolDataDto);
  };

  const updateTool = async () => {
    return await toolsActions.updateToolV2(getAccessToken, cancelTokenSource, toolDataDto);
  };

  const getDynamicFields = () => {
    if (toolData?.isNew() && !isSassUser()) {
      return (
        <Col lg={12} className="mb-4">
          <RoleAccessInput dataObject={toolDataDto} setDataObject={setToolDataDto} fieldName={"roles"}/>
        </Col>
      );
    }
    return null;
  };

  return (
    <EditorPanelContainer
      recordDto={toolDataDto}
      createRecord={createTool}
      updateRecord={updateTool}
      setRecordDto={setToolDataDto}
      isLoading={isLoading}
      showBooleanToggle={true}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <RegistryToolIdentifierSelectInput
            disabled={toolDataDto?.isNew()}
            dataObject={toolDataDto}
            setDataObject={setToolDataDto}
          />
        </Col>
        <Col lg={6}>
          <TextInputBase setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"costCenter"}/>
        </Col>
        <Col lg={6}>
          <TagManager type={"tool"} setDataObject={setToolDataDto} dataObject={toolDataDto}/>
        </Col>
        <Col lg={6}>
          <ToolClassificationSelectInput setDataObject={setToolDataDto} dataObject={toolDataDto}/>
        </Col>
        <Col lg={12} className="mb-2">
          <TextInputBase setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"description"}/>
        </Col>
        {getDynamicFields()}
      </Row>
    </EditorPanelContainer>
  );
}

ToolEditorPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  handleClose: PropTypes.func
};

export default ToolEditorPanel;
