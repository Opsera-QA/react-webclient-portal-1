import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import toolsActions from "components/inventory/tools/tools-actions";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import RegistryToolLocationInput from "components/inventory/tools/tool_details/input/RegistryToolLocationInput";
import RegistryToolApplicationsInput from "components/inventory/tools/tool_details/input/RegistryToolApplicationsInput";
import RegistryToolOrganizationInput from "components/inventory/tools/tool_details/input/RegistryToolOrganizationInput";
import RegistryToolContactInput from "components/inventory/tools/tool_details/input/RegistryToolContactInput";
import axios from "axios";

function ToolAttributeEditorPanel({ toolData, setToolData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
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


    loadData();

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

  const updateTool = async () => {
    return await toolsActions.updateToolV2(getAccessToken, cancelTokenSource, toolDataDto);
  };

  return (
    <EditorPanelContainer
      recordDto={toolDataDto}
      createRecord={updateTool}
      updateRecord={updateTool}
      setRecordDto={setToolDataDto}
      isLoading={isLoading}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={6}>
          <RegistryToolOrganizationInput setDataObject={setToolDataDto} dataObject={toolDataDto} />
        </Col>
        <Col lg={6}>
          <RegistryToolLocationInput setDataObject={setToolDataDto} dataObject={toolDataDto} />
        </Col>
        <Col lg={6}>
          <RegistryToolContactInput setDataObject={setToolDataDto} dataObject={toolDataDto} />
        </Col>
        <Col lg={6}>
          <RegistryToolApplicationsInput setDataObject={setToolDataDto} dataObject={toolDataDto} />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

ToolAttributeEditorPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  handleClose: PropTypes.func
};

export default ToolAttributeEditorPanel;


