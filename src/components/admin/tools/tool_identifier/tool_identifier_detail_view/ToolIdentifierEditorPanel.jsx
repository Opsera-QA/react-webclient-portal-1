import React, { useState, useEffect, useContext, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import toolManagementActions from "components/admin/tools/tool-management-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import ToolTypeSelectInput from "components/common/list_of_values_input/admin/tools/ToolTypeSelectInput";
import ToolUsageTypeSelectInput from "components/common/list_of_values_input/admin/tools/ToolUsageTypeSelectInput";
import DtoPropertiesInput from "components/common/input/dto_input/dto-properties-input";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TagManager from "components/common/inputs/tags/TagManager";
import axios from "axios";

function ToolIdentifierEditorPanel( {toolIdentifierData, handleClose} ) {
  const {getAccessToken} = useContext(AuthContext);
  const [toolIdentifierDataDto, setToolIdentifierDataDto] = useState(undefined);
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
    if (isMounted?.current === true){
      setIsLoading(true);
      setToolIdentifierDataDto(toolIdentifierData);
      setIsLoading(false);
    }
  };

  const createToolIdentifier = async () => {
    return await toolManagementActions.createToolIdentifierV2(getAccessToken, cancelTokenSource, toolIdentifierDataDto);
  };

  const updateToolIdentifier = async () => {
    return await toolManagementActions.updateToolIdentifierV2(getAccessToken, cancelTokenSource, toolIdentifierDataDto);
  };

  if (toolIdentifierDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <EditorPanelContainer
      updateRecord={updateToolIdentifier}
      recordDto={toolIdentifierDataDto}
      createRecord={createToolIdentifier}
      setRecordDto={setToolIdentifierDataDto}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase
            fieldName={"name"}
            dataObject={toolIdentifierDataDto}
            setDataObject={setToolIdentifierDataDto}
          />
        </Col>
        <Col lg={6}>
          <ActivityToggleInput
            fieldName={"active"}
            dataObject={toolIdentifierDataDto}
            setDataObject={setToolIdentifierDataDto}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"description"}
            dataObject={toolIdentifierDataDto}
            setDataObject={setToolIdentifierDataDto}
          />
        </Col>
        <Col lg={6}>
          <TextInputBase
            fieldName={"identifier"}
            dataObject={toolIdentifierDataDto}
            setDataObject={setToolIdentifierDataDto}
          />
        </Col>
        <Col lg={6}>
          <ToolTypeSelectInput
            model={toolIdentifierDataDto}
            setModel={setToolIdentifierDataDto}
            fieldName={"tool_type_identifier"}
            includeInactive={true}
          />
        </Col>
        <Col lg={6}>
          <ToolUsageTypeSelectInput
            dataObject={toolIdentifierDataDto}
            setDataObject={setToolIdentifierDataDto}
          />
        </Col>
        <Col lg={6}>
          <TagManager
            type={"tool"}
            dataObject={toolIdentifierDataDto}
            setDataObject={setToolIdentifierDataDto}
          />
        </Col>
        <Col lg={6}>
          <BooleanToggleInput
            dataObject={toolIdentifierDataDto}
            setDataObject={setToolIdentifierDataDto}
            fieldName={"enabledInRegistry"}
          />
        </Col>
        <Col lg={6}>
          <DtoPropertiesInput
            fieldName={"properties"}
            dataObject={toolIdentifierDataDto}
            setDataObject={setToolIdentifierDataDto}
            fields={["name", "value"]}
          />
        </Col>
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
